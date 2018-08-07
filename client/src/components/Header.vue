<template>
    <v-toolbar fixed class='cyan' dark>
      <v-toolbar-title class='mr-4'>
          <router-link tag='span'  class="home" :to="{name: 'songs'}">Tab Tracker</router-link>
      </v-toolbar-title>
      <v-toolbar-items>
         <v-btn flat dark>
            <router-link tag='span' :to="{name: 'songs'}">Browse</router-link>
        </v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn flat dark v-if='!$store.state.isUserLoggedIn'>
            <router-link tag='span' :to="{name: 'login'}">Login</router-link>
        </v-btn>
        <v-btn flat dark v-if='!$store.state.isUserLoggedIn'>
            <router-link tag='span' :to="{name: 'register'}">SignUp</router-link>
        </v-btn>
        <v-btn flat dark v-if='$store.state.isUserLoggedIn' @click="logout">
            Log Out
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'songs'})
    }
  }
}
</script>
<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}
</style>
