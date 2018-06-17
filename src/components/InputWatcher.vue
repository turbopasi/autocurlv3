<template lang="pug">
   .input-group.mb-3
      .input-group-prepend
         .input-group-text
            input(type="checkbox" v-model="checked" data-toggle="tooltip" data-placement="top" title="Keep input")
      input.form-control(type="text" v-model="url" placeholder="Input HLS manifest url")
      .input-group-append
         button.btn.btn-outline-secondary(@click="addWatcher(url)") Add watcher
</template>

<script>
   export default {
      data: () => {
         return {
            url: '',
            checked: false
         }
      },
      methods: {
         addWatcher: function(url) {
            this.$emit('add-watcher',url);
            if (!this.checked) { this.url = ''; }
         }
      }
   }
</script>

<style lang="scss">
</style>
