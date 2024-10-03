<template>
    <div class="d-flex flex-column h-100"> 
      <navBar /> 
      <div class="flex-grow-1">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import navBar from '../components/navBar.vue';
  
  export default {
    components: {
      navBar,
    },
  };
  </script>