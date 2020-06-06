<template>
  <div>
      <br>
    <UserInfo />
  </div>
</template>

<script>
// @ is an alias to /src
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'Profile',
  components: {
    UserInfo
  }
}
</script>