<template>
  <div class="container">
    <div class="question">
      <h1 class="text-5xl">{{ level }} x {{ multiplier }}</h1>
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
.container
  @apply flex flex-col h-full
  height: calc(100vh - 97px)
.question
  @apply flex items-center justify-center
  @apply py-32
.choices
  @apply flex flex-1 flex-col justify-center items-center
  .choice
    @apply bg-green w-full text-center flex-1 m-2
    @apply flex justify-center items-center
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
      multiplier: 0,
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
    init() {
      this.answers = []
      const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
      this.multiplier = random(this.min, this.max)
      const answer = this.level * this.multiplier
      const min = answer - 10 >= this.level ? answer - 10 : this.level
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
