<template>
  <div class="page-wrapper">
    <div v-show="modal || init" class="overlay" @click="modal = false"></div>
    <div v-show="init" class="login-modal">
      <div class="content p-4">
        <font-awesome-icons
          :icon="['fas', 'cog']"
          size="3x"
          spin
        ></font-awesome-icons>
        <span class="m-4 text-xl font-medium">Initializing</span>
      </div>
    </div>
    <div v-show="modal" class="setting-modal">
      <div class="content">
        <span class="heading">Account Settings</span>
        <div v-if="!networkOnLine" class="offline">
          <button class="btn btn-google" disabled>
            <font-awesome-icons :icon="['fas', 'mask']"></font-awesome-icons>
            &nbsp;Network Offline
          </button>
        </div>
        <div v-else class="online">
          <div class="displayNameChange">
            <input
              ref="displayName"
              :value="editing ? displayNameToChange : displayName"
              class="input"
              name="displayName"
              type="text"
              placeholder="Display Name"
              @click="editing = true"
              @input="setDisplayNameToChange($event.target.value)"
              @blur="set"
            />
            <span>Tap to change display name</span>
          </div>
          <button
            v-if="user == undefined"
            class="btn btn-google"
            @click="loginAnonymous"
          >
            <font-awesome-icons :icon="['fas', 'mask']"></font-awesome-icons>
            &nbsp;Login Anonymously
          </button>
          <button v-else class="btn btn-google-outline" @click="logout">
            &nbsp;Logout
          </button>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <img alt="logo-bento" class="logo" src="@/assets/logo.png" />
      <router-link class="btn btn-primary" :to="{ name: 'select' }">
        <font-awesome-icons :icon="['fas', 'play']"></font-awesome-icons>
      </router-link>
      <router-link class="btn btn-secondary" :to="{ name: 'leaderboard' }">
        <font-awesome-icons :icon="['fas', 'trophy']"></font-awesome-icons>
      </router-link>
      <a class="btn btn-secondary" @click="modal = true">
        <font-awesome-icons :icon="['fas', 'user']"></font-awesome-icons>
      </a>

      <div v-show="user" class="user-info">
        <span><strong>User: </strong>{{ displayName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'

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
  data: () => ({
    loginError: null,
    modal: false,
    init: false,
    editing: false
  }),
  computed: {
    ...mapState('authentication', ['user', 'displayNameToChange']),
    ...mapState('app', ['networkOnLine']),
    displayName() {
      return this.user ? this.user.displayName : ''
    }
  },
  watch: {
    user: {
      handler(user) {
        if (user) {
          this.getHighscores()
          this.init = false
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (!this.user) {
      this.init = true
      this.loginAnonymous()
    } else this.init = false
  },
  methods: {
    ...mapMutations('authentication', ['setUser', 'setDisplayNameToChange']),
    ...mapActions('highscore', ['getHighscores']),
    ...mapActions('authentication', ['setDisplayName']),
    async loginAnonymous() {
      this.loginError = null
      this.setUser(undefined)
      try {
        await firebase.auth().signInAnonymously()
      } catch (err) {
        this.loginError = err
        this.setUser(null)
      }
    },
    async logout() {
      await firebase.auth().signOut()
    },
    set() {
      this.$refs.displayName.values = this.displayName
      this.editing = false
      this.setDisplayName()
    }
  }
}
</script>

<style lang="sass" scoped>
.page-wrapper
  height: calc(100vh - 40px)
  @apply flex flex-col justify-center items-center
  .overlay
    @apply absolute pin h-full w-full bg-black opacity-75 z-40
  .login-modal
    height: 30vh
    width: 80vw
    @apply z-50 absolute pin bg-white m-auto py-4 px-2 text-center rounded-lg shadow-lg
    .content
      @apply flex flex-col justify-center items-center h-full
  .setting-modal
    height: 25vh
    width: 80vw
    @apply z-50 absolute pin bg-white m-auto py-4 px-2 text-center rounded-lg shadow-lg
    .content
      @apply h-full w-full relative
      @apply flex flex-col
      .heading
        @apply mt-4 mb-6 text-lg font-bold uppercase
      .online
        .displayNameChange
          @apply flex flex-col justify-center items-center
          .input
            @apply p-2 bg-grey-lightest shadow-inner
            &.disabled
              @apply bg-grey-lighter
          span
            @apply text-xs

  .content-wrapper
    @apply flex flex-col justify-center items-center
    .logo
      @apply mb-6
    .user-info
      @apply absolute pin-b mb-4 text-xs
</style>
