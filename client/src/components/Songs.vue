<template>
    <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
            <v-btn class='cyan accent-2' light medium absolute right middle fab slot="action" @click="navigateTo({name: 'songs-create'})">
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
                <v-btn class='cyan' dark @click="navigateTo({name:'song', params: {songId: song.id}})">View</v-btn>
              </v-flex>
              <v-flex x6>
                <img class='album-image' :src='song.albumImageUrl' />
              </v-flex>
            </v-layout>
          </div>
      </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
