<template lang="pug">
   .watcher.card.mb-3.bg-light
      .card-header.h7.font-weight-bold.p-2 {{ watcher.url }}
      .card-body
         .row
            .col.p-1
               .card.bg-light
                  .card-header.h7.p-2 Stats
                  ul.list-group.list-group-flush
                     li.list-group-item.p-2 Status:
                        strong  {{ status }}
                     li.list-group-item.p-2 Renditions:
                        strong  {{ renditions }}
                     li.list-group-item.p-2 Requests:
                        strong  {{ requests }}
                     li.list-group-item.p-2 Interval(ms):
                        strong  {{ intervalMs }}
            .col.p-1
               .card.bg-light
                  .card-header.h7.p-2 Chunks
                  ul.list-group.list-group-flush
                     li.list-group-item.p-2 Amount:
                        strong  {{ chunks }}
            .col.p-1
               .card.bg-light
                  .card-header.h7.p-2 Checks
                  .card-body
      .card-footer.p-2
         .btn-toolbar(role="toolbar")
            .btn-group.mr-2(role="group" aria-label="Footer options")
               button.btn.btn-sm.btn-outline-danger.material-icons(@click="$emit('remove-watcher', watcher)" type="button") delete_forever
               button.btn.btn-sm.btn-outline-primary.material-icons(type="button" :class="[isRunning ? 'disabled' : '']" @click="refreshWatcherProcess()") loop
               button.btn.btn-sm(type="button" @click="toggleWatcherProcess()" :class="[isRunning ? 'btn-danger' : 'btn-success']") {{ toggleButton }}
            .btn-group.mr-2(role="group" aria-label="Footer options")
               button.btn.btn-sm.btn-secondary(type="button" @click="resetWatcherProcess()") Reset
</template>

<script>
   import getDataUpdate from '../app/getDataUpdate';

   export default {
      props: ['watcher'],
      data: () => {
         return {
            isRunning:false,
            toggleButton: 'Start',
            status: 0,
            renditions: 0,
            requests: 0,
            chunks: 0,
            intervalMs: 5000
         }
      },
      methods: {

         toggleWatcherProcess: function () {

            if (!this.isRunning) {

               const intervalObj = setInterval( () => {
                  getDataUpdate(this.watcher.url, (err, data) => {

                     this.status = data.status;
                     this.renditions = data.renditions.length;
                     this.chunks  = data.renditions[0].chunks.length;
                     this.requests += 1;

                  });
               }, this.intervalMs);
               this.interval = intervalObj;

            } else if (this.isRunning) {

               clearInterval(this.interval);

            }

            this.isRunning = this.isRunning ? false : true;
            this.toggleButton = this.isRunning ? 'Stop' : 'Start';

         },

         refreshWatcherProcess: function () {
            if (!this.isRunning) {
               getDataUpdate(this.watcher.url, (err, data) => {

                  this.status = data.status;
                  this.renditions = data.renditions.length;
                  this.chunks  = data.renditions[0].chunks.length;
                  this.requests += 1;

               });
            }
         },

         resetWatcherProcess: function () {
            this.status = 0;
            this.renditions = 0;
            this.requests = 0;
            this.chunks = 0;
            this.intervalMs = 5000;
         }

      }

   }
</script>

<style lang="scss">
   .watcher{
      border:2px solid black;
   }
</style>
