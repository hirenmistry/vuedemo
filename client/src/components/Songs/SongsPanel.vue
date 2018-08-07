<template>
  <panel title="Songs">
      <v-btn class='cyan accent-2' light medium absolute right middle fab slot="action" :to="{name: 'songs-create'}">
        <v-icon>add</v-icon>
      </v-btn>
      <v-data-table :headers='headers' :pagination.sync='pagination' :items='songs'>
            <template slot='items' slot-scope='props'>
              <td class='text-xs-right'>
                <img class='album-image' :src='props.item.albumImageUrl' />
              </td>
              <td class='text-xs-right'>{{props.item.title}}</td>
              <td class='text-xs-right'>{{props.item.artist}}</td>
              <td class='text-xs-right'>{{props.item.genre}}</td>
              <td class='text-xs-right'>
                <v-btn class="cyan" dark :to="{name: 'song', params: { songId: props.item.id}}">View</v-btn>
                <!-- <router-link tag='v-btn' light class='cyan' :to="{name: 'song', params: { songId: props.item.id}}">View</router-link> -->
              </td>
            </template>
        </v-data-table>
  </panel>
</template>
<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: [],
      headers: [
        {
          text: 'Image',
          value: 'image',
          sortable: false

        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        },
        {
          text: 'Genre',
          value: 'genre'
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false
        }
      ],
      pagination: {
        sortBy: 'id',
        descending: true
      }
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
    console.log(this.songs)
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
