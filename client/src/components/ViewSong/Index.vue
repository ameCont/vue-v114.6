<template>
<div>
  <v-layout class="mt-2">
    <v-flex xs6>
     <song-metadata :song="song"/>
    </v-flex>

    <v-flex xs6 class="ml-2">
      <youtube :youtubeId="song.youtubeId"/>
    </v-flex>
  </v-layout>

  <v-layout class="mt-2">
    <v-flex xs6>
      <tab :song="song"/>
    </v-flex>

    <v-flex xs6 class="ml-2">
      <lyrics :song="song" />
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import Youtube from './Youtube'
import Tab from './Tab'
import Lyrics from './Lyrics'
import SongMetadata from './SongMetadata'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    SongMetadata,
    Youtube,
    Lyrics,
    Tab
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
