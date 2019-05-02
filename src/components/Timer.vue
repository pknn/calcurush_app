<template>
  <section class="main-timer relative text-center flex-1">
    <span
      v-if="showSec"
      class="second text-3xl font-medium"
      :class="sec <= 0 ? timeUpClass : sec <= 5 ? timeFewClass : ''"
      >{{ sec }}</span
    >
    <span
      v-if="showMillis"
      class="millis text-md"
      :class="sec <= 0 ? timeUpClass : sec <= 5 ? timeFewClass : ''"
    >
      {{ millis }}</span
    >
    <div v-if="showBar" class="bottom-line" :style="{ width: w + '%' }"></div>
  </section>
</template>

<style lang="sass">
.main-timer
  @apply p-2
.bottom-line
  position: absolute
  margin-left: auto
  margin-right: auto
  left: 0
  right: 0
  height: 10%
  bottom: 0
  background: purple
  -webkit-transition: width 1s linear
  @apply rounded
</style>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 30
    },
    showBar: {
      type: Boolean,
      default: true
    },
    showSec: {
      type: Boolean,
      default: true
    },
    showMillis: {
      type: Boolean,
      default: true
    },
    timeUpClass: {
      type: String,
      default: 'text-red'
    },
    timeFewClass: {
      type: String,
      default: 'text-orange'
    }
  },
  data() {
    return {
      distance: 0,
      state: 'stop',
      last: 0,
      w: 100
    }
  },
  computed: {
    sec() {
      const second = Math.floor(this.distance / 1000)
      return `${second}`
    },
    millis() {
      const millis = Math.floor((this.distance % 1000.0) / 100)
      return `${millis}`
    }
  },
  mounted() {
    this.distance = parseInt(this.time) * 1000
  },
  methods: {
    update() {
      const elapsed = new Date().getTime() - this.last
      this.distance = this.distance - elapsed
      this.w = (parseFloat(this.sec) / parseFloat(this.time)) * 100
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
      this.state = 'stop'
      this.distance = 0
      this.$emit('onStop')
    },
    pause() {
      this.state = 'pause'
    },
    resume() {
      this.start()
    },
    add(time) {
      const newTime = parseInt(this.sec) + time
      this.distance = newTime >= this.time ? this.time * 1000 : newTime * 1000
    },
    deduct(time) {
      const newTime = this.distance - time * 1000
      this.distance = newTime <= 0 ? 0 : newTime
    }
  }
}
</script>
