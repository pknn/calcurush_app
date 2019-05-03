<template>
  <div class="page-wrapper">
    <div class="head-content">
      <span class="heading">Game Over</span>
    </div>
    <div class="body">
      <div class="level-wrapper">
        <span class="level"
          >Level {{ game.level == 99 ? 'Hard' : game.level }}</span
        >
      </div>
      <div v-show="isHighScore" class="highscore-wrapper">
        New Highscore
      </div>
      <div class="score-wrapper">
        <div class="text-score">Score</div>
        <div class="score">{{ game.score }}</div>
      </div>
      <div class="control-wrapper">
        <router-link
          class="btn btn-primary"
          :to="{ name: 'level', params: { level: game.level } }"
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
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('highscore', ['isNewHighScore']),
    ...mapState('highscore', ['game']),
    ...mapState('authentication', ['user']),
    isHighScore() {
      return this.isNewHighScore(this.game)
    }
  },
  mounted() {
    if (this.isHighScore) {
      this.setHighScore({
        level: this.game.level == 99 ? 'hard' : this.game.level,
        info: {
          user: this.user.displayName || this.user.id,
          score: this.game.score
        }
      })
      this.getHighscores()
    }
  },
  methods: {
    ...mapActions('highscore', ['setHighScore', 'getHighscores'])
  }
}
</script>

<style lang="sass" scoped>
@import '@/theme/variables.sass'
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
      @apply p-2 font-semibold text-white
      background: $secondary
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
