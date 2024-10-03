<template>
    <div
      class="modal fade show"
      style="display: block"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editNotaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="editNotaModalLabel">Editar Nota</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="confirmUpdateNota">
              <div class="form-group">
                <label for="titulo">Título</label>
                <input
                  type="text"
                  class="form-control"
                  id="titulo"
                  v-model="nota.titulo"
                  required
                  placeholder="Ingrese el título de la nota"
                />
              </div>
              <div class="form-group">
                <label for="descripcion">Descripción</label>
                <textarea
                  class="form-control"
                  id="descripcion"
                  v-model="nota.descripcion"
                  required
                  placeholder="Ingrese la descripción de la nota"
                  rows="5"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="etiquetas">Etiquetas</label>
                <select v-model="selectedEtiquetaId" class="form-control" id="etiquetas">
                  <option disabled value="">Seleccione una etiqueta</option>
                  <option v-for="etiqueta in etiquetas" :key="etiqueta.id" :value="etiqueta.id">
                    {{ etiqueta.nombre }}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2"; 
  
  export default {
    props: {
      nota: Object,
      required: true,
    },
    data() {
      return {
        etiquetas: [],
        selectedEtiquetaId: "", 
      };
    },
    created() {
      this.fetchEtiquetas(); 
    },
    methods: {
      closeModal() {
        this.$emit("close"); 
      },
      async fetchEtiquetas() {
        try {
          const response = await axios.get("http://3.145.21.100/api/etiqueta");
          this.etiquetas = response.data; 
        } catch (error) {
          console.error("Error al obtener las etiquetas:", error);
        }
      },
      async confirmUpdateNota() {
    if (!this.selectedEtiquetaId) {
      await Swal.fire({
        title: 'Etiqueta Requerida',
        text: "Debes seleccionar una etiqueta para actualizar la nota.",
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return; // Salir del método si no hay etiqueta seleccionada
    }
  
    const { isConfirmed } = await Swal.fire({
      title: 'Confirmar Actualización',
      text: "¿Estás seguro de que deseas actualizar esta nota?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    });
  
    if (isConfirmed) {
      this.updateNota(); 
    }
  },
      async updateNota() {
        try {
          const token = localStorage.token;
  
          const headers = {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json", 
          };
  
        
          const updatedNota = {
            ...this.nota,
            etiqueta_id: this.selectedEtiquetaId,
          };
  
          const response = await axios.patch(
            `http://3.145.21.100/api/nota/${this.nota.id}`,
            updatedNota,
            { headers }
          );
  
         
          await Swal.fire({
            title: 'Actualización Exitosa',
            text: 'La nota ha sido actualizada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          location.reload()
          this.$emit("notaActualizada", response.data); 
          this.$emit("recargarNotas"); 
          this.closeModal(); 
        } catch (error) {
          console.error("Error al actualizar la nota:", error);
        }
      },
    },
  };
  </script>
  