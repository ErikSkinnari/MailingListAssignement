<template>
  <div class="d-flex justify-content-center">
    <b-form @submit.prevent="login" v-if="show" class="col-sm-10 col-md-6 col-lg-4 text-left">
        <br>

      <b-form-group id="input-email" label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email" ></b-form-input>
      </b-form-group>

      <b-form-group id="input-password" label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="pl-4 pr-4">Log in</b-button>

      <div class="d-flex justify-content-around mt-5 align-items-center">
        <p>No account? Register here --></p>
        <router-link to="/register"><b-button type="submit" variant="outline-primary">Register</b-button></router-link>
      </div>
    </b-form>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        form: {
          email: '',
          name: ''
        },
        show: true
      }
    },
    methods: {
      login: function () {
        let email = this.form.email 
        let password = this.form.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/profile'))
       .catch(err => {
         console.log(err);
          this.$router.push('/login')
         })
      }
    }
  }
</script>