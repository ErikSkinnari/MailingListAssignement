<template>
  <div id="app">
    <div id="nav" class="d-flex justify-content-between">
      <div>
      <router-link v-if="!isLoggedIn" to="/login">Login | </router-link>
      <router-link v-if="isLoggedIn" to="/profile">Profile | </router-link>
      <router-link to="/about">About</router-link>
      </div>
      <b-button v-if="isLoggedIn" v-on:click="logout" variant="warning">Log out</b-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    computed : {
      isLoggedIn() { 
        return this.$store.getters.loggedIn
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        });
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: black;
}

#nav a {
  font-weight: bold;
  color: white;
  /* color: #2c3e50; */
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
