<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark"> <!-- Cambiado a bg-dark -->
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo-igm.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
       
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav me-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Notas
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><router-link class="dropdown-item" to="/visualizarNotas">Ver notas</router-link></li>
              <li><router-link class="dropdown-item" to="/crearNota">Crear nueva nota</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Etiquetas
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li  class="dropdown-item"> Crear nueva etiqueta</li>
              <li  class="dropdown-item">Eliminar etiqueta</li>
            </ul>
          </li>
        </ul>
        <form class ="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm- buscador" type="search">
        </form>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-danger" href="#" @click.prevent="logout">Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '../router';

export default {
  name: "navBar",
  methods: {
    logout() {
      // Eliminar el token del localStorage
      localStorage.removeItem("token");
      // Redirigir a la página principal
      router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px; /* Espacio inferior para separar el navbar del contenido */
}
</style>
