<template>
  <div class="card cursor-pointer" @click="play">
    <span class="level-label">{{ level }}</span>
  </div>
</template>

<style lang="sass" scoped>
@import '@/theme/variables.sass'
.card
  flex-basis: 40%
  @apply my-2 shadow-lg rounded-lg flex items-center justify-center
  background: $grey
  &:active
    @apply shadow-md
    background: darken($grey, 20)
  .level-label
    @apply text-xl font-semibold px-6 py-8 capitalize
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
