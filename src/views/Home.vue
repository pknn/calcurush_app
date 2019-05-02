<template>
  <div class="page-wrapper">
    <img alt="logo-bento" class="logo" src="@/assets/logo.png" />
    <router-link class="btn btn-primary" :to="{ name: 'select' }">
      <font-awesome-icons :icon="['fas', 'play']"></font-awesome-icons>
    </router-link>
    <router-link class="btn btn-secondary" :to="{ name: 'select' }">
      <font-awesome-icons :icon="['fas', 'trophy']"></font-awesome-icons>
    </router-link>
    <router-link class="btn btn-secondary" :to="{ name: 'select' }">
      <font-awesome-icons :icon="['fas', 'cog']"></font-awesome-icons>
    </router-link>

    <div class="user-info">
      <span><strong>User: </strong>Guest 156273</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head: {
    title: {
      inner: 'Home'
    },
    meta: [
      {
        name: 'description',
        content: 'Calcurush home page',
        id: 'desc'
      }
    ]
  },
  computed: {
    ...mapState('app', ['appTitle'])
  }
}
</script>

<style lang="sass" scoped>
@import '@/theme/variables.sass'

.page-wrapper
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .logo
    margin-bottom: 3rem
  .user-info
    @apply absolute pin-b mb-2
</style>
