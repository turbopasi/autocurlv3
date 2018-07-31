<template lang="pug">
   #app
      .container.mt-4
         autocurl( v-bind:m3u8="m3u8" )
         autocurl( v-bind:m3u8="m3u8_2" )
</template>

<script>

   import Autocurl from './components/autocurl/Autocurl.vue';

   export default {
      name: 'app',
      data: () => {
         return {
            m3u8:'https://rbmn-live.akamaized.net/hls/live/590971/180712Goodwood1Pri/master.m3u8',
            m3u8_2:'https://liveredbulltv02-i.akamaihd.net/hls/live/573017/171014IronmanPri/master.m3u8'
         }
      },
      components: {
         Autocurl
      }
   }

</script>

<style lang="scss">

</style>
