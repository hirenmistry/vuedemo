<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title='Register'>
        <form autocomplete='off' name='tab-tracker-form'>
            <v-text-field label="Email" v-model="email"></v-text-field>
            <br/>
            <v-text-field label="Password" type="password" v-model="password" autocomplete="new-password"></v-text-field>
            <br/>
            <v-btn class='cyan' dark @click="register">Register</v-btn>
            <div v-if="error" >
              <br/>
              <div class="danger-alert" v-html="error" />
            </div>
          </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register (e) {
      e.preventDefault()
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'songs'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
