<template>
<div>
 <v-layout>
    <v-flex xs6>
      <song-matadata :song='song'/>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <you-tube :youtubeId='song.youtubeId'/>
    </v-flex>
  </v-layout>
  <v-layout class="mt-2">
    <v-flex xs6>
      <tabs :song='song'/>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <lyrics :song='song'/>
    </v-flex>
  </v-layout>

</div>
</template>
<script>
import SongsService from '@/services/SongsService'
import SongMatadata from '@/components/ViewSong/SongMatadata'
import YouTube from '@/components/ViewSong/YouTube'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tabs from '@/components/ViewSong/Tabs'
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
    SongMatadata,
    YouTube,
    Lyrics,
    Tabs
  }
}
</script>
<style scoped>

</style>
