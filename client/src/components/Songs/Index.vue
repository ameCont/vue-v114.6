<template>
  <v-layout>
    <v-flex xs6>
      <songs-bookmarks />
      <recently-viewed-songs class="mt-2" />
    </v-flex>
    <v-flex xs6 class="ml-2">
      <songs-search-panel />
      <songs-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsBookmarks from './SongsBookmarks'
import SongsSearchPanel from './SongsSearchPanel'
import SongsService from '@/services/SongsService'
import ViewSong from '@/components/ViewSong/Index'
import RecentlyViewedSongs from './RecentlyViewedSongs'

export default {
  components: {
    ViewSong,
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 10px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
