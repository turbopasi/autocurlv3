<template lang="pug">
   .watcher.card.mb-3.bg-light
      .card-header.h7.font-weight-bold.p-2 {{ watcher.manifestUrl.href }}
      .card-body
         .row
            .col.p-1
               .card.bg-light
                  .card-header.h7.p-1 Stats
                  ul.list-group.list-group-flush
                     li.list-group-item.p-1 Status:
                        strong  {{ status }}
                     li.list-group-item.p-1 Renditions:
                        strong  {{ renditions }}
                     li.list-group-item.p-1 Requests:
                        strong  {{ requests }}
                     li.list-group-item.p-1 Interval(ms):
                        strong  {{ intervalMs }}
            .col.p-1
               .card.bg-light
                  .card-header.h7.p-1 Chunks
                  ul.list-group.list-group-flush
                     li.list-group-item.p-1 Amount:
                        strong  {{ chunks }}
                     li.list-group-item.p-1 First:
                        strong  {{ first }}.ts
                     li.list-group-item.p-1 Last:
                        strong  {{ last }}.ts
            .col.p-1
               .card.bg-light
                  .card-header.h7.p-1 Checks
                  ul.list-group.list-group-flush
                     li.list-group-item.p-1='Equal first chunks: '
                        span.badge.badge-pill.badge-secondary {{ checks.firstChunk }}
                     li.list-group-item.p-1='Equal last chunks: '
                        span.badge.badge-pill.badge-secondary {{ checks.lastChunk }}
                     li.list-group-item.p-1='Sequence order: '
                        span.badge.badge-pill.badge-secondary {{ checks.chunkOrder }}
                     li.list-group-item.p-1='Equal sequence length: '
                        span.badge.badge-pill.badge-secondary {{ checks.chunkCount }}
      .card-footer.p-2
         .btn-toolbar(role="toolbar")
            .btn-group.mr-2(role="group" aria-label="Footer options")
               button.btn.btn-sm.btn-outline-danger.material-icons(@click="$emit('remove-watcher', watcher)" type="button") delete_forever
               button.btn.btn-sm.btn-outline-primary.material-icons(type="button" :class="[isRunning ? 'disabled' : '']" @click="refreshWatcherProcess()") loop
               button.btn.btn-sm(type="button" @click="toggleWatcherProcess(watcher)" :class="[isRunning ? 'btn-danger' : 'btn-success']") {{ toggleButton }}
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
            first: 0,
            last: 0,
            intervalMs: 5000,
            checks: {},
            errors: []
         }
      },
      methods: {

         toggleWatcherProcess: function (watcher) {
            if (!this.isRunning) {
               const intervalObj = setInterval( () => {
                  watcher.refreshData()
                     .then( (obj) => {
                        this.requests += 1;
                        this.renditions = obj.renditions.length;
                        this.chunks = obj.renditions[0].chunks.length;
                        this.status = obj.status + ' ' + obj.statusText;
                        this.first = obj.renditions[0].first;
                        this.last = obj.renditions[0].last;
                        this.checks = obj.checks,
                        this.errors = obj.errors
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
