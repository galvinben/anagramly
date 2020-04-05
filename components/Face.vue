<template>
  <div class="face-container">
    <transition name="slide-fade" mode="out-in">
      <fa class="face" :key="emotion" :icon="['far', emotion]" />
      <Loading v-if="typing && !success" key="typing" />
    </transition>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading,
  },
  props: ['typed', 'answer', 'typing'],
  computed: {
    correctLetters() {
      let answer = [...this.answer]
      return this.typed.filter(function (letter) {
        if (answer.includes(letter)) {
          answer.splice(answer.indexOf(letter), 1)
          return true
        }
      }).length
    },
    correctLettersPerc() {
      return (
        (this.correctLetters / this.answer.length) * 30 +
        (this.correctLetters / this.typed.length || 0) * 25
      )
    },
    correctOrder() {
      return this.typed.filter((letter, i) => this.answer[i] === letter).length
    },
    correctOrderPerc() {
      return (this.correctOrder / this.answer.length) * 45
    },
    score() {
      return this.correctLettersPerc + this.correctOrderPerc
    },
    emotion() {
      let typed = this.typed.length
      let answer = this.answer.length
      let score = this.score
      if (score < 0) return 'dizzy'
      if (score === 0) return 'tired'
      if (typed > 2 && this.correctLetters === 0) return 'grin-beam-sweat'
      if (typed > 1 && this.correctLetters === 0) return 'meh-rolling-eyes'
      if (typed > 0 && this.correctLetters === 0) return 'grimace'
      if (score === 100) return 'grin-stars'
      if (score > 80) return 'grin-beam'
      if (score > 70) return 'smile-beam'
      if (score > 60) return 'grin'
      if (score > 50) return 'smile'
      if (score > 40) return 'meh'
      if (score > 30) return 'frown'
      if (score > 20) return 'sad-tear'
      if (score > 10) return 'sad-cry'
      if (score > 0) return 'angry'
    },
    success() {
      return this.typed === this.answer
    },
  },
}
</script>

<style scoped>
.face-container {
  display: flex;
  justify-content: center;
}

.face {
  font-size: 30px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(-40px);
}

.slide-fade-leave-to {
  transform: translateX(40px);
}
</style>
