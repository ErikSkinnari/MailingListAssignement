<template>
  <div class="d-flex justify-content-center">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="col-sm-10 col-md-6 col-lg-4 text-left">
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
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>

<style scoped>
    .flex {
        display: flex;
        flex-direction: row;
    }
</style>