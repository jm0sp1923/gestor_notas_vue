<template>
  <div class="container h-100">
    <div class="row justify-content-start align-items-start vh-100 mt-4 flex-wrap mb-6">
      <div class="col-md-6 col-lg-4 mb-4" v-for="nota in notas" :key="nota.id">
        <div class="card">
          <img
            v-if="nota.imagen"
            :src="nota.imagen"
            class="card-img-top"
            alt="Nota imagen"
          />
          <div class="card-body">
            <h5 class="card-title">{{ nota.titulo }}</h5>
            <p class="card-text">{{ nota.descripcion }}</p>
            <p class="card-text">
              <small class="text-muted">Creado por: {{ nota.usuario.nombre }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">Etiqueta: {{ nota.etiqueta.nombre }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">Fecha de creación: {{ formatFecha(nota.fecha_creacion) }}</small>
            </p>
            <p class="card-text" v-if="nota.fecha_vencimiento">
              <small class="text-danger">Fecha de vencimiento: {{ formatFecha(nota.fecha_vencimiento) }}</small>
            </p>
          </div>
          <div class="card-footer">
            <button class="btn btn-warning btn-sm custom-btn me-2" @click="editNota(nota)">
              Editar
            </button>
            <button class="btn btn-danger btn-sm custom-btn" @click="confirmDeleteNota(nota.id)">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar la nota -->
    <EditNotaModal
      v-if="selectedNota"
      :nota="selectedNota"
      @close="selectedNota = null" 
      @notaActualizada="handleNotaActualizada"
    />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2"; 
import EditNotaModal from '../modals/EditNotaModal.vue'; 

export default {
  components: {
    EditNotaModal,
  },
  data() {
    return {
      notas: [],
      selectedNota: null, // Para almacenar la nota seleccionada para editar
    };
  },
  created() {
    this.fetchNotas();
  },
  methods: {
    async fetchNotas() {
      try {
        const token = localStorage.token;
        const response = await axios.get("https://gestornotas.co/api/nota", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.notas = response.data[0];
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    },
    editNota(nota) {
      this.selectedNota = { ...nota }; // Clona la nota seleccionada para editar
    },
    async confirmDeleteNota(notaId) {
      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (isConfirmed) {
        this.deleteNota(notaId); // Llama a la función para eliminar la nota
      }
    },
    async deleteNota(notaId) {
      try {
        const token = localStorage.token;
        await axios.delete(`https://gestornotas.co/api/nota/${notaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Muestra un alert de éxito
        await Swal.fire({
          title: 'Eliminada',
          text: 'La nota ha sido eliminada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        // Recargar la página después de eliminar
        this.fetchNotas(); // Vuelve a cargar la lista de notas
      } catch (error) {
        console.error("Error al eliminar la nota:", error);
      }
    },
    handleNotaActualizada(updatedNota) {
      const index = this.notas.findIndex(nota => nota.id === updatedNota.id);
      if (index !== -1) {
        this.$set(this.notas, index, updatedNota); // Actualiza la nota en el array
      }
      this.selectedNota = null; // Cierra el modal después de actualizar
    },
    formatFecha(fecha) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(fecha).toLocaleDateString("es-CO", options);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%; /* O usa un ancho fijo como 300px */
  max-width: 400px; /* Limita el ancho máximo si es necesario */
  min-height: 600px; /* Altura mínima para uniformidad */
  margin-bottom: 20px; /* Ajusta el valor según sea necesario */
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.d-flex {
  display: flex;
  flex-direction: column; /* Asegura que el contenido se apile verticalmente */
}
</style>
