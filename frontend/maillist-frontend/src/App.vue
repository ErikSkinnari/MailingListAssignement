<template>
  <div id="app">
    <div id="nav" class="d-flex justify-content-between">
      <div>
      <router-link to="/">Login</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/about">About</router-link>
      </div>
      <b-button variant="warning">Log out</b-button>
    </div>
    <router-view/>
  </div>
</template>

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
