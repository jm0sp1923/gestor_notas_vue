<template>
  <div class="container mt-4">
    <h3>Crear nueva nota</h3>
    <form @submit.prevent="submitForm">
      <!-- Título -->
      <div class="mb-3">
        <label for="titulo" class="form-label">Título *</label>
        <input
          type="text"
          v-model="nota.titulo"
          class="form-control"
          id="titulo"
          required
        />
      </div>

      <!-- Descripción -->
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción *</label>
        <textarea
          v-model="nota.descripcion"
          class="form-control"
          id="descripcion"
          required
        ></textarea>
      </div>

      <!-- Etiquetas -->
      <div class="mb-3">
        <label for="etiqueta" class="form-label">Etiqueta *</label>
        <select
          v-model="nota.etiqueta_id"
          class="form-select"
          id="etiqueta"
          required
        >
          <option value="" disabled>Seleccione una etiqueta</option>
          <option
            v-for="etiqueta in etiquetas"
            :key="etiqueta.id"
            :value="etiqueta.id"
          >
            {{ etiqueta.nombre }}
          </option>
        </select>
      </div>

      <!-- Opcionales -->
      <h4>Opcionales</h4>

            Fecha de vencimiento
            <div class="mb-3">
              <label for="fecha_vencimiento" class="form-label"
                >Fecha de vencimiento</label
              >
              <input
                type="date"
                v-model="nota.fecha_vencimiento"
                class="form-control"
                id="fecha_vencimiento"
              />
            </div>


            <div class="mb-3">
              <label for="imagen" class="form-label">Imagen</label>
              <input
                type="file"
                @change="onFileChange"
                class="form-control"
                id="imagen"
                accept="image/*"
              />
            </div>

      <!-- Botón de envío -->
      <button type="submit" class="btn btn-primary">Crear nota</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nota: {
        titulo: "",
        descripcion: "",
        fecha_creacion: "",
        usuario_id: null,
        etiqueta_id: null,
        fecha_vencimiento: "",
        imagen: null,
      },
      etiquetas: [], // Lista de etiquetas
    };
  },
  created() {
    this.fetchEtiquetas();
  },
  methods: {
    mounted() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Usuario desde localStorage:", user); // Esto debería mostrar el objeto de usuario

      if (user) {
        console.log("ID del usuario:", user.id); // Acceder al ID del usuario
        console.log("Nombre del usuario:", user.nombre); // Acceder al nombre del usuario
        // Puedes usar `user.email`, `user.created_at`, etc. según sea necesario
      } else {
        console.log("No se encontró el usuario en localStorage");
      }
    },
    async fetchEtiquetas() {
      try {
        const token = localStorage.token; // Se utiliza el token almacenado
        const response = await axios.get("https://gestornotas.co/api/etiqueta", {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en la petición
          },
        });
        this.etiquetas = response.data;
      } catch (error) {
        console.error("Error al obtener las etiquetas:", error);
      }
    },
    onFileChange(event) {
      this.nota.imagen = event.target.files[0];
    },
    async submitForm() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const formData = new FormData();
      formData.append("titulo", this.nota.titulo);
      formData.append("descripcion", this.nota.descripcion);
      formData.append("fecha_creacion", this.nota.fecha_creacion);
      formData.append("usuario_id", user ? user.id : null); // Usuario logueado
      formData.append("etiqueta_id", this.nota.etiqueta_id);
      if (this.nota.fecha_vencimiento) {
        formData.append("fecha_vencimiento", this.nota.fecha_vencimiento);
      }
      if (this.nota.imagen) {
        formData.append("imagen", this.nota.imagen);
      }

      try {
        const token = localStorage.getItem("token"); // Se utiliza el token almacenado
        await axios.post("https://gestornotas.co/api/nota", formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en la petición
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Nota creada con éxito");
        // Redirigir o limpiar el formulario si es necesario
      } catch (error) {
        console.error("Error al crear la nota:", error);
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
}
</style>
