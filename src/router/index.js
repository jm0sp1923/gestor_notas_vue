import { createRouter, createWebHistory } from 'vue-router';
import iniciarSesion from '../views/iniciarSesion.vue'; 
import registrarUsuario from '../views/registrarUsuario.vue';
import visualizarNotas from '../views/visualizarNotas.vue';
import crearNota from '../views/crearNota.vue';
import MainLayout from '../layouts/MainLayout.vue'; 
import Swal from 'sweetalert2';

const routes = [
  {
    path: '/',
    name: 'iniciarSesion',
    component: iniciarSesion, // Utiliza el componente aquí
  },
  {
    path: '/registrarUsuario',
    name: 'registrarUsuario',
    component: registrarUsuario,
  },
  {
    path: '/visualizarNotas',
    component: MainLayout,
    children: [
      {
        path: '',
        component: visualizarNotas,
      },
    ],
  },
  {
    path: '/crearNota',
    component: MainLayout,
    children: [
      {
        path: '',
        component: crearNota,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // Rutas que no requieren autenticación
  const publicPages = ['/', '/registrarUsuario'];

  // Si el token no está presente y el usuario intenta acceder a una ruta protegida
  if (!token && !publicPages.includes(to.path)) {
    // Alertar al usuario y redirigir a la página de inicio de sesión
    Swal.fire({
      title: 'Por favor, inicia sesión primero',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    next('/'); // Redirigir a la página de inicio de sesión
  } else {
    next(); // Permitir la navegación
  }
});
export default router;
