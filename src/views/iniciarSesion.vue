<template>
  <div class="row justify-content-center align-items-center vh-100">
    <div class="login-container">
      <h1>Bienvenido</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @input="validateEmail"
            :class="{ 'is-invalid': emailError }"
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
          />
          <span v-if="passwordError" class="error-message">{{
            passwordError
          }}</span>
        </div>

        <button type="submit" :disabled="!isFormValid">Iniciar Sesión</button>
      </form>
      <button type="button" @click="goToRegistro">Registrarse</button>
      <button type="button" @click="gotToVisualizarNotas">Ver notas</button>
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
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.email && this.password && !this.emailError && !this.passwordError
      );
    },
  },
  methods: {
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
    async login() {
      try {
        const response = await axios.post("http://3.80.254.110/api/login", {
          email: this.email,
          password: this.password,
        });

        // Guardar el token y los datos del usuario en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Guardar el objeto del usuario
        console.log("Usuario almacenado en localStorage:", response.data.user); // Verificar aquí

    

        console.log(localStorage.token);
        await Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Inicio de sesión exitoso!",
          confirmButtonText: "Aceptar",
        });
        this.$router.push("/visualizarNotas");
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error || "Error al iniciar sesión",
          confirmButtonText: "Aceptar",
        });
      }
    },
    goToRegistro() {
      router.push("/registrarUsuario");
    },
    gotToVisualizarNotas() {
      router.push("/visualizarNotas");
    },
  },
};
</script>
<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px; /* Agregar margen superior */
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
