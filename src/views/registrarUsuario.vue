<template>
    <div class="row justify-content-center align-items-center vh-100">
      <div class="login-container">
        <h1>Registrarse</h1>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              v-model="nombre"
              @input="validateName"
              :class="{ 'is-invalid': nombreError }"
              class="form-control"
              placeholder="Ingresa tu nombre"
            />
            <span v-if="nombreError" class="error-message">{{
              nombreError
            }}</span>
          </div>
  
          <div class="form-group">
            <label for="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              @input="validateEmail"
              :class="{ 'is-invalid': emailError }"
              class="form-control"
              placeholder="Ingresa tu correo electrónico"
            />
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
  
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              @input="validatePassword"
              :class="{ 'is-invalid': passwordError }"
              class="form-control"
              placeholder="Ingresa tu contraseña"
            />
            <span v-if="passwordError" class="error-message">{{
              passwordError
            }}</span>
          </div>
  
          <button type="submit" :disabled="!isFormValid" class="btn btn-primary">
            Registrarse
          </button>
        </form>
        <button type="button" class="btn btn-link" @click="goToLogin">
          Volver a Iniciar Sesión
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import router from "../router";
  import axios from "axios";
  import Swal from "sweetalert2"; 
  
  export default {
    data() {
      return {
        nombre: "",
        email: "",
        password: "",
        nameError: null,
        emailError: null,
        passwordError: null,
      };
    },
    computed: {
      isFormValid() {
        return (
          this.nombre && this.email && this.password &&
          !this.nombreError && !this.emailError && !this.passwordError
        );
      },
    },
    methods: {
      validateName() {
        if (!this.nombre) {
          this.nombreError = "El nombre es obligatorio.";
        } else {
          this.nombreError = null;
        }
      },
      validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
          this.emailError = "El correo electrónico es obligatorio.";
        } else if (!emailPattern.test(this.email)) {
          this.emailError = "Correo electrónico no válido.";
        } else {
          this.emailError = null;
        }
      },
      validatePassword() {
        if (!this.password) {
          this.passwordError = "La contraseña es obligatoria.";
        } else if (this.password.length < 6) {
          this.passwordError = "La contraseña debe tener al menos 6 caracteres.";
        } else {
          this.passwordError = null;
        }
      },
      async handleSubmit() {
    this.validateName();
    this.validateEmail();
    this.validatePassword();
  
    if (this.isFormValid) {
      try {
        const response = await axios.post("http://3.145.21.100/api/usuario", {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
        });
        console.log("Registro exitoso:", response.data);
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se creó el usuario!',
          confirmButtonText: 'Aceptar'
        });
        router.push("/");
      } catch (error) {
        if (error.response) {
          console.error("Error en el registro:", error.response.data);
          this.emailError = "El correo electrónico ya está en uso.";
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  },
      goToLogin() {
        router.push("/"); // Regresar a la vista de inicio de sesión
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
  }
  
  .btn {
    width: 100%;
  }
  </style>
  