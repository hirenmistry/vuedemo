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
import {mapState} from 'vuex'
import SongMatadata from '@/components/ViewSong/SongMatadata'
import YouTube from '@/components/ViewSong/YouTube'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tabs from '@/components/ViewSong/Tabs'
import SongsService from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'
export default {
  data () {
    return {
      song: {}
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'user', 'route'])
  },
  async mounted () {
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
      })
    }
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
