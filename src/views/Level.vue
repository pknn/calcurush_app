<template>
  <div class="page-wrapper">
    <div v-show="state === 'init'" class="countdown-timer">
      <countdown-timer @onStop="gameStart" />
    </div>
    <div v-show="state === 'pausing'" class="pause-screen">
      <div class="content">
        <span class="heading">Paused</span>
        <a class="btn btn-primary" @click="togglePause">
          <font-awesome-icons :icon="['fas', 'play']"></font-awesome-icons>
        </a>
        <router-link class="btn btn-secondary" :to="{ name: 'select' }">
          <font-awesome-icons :icon="['fas', 'th-large']"></font-awesome-icons>
        </router-link>
        <router-link class="btn btn-secondary" :to="{ name: 'home' }">
          <font-awesome-icons :icon="['fas', 'home']"></font-awesome-icons>
        </router-link>
      </div>
    </div>
    <div
      v-show="state === 'stopped' || state === 'pausing' || state === 'init'"
      class="overlay"
      @click="togglePause"
    ></div>
    <div class="gameplay">
      <div class="head-content">
        <div class="side pause-button" @click="togglePause">
          <font-awesome-icons :icon="['fas', 'pause']"></font-awesome-icons>
        </div>
        <div class="timer flex-1"><timer ref="timer" @onStop="gameOver" /></div>
        <div class="side score">
          <div class="header">
            <span>Score</span>
          </div>
          <div class="body">
            {{ score }}
          </div>
        </div>
      </div>
      <div class="body">
        <question
          ref="question"
          :level="level"
          @onCorrect="correct"
          @onIncorrect="incorrect"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.page-wrapper
  @apply flex flex-col justify-center items-center
  .countdown-timer
    @apply absolute pin z-50
  .pause-screen
    height: 40vh
    width: 80vw
    @apply z-50 absolute pin bg-white m-auto py-4 px-2 text-center rounded-lg
    .content
      @apply h-full w-full relative
      @apply flex flex-col
      .heading
        @apply mt-4 mb-6 text-lg font-bold uppercase
  .overlay
    @apply absolute pin h-full w-full bg-black opacity-75 z-40
  .gameplay
    @apply w-full h-full
    .head-content
      @apply flex w-full items-center justify-center
      .side
        @apply m-3 w-8
      .timer
        @apply flex-1
      .score
        .header
          @apply text-xs
        .body
          @apply text-lg text-center font-bold
</style>

<script>
import CountdownTimer from '@/components/CountdownTimer'
import Timer from '@/components/Timer'
import Question from '@/components/Question'

export default {
  components: { CountdownTimer, Timer, Question },
  data() {
    return {
      score: 0,
      state: 'init'
    }
  },
  computed: {
    level() {
      return this.$route.params.level === 'hard'
        ? 99
        : parseInt(this.$route.params.level)
    }
  },
  mounted() {},
  methods: {
    gameStart() {
      this.state = 'running'
      this.$refs.timer.start()
    },
    togglePause() {
      if (this.state == 'pausing') {
        this.state = 'running'
        this.$refs.timer.resume()
      } else {
        this.state = 'pausing'
        this.$refs.timer.pause()
      }
    },
    levelSelect() {},
    mainMenu() {},
    correct() {
      this.score++
      this.$refs.question.init()
      this.$refs.timer.add(10)
    },
    incorrect() {
      this.$refs.question.init()
      this.$refs.timer.deduct(3)
    },
    gameOver() {
      this.$router.push('/')
    }
  }
}
</script>
