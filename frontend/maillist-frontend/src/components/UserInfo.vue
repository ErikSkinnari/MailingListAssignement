<template>
  <div>
      <h2>User Info</h2>
      <div class="info">
          <h4>Username: {{ this.user.username }} </h4>
          <p>Email: {{ this.user.email }} </p>
          <p>Subscribed: {{ this.user.isSubscribed ? 'Yes' : 'No'}} </p>
          <b-button v-if="this.user.isSubscribed" v-on:click="subscriptionHandler(userData.id)">Unsubscribe</b-button>
          <b-button variant="primary" v-if="!this.user.isSubscribed" v-on:click="subscriptionHandler(userData.id)">Subscribe</b-button>
      </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: this.$store.user
        }
    },
    name: "UserInfo",
    methods: {
        ...mapActions(['fetchUserData', 'subscriptionHandler'])
    },
    computed: mapGetters(['userData']),
    created() {
        // this.$store.dispatch()
        // this.$store.fetchUserData();
    }
}
</script>

<style>

</style>