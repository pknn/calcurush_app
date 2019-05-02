<template>
  <div class="page-wrapper">
    <div class="pause-screen"></div>
    <div class="overlay"></div>
    <div class="gameplay">
      <div class="head-content">
        <div class="side pause-button">
          <font-awesome-icons :icon="['fas', 'pause']"></font-awesome-icons>
        </div>
        <div class="timer flex-1"><timer /></div>
        <div class="side score">
          <div class="header">
            <span>Score</span>
          </div>
          <div class="body">
            {{ score }}
          </div>
        </div>
      </div>
      <div class="body"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.page-wrapper
  @apply flex flex-col justify-center items-center
  .gameplay
    @apply w-full
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

export default {
  components: { Timer },
  data() {
    return {
      score: 0,
      state: 'stopped'
    }
  },
  methods: {
    togglePause() {},
    levelSelect() {},
    mainMenu() {}
  }
}
</script>
