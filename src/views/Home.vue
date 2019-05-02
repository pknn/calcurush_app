<template>
  <div class="page-wrapper">
    <img alt="logo-bento" class="logo" src="@/assets/logo.png" />
    <router-link :to="{ name: 'select' }">
      <font-awesome-icons :icon="['fas', 'play']"></font-awesome-icons>
    </router-link>
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
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="sass" scoped>
@import '@/theme/variables.scss'

.page-wrapper
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .logo
    margin-bottom: 3rem
</style>
