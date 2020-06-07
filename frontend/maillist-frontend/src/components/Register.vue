<template>
  <div>
    <h2 class="mt-5">Register new account</h2>
    <div class="d-flex justify-content-center">
      <b-form @submit.prevent="register" v-if="show" class="col-sm-10 col-md-6 col-lg-4 text-left">
        <br />

        <b-form-group id="input-email" label="Email address:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-username" label="Username:" label-for="username">
          <b-form-input
            id="username"
            v-model="form.username"
            type="text"
            required
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-password" label="Password:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-password2" label="Confirm Password:" label-for="password2">
          <b-form-input
            id="password2"
            type="password"
            v-model="form.password2"
            required
            placeholder="Confirm password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-subscribe">
          <b-form-checkbox v-model="form.subscribe" id="subscribe">Subscribe to mailinglist</b-form-checkbox>
        </b-form-group>

        <div class="text-center">
          <b-button type="submit" variant="primary" class="pl-4 pr-4">Register</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
        password2: "",
        subscribe: true
      },
      show: true
    };
  },
  methods: {
    register: function() {
      let newUser = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        password2: this.form.password2,
        subscribe: this.form.subscribe
      };
      this.$store
        .dispatch("register", newUser)
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>