<template lang="pug">
   .watcher.card.mb-2.bg-light
      .card-header.bg-light
         .input-group
            input.form-control(type="text" v-model="m3u8")
            .input-group-append
               button.btn.btn-primary(type="button" @click="refreshAutocurl()") {{ curlbuttontext }}
      .card-body.p-0
         ul.list-group.list-group-flush
            li.list-group-item
               span.badge.badge-pill.badge-success.mr-1.p-2
                  | {{ status }} {{ statusText }}
               span.badge.badge-pill.badge-light.mr-1.p-2
                  | Renditions: {{ renditions.length }}
               span.badge.badge-pill.badge-light.mr-1.p-2
                  | First: {{ renditions[0].first }}.ts
               span.badge.badge-pill.badge-light.mr-1.p-2
                  | Last: {{ renditions[0].last }}.ts
               span.badge.badge-pill.badge-light.mr-1.p-2
                  | Segments: {{ renditions[0].count }}
            li.list-group-item
               button.btn.mr-1(
                  v-for="(check,key,index) in checks"
                  :key="index"
                  v-bind:class="[check.value ? 'btn-success' : 'btn-danger']" disabled)
                  span.mr-2 {{ check.name }}
                  span.badge.badge-light.mr-1 {{ check.value ? 'OK' : 'NOT OK' }}
      .card-footer
         span.badge.badge-pill.badge-secondary.mr-1.p-2
            | Time : {{ processTime }} ms
</template>

<script>

   import manifest from './manifest.js';

   export default {
      props: ['m3u8'],
      data: () => {
         return {
            status: 0,
            statusText: '',
            isMaster: true,
            renditions: [{
               first: 0,
               last: 0,
               count: 0,
               chunks: [],
               program: 0
            }],
            checks:{
               firstChunk: false,
               lastChunk: false,
               chunkOrder: false,
               chunkCount: false
            },
            processTime: 0,
            timestamp: 0,
            curlbuttontext : 'Loading',
            duration: 0
         }
      },
      created: function () {
            const curler = manifest(this.m3u8);
            curler.refreshData().then((obj) => {
               this.status       = obj.status;
               this.statusText   = obj.statusText;
               this.isMaster     = obj.isMaster;
               this.renditions   = obj.renditions;
               this.checks       = obj.checks;
               this.processTime  = obj.processTime;
               this.timestamp    = obj.timestamp;
               this.curlbuttontext     = 'Curl';
            });
      },
      methods: {

         refreshAutocurl: function () {
            this.curlbuttontext = 'Loading'
            const curler = manifest(this.m3u8);
            curler.refreshData().then((obj) => {
               this.status       = obj.status;
               this.statusText   = obj.statusText;
               this.isMaster     = obj.isMaster;
               this.renditions   = obj.renditions;
               this.checks       = obj.checks;
               this.processTime  = obj.processTime;
               this.timestamp    = obj.timestamp;
               this.curlbuttontext     = 'Curl';
            });
         }

      }

   }
</script>

<style lang="scss">
   .watcher{
      border:2px solid black;
   }
</style>
