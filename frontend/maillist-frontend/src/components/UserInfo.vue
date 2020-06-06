<template>
  <div>
      <h2>User Info</h2>
      <div class="info">
          <h4>Username: {{ this.userData.username }} </h4>
          <p>Email: {{ this.userData.email }} </p>
          <p>Subscribed: {{ this.userData.isSubscribed ? 'Yes' : 'No'}} </p>
          <b-button v-if="this.userData.isSubscribed" v-on:click="subscriptionHandler(userData.id)">Unsubscribe</b-button>
          <b-button variant="primary" v-if="!this.userData.isSubscribed" v-on:click="subscriptionHandler(userData.id)">Subscribe</b-button>
      </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: "UserInfo",
    methods: {
        ...mapActions(['fetchUserData', 'subscriptionHandler'])
    },
    computed: mapGetters(['userData']),
    created() {
        this.fetchUserData();
    }
}
</script>

<style>

</style>