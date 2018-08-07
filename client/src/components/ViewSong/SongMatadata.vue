<template>
<panel title='Song Matadata'>
    <v-layout>
        <v-flex xs6>
        <div class='song-title'>
            {{song.title}}
        </div>
        <div class='song-artist'>
            {{song.artist}}
        </div>
        <div class='song-genre'>
            {{song.genre}}
        </div>
        <v-btn class='cyan' dark :to="{name:'song-edit', params () {return {songId: song.id}}}">Edit</v-btn>
        <v-btn v-if="isUserLoggedIn && !bookmark" class='cyan' dark @click="setAsBookmark">Set as Bookmark</v-btn>
        <v-btn v-if="isUserLoggedIn && bookmark" class='cyan' dark @click="unsetAsBookmark">Unset as Bookmark</v-btn>
        </v-flex>
        <v-flex x6>
        <img class='album-image' :src='song.albumImageUrl' /><br/>
        {{song.album}}
        </v-flex>
    </v-layout>
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
    ...mapState(['isUserLoggedIn'])
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songid: this.$store.state.route.params.songId,
          userid: this.$store.state.user.id
        })).data
        console.log('newbookmarkis:', this.bookmark)
      } catch (err) {
        console.log('error:', err)
      }
      console.log('bookmarked')
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log('error:', err)
      }
      console.log('unbookmarked')
    }
  },
  watch: {
    async song () {
      try {
        if (!this.isUserLoggedIn) {
          return
        }
        this.bookmark = (await BookmarksService.index({
          songid: this.song.id,
          userid: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log('error:', err)
      }
    }
  }
}
</script>
<style scoped>
.album-image {
  width: 70%;
  margin: 0 auto;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
</style>
