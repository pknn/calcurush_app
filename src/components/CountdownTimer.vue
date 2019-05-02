<template>
  <div class="countdown">
    <span>{{ time }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: 3000,
      last: 0,
      state: 'stopped'
    }
  },
  computed: {
    time() {
      const time = Math.ceil(this.distance / 1000)
      return `${time}`
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    update() {
      const elapsed = new Date().getTime() - this.last
      this.distance = this.distance - elapsed
      if (this.distance <= 0) {
        this.stop()
      }
      if (this.state === 'running') {
        this.last = new Date().getTime()
        requestAnimationFrame(this.update)
      }
    },
    start() {
      this.state = 'running'
      this.last = new Date().getTime()
      requestAnimationFrame(this.update)
    },
    stop() {
      this.state = 'stopped'
      this.distance = 1000
      this.$emit('onStop')
    }
  }
}
</script>

<style lang="sass" scoped>
.countdown
  @apply flex justify-center items-center
  @apply w-32 h-32 bg-white rounded-lg shadow-lg
  @apply absolute pin z-50 m-auto
  span
    @apply text-5xl font-black
</style>
