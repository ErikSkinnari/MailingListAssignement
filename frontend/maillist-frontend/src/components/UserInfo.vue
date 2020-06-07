<template>
  <div>
      <h2 class="mt-5">User Info</h2>
      <div class="info">
          <h4>Username: {{ user.username }} </h4>
          <p>Email: {{ user.email }} </p>
          <p>Subscribed: {{ user.isSubscribed ? 'Yes' : 'No'}} </p>

           <b-form @submit.prevent="subscriptionHandler">
              <b-button v-if="user.isSubscribed" v-on:click="subscriptionHandler">Unsubscribe</b-button>
              <b-button variant="primary" v-if="!user.isSubscribed" v-on:click="subscriptionHandler">Subscribe</b-button>
           </b-form>
      </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: "UserProfile",
    methods: {
        fetchUserData() {
            this.$store.dispatch('fetchUserData');
        },

        subscriptionHandler() {
            this.$store.dispatch('subscriptionHandler', {
                id: this.user._id,
                status: !this.user.isSubscribed
            });
        }

        // ...mapActions(['fetchUserData', 'subscriptionHandler']),
    },
    computed: mapGetters(['user']),

    created() {
        this.fetchUserData();
    }
}
</script>

<style>

</style>