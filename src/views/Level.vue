<template>
  <div class="page-wrapper">
    <div class="countdown-timer"></div>
    <div class="pause-screen"></div>
    <div class="overlay"></div>
    <div class="gameplay">
      <div class="head-content">
        <div class="side pause-button">
          <font-awesome-icons :icon="['fas', 'pause']"></font-awesome-icons>
        </div>
        <div class="timer flex-1"><timer ref="timer" /></div>
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
import Timer from '@/components/Timer'
import Question from '@/components/Question'

export default {
  components: { Timer, Question },
  data() {
    return {
      score: 0,
      state: 'stopped'
    }
  },
  mounted() {},
  methods: {
    togglePause() {},
    levelSelect() {},
    mainMenu() {},
    correct() {
      this.score++
      this.$refs.question.init()
      this.$refs.timer.add(2)
    },
    incorrect() {
      this.$refs.question.init()
      this.$refs.timer.deduct(3)
    }
  }
}
</script>
