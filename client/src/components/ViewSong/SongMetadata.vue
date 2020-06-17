<template>
  <panel title="Song Metadata">
    <v-flex xs6>
    <div class="song-title">
    {{song.title}}
    </div>
    <div class="song-artist">
    {{song.artist}}
    </div>
    <div class="song-genre">
    {{song.genre}}
    </div>

     <v-btn
      dark
      class="cyan"
      :to="{
        name: 'song-edit',
        params () {
          return {
            songId: song.id
          }
        }
      }">
      Edit
    </v-btn>

    <v-btn
      v-if="isUserLoggedIn && !bookmark"
      dark
      class="cyan"
      @click="setAsBookmark">
      Set As Bookmark
    </v-btn>

    <v-btn
      v-if="isUserLoggedIn && bookmark"
      dark
      class="cyan"
      @click="unsetAsBookmark">
      Unset As Bookmark
    </v-btn>
  </v-flex>

  <v-flex xs6>
      <img class="album-image" :src="song.albumImageUrl" />
      <br>
      {{song.album}}
  </v-flex>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    try {
      this.bookmark = (await BookmarksService.index({
        // songId: this.song.id,
        songId: this.$store.state.route.params.songId,
        userId: this.$store.state.user.id
        // UserId: this.$store.state.route.params.UserId
      })).data
      // console.log('songId : ', songId)
      // console.log('userId : ', userId)
      this.isBookmarked = !!this.bookmark
      console.log('bookmark ', this.isBookmarked)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          // songId: this.song.id,
          songId: this.$store.state.route.params.songId,
          userId: this.$store.state.user.id
        })).data
        console.log('bookmarked')
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        console.log('unbookmarked')
        // console.log(this.bookmark.id)
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
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
