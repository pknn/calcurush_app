<template>
  <div class="card cursor-pointer" @click="play">
    <span class="level-label">{{ level }}</span>
  </div>
</template>

<style lang="sass" scoped>
.card
  flex-basis: 45%
  @apply m-2 shadow-md rounded flex items-center justify-center
  &:active
    @apply shadow-none bg-grey
  .level-label
    @apply text-lg font-medium p-6
</style>

<script>
export default {
  props: {
    level: {
      type: String,
      default: '1'
    },
    unlocked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    play() {
      this.$router.push({ name: 'level', params: { level: this.level } })
    }
  }
}
</script>
