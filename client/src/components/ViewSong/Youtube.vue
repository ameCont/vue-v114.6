<template>
  <panel title="Youtube video">
    <youtube
    :video-id="youtubeId"
    :player-width="800"
    :player-height="330">
    </youtube>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
Vue.use(Vuetify)

export default {
  props: [
    'youtubeId'
  ],
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
