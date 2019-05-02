<template>
  <div class="card">
    <div class="level">
      <div class="level-label">Level</div>
      {{ level.level }}
    </div>
    <div class="score-wrapper">
      <div class="user">
        {{ displayName }}
      </div>
      <div class="score">{{ level.info ? level.info.score + ' pt.' : '' }}</div>
    </div>
    <div class="trophy">
      <font-awesome-icons
        :class="isHighscore ? 'text-yellow' : 'text-black'"
        :icon="['fas', 'trophy']"
      ></font-awesome-icons>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    level: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    isHighscore() {
      return (
        this.level.info &&
        (this.level.info.user === this.user.displayName ||
          this.level.info.user === this.user.id)
      )
    },
    displayName() {
      if (this.level.info)
        return this.level.info.user.length > 15
          ? this.level.info.user.slice(0, 15) + '...'
          : this.level.info.user
      else return 'No Records'
    }
  }
}
</script>

<style lang="sass" scoped>
.card
  @apply w-full
  @apply flex items-center justify-center
  @apply p-5 my-6
  @apply shadow-md rounded-lg
  .level
    @apply text-center
    @apply pr-3
    border-right: 1px solid hsla(0, 0, 0, 0.2)
    .level-label
      @apply text-sm uppercase
  .score-wrapper
    @apply flex-1
    @apply pl-3
    .user
      @apply text-lg font-medium
    .score
      @apply text-sm font-thin
</style>
