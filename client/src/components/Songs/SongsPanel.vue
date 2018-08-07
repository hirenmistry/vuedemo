<template>
  <panel title="Songs">
        <v-btn class='cyan accent-2' light medium absolute right middle fab slot="action" :to="{name: 'songs-create'}">
          <v-icon>add</v-icon>
        </v-btn>
      <div class='song' v-for="song in songs" :key="song.id">
        <v-layout>
          <v-flex x6>
            <div class='song-title'>
              {{song.title}}
            </div>
            <div class='song-artist'>
              {{song.artist}}
            </div>
            <div class='song-genre'>
              {{song.genre}}
            </div>
            <v-btn class='cyan' dark :to="{
              name:'song',
              params:  {songId: song.id}
              }">View</v-btn>
          </v-flex>
          <v-flex x6>
            <img class='album-image' :src='song.albumImageUrl' />
          </v-flex>
        </v-layout>
      </div>
  </panel>
</template>
<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
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
