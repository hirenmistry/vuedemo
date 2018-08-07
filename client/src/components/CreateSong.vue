<template>
    <v-layout>
        <v-flex xs4>
            <panel title='Song Metadata'>
                <v-text-field required :rules="[required]" label="Title" v-model="song.title"></v-text-field><br/>
                <v-text-field label="Artist" v-model="song.artist"></v-text-field><br/>
                <v-text-field label="Genre" v-model="song.genre"></v-text-field><br/>
                <v-text-field label="Album" v-model="song.album"></v-text-field><br/>
                <v-text-field label="Album Image Path" v-model="song.albumImageUrl"></v-text-field><br/>
                <v-text-field label="Youtube ID" v-model="song.youtubeId"></v-text-field><br/>
            </panel>
        </v-flex>
        <v-flex xs8>
            <panel title='Song Structure' class='ml-4'>
                <v-textarea label="Tab" v-model="song.tab" multi-line></v-textarea><br/>
                <v-textarea label="Lyrics ID" v-model="song.lyrics" multi-line></v-textarea><br/>
                <v-btn class='cyan' dark @click="create">Create</v-btn>
                <div v-if="error" >
                  <br/>
                  <div class="danger-alert" v-html="error" />
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>
<script>
import SongService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      required: (value) => !!value || 'Required.',
      error: null
    }
  },
  methods: {
    async create () {
      try {
        const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
        if (!areAllFieldsFilledIn) {
          this.error = 'Please, fill all required fields'
          return
        }
        await SongService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped>
</style>
