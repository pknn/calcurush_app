<template>
  <div class="page-wrapper">
    <div class="head-content">
      <span class="heading">Game Over</span>
    </div>
    <div class="body">
      <div class="level-wrapper">
        <span class="level">Level {{ level }}</span>
      </div>
      <div class="highscore-wrapper">
        New Highscore
      </div>
      <div class="score-wrapper">
        <div class="text-score">Score</div>
        <div class="score">{{ score }}</div>
      </div>
      <div class="control-wrapper">
        <router-link
          class="btn btn-primary"
          :to="{ name: 'level', params: { level: level } }"
        >
          <font-awesome-icons :icon="['fas', 'redo']"></font-awesome-icons>
        </router-link>
        <router-link class="btn btn-secondary" :to="{ name: 'select' }">
          <font-awesome-icons :icon="['fas', 'th-large']"></font-awesome-icons>
        </router-link>
        <router-link class="btn btn-secondary" :to="{ name: 'home' }">
          <font-awesome-icons :icon="['fas', 'home']"></font-awesome-icons>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: 2,
      score: 40
    }
  }
}
</script>

<style lang="sass" scoped>
.page-wrapper
  height: calc(100vh - 40px)
  @apply flex flex-col justify-center items-center
  .head-content
    .heading
      @apply text-3xl font-black
  .body
    @apply flex flex-col justify-center items-center
    .level-wrapper
      @apply m-2
      @apply text-xl font-bold text-center
    .highscore-wrapper
      @apply p-2 bg-blue font-semibold text-white
    .score-wrapper
      @apply m-6
      @apply text-center
      .text-score
        @apply text-grey-darker
      .score
        @apply text-5xl
    .control-wrapper
      @apply flex flex-col
</style>
