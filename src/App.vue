<template lang="pug">
   #app
      navbar
      .container-fluid.mt-4
         input-watcher(
            v-on:add-watcher="addWatcher" )
         #watcher-list
            watcher(
               v-for="(watcher,index) in watchers"
               :key="index"
               v-bind:watcher="watcher"
               v-on:remove-watcher="removeWatcher" )
</template>

<script>

   import Navbar from './components/Navbar.vue';
   import InputWatcher from './components/InputWatcher.vue';
   import Watcher from './components/Watcher.vue';
   import manifest from './app/manifest.js';

   export default {
      name: 'app',
      data: () => {
         return {
            watchers:[]
         }
      },
      components: {
         Navbar,
         InputWatcher,
         Watcher
      },
      methods: {
         removeWatcher: function (watcher) {
            const watcherIndex = this.watchers.indexOf(watcher);
            this.watchers.splice(watcherIndex, 1);
         },
         addWatcher: function (url) {
            this.watchers.push(manifest(url));
         }
      }
   }

</script>

<style lang="scss">

</style>
