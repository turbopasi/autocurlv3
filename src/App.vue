<template lang="pug">
   #app
      navbar
      .container
</template>

<script>

   import Navbar from './components/Navbar.vue';

   export default {
      name: 'app',
      data: () => {
         return {
            message: ""
         }
      },
      components: {
         Navbar
      }
   }

</script>

<style lang="scss">

</style>
