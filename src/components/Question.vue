<template>
  <div class="container">
    <div class="question">
      <h1 class="text-5xl">{{ lv }} x {{ multiplier }}</h1>
    </div>
    <div class="choices">
      <div
        v-for="answer in answers"
        :key="answer.number"
        class="choice"
        @click="verify(answer)"
      >
        <h1>{{ answer.number }}</h1>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/theme/variables.sass'
.container
  @apply flex flex-col h-full
  height: calc(100vh - 97px)
.question
  @apply flex items-center justify-center
  @apply py-32
.choices
  @apply flex flex-1 flex-col justify-center items-center
  .choice
    @apply w-full text-center flex-1 m-2 rounded-lg shadow-md
    @apply flex justify-center items-center
    background: $grey
</style>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 2
    },
    min: {
      type: Number,
      default: 2
    },
    max: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      lv: 0,
      multiplier: 0,
      multipliers: [],
      answers: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    verify(answer) {
      if (answer.isCorrect) this.$emit('onCorrect')
      else this.$emit('onIncorrect')
    },
    generate() {
      for (let i = 0; i < 10; i++) {
        this.multipliers.push(
          Math.floor(Math.random() * (this.max - this.min) + this.min)
        )
      }
      this.multipliers.reverse()
    },
    init() {
      this.answers = []
      const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
      this.lv = this.level === 99 ? random(2, 12) : this.level
      if (this.multipliers.length <= 5) this.generate()
      this.multiplier = this.multipliers.pop()
      const answer = this.lv * this.multiplier
      const min = answer - 10 >= this.lv ? answer - 10 : this.lv
      const max = answer + 10
      const a = [min, answer]
      for (let i = 0; i < 4; i++) {
        const c = random(min, max)
        if (a.some(v => v === c)) {
          i--
          continue
        }
        a.push(c)
        this.answers.push({
          number: c,
          isCorrect: false
        })
      }

      const correctIndex = random(0, 3)
      this.answers[correctIndex] = {
        number: answer,
        isCorrect: true
      }
    }
  }
}
</script>
