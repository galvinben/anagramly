<template>
  <div class="face-container">
    <transition name="slide-fade" mode="out-in">
      <fa
        class="face"
        :class="faceClass"
        :key="emotion"
        :icon="['far', emotion]"
      />
    </transition>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading,
  },
  props: ['word', 'win'],
  computed: {
    correctLetters() {
      let answer = [...this.word.answer]
      return this.word.result.filter(function (letter) {
        if (answer.includes(letter.toLowerCase())) {
          answer.splice(answer.indexOf(letter.toLowerCase()), 1)
          return true
        }
      }).length
    },
    correctLettersPerc() {
      return (
        (this.correctLetters / this.word.answer.length) * 30 +
        (this.correctLetters /
          this.word.result.filter((letter) => letter != ' ' && letter != '')
            .length || 0) *
          25
      )
    },
    correctOrder() {
      return this.word.result.filter(
        (letter, i) => this.word.answer[i] === letter.toLowerCase()
      ).length
    },
    correctOrderPerc() {
      return (this.correctOrder / this.word.answer.length) * 45
    },
    score() {
      return this.correctLettersPerc + this.correctOrderPerc
    },
    emotion() {
      let typed = this.word.result.length
      let answer = this.word.answer.length
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
      this.$ga.event({
        eventCategory: 'game',
        eventAction: 'wordComplete',
      })
      return (
        this.word.result.join('').toLowerCase() === this.word.answer.join('')
      )
    },
    faceClass() {
      if (this.win) {
        this.$ga.event({
          eventCategory: 'game',
          eventAction: 'win',
        })
        return 'super-celebrate'
      }
      return this.word.win ? 'celebrate' : ''
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
  color: rgba(70, 63, 36, 0.781);
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

@media screen and (max-width: 700px) {
  .face-container {
    margin-top: -2em;
  }
  .slide-fade-enter {
    transform: translateY(-40px);
  }

  .slide-fade-leave-to {
    transform: translateY(40px);
  }
}

.celebrate {
  animation: celebrate 1s forwards;
}

@keyframes celebrate {
  50% {
    transform: scale(1.5, 1.5);
    color: rgba(124, 41, 115, 0.781);
  }
}

.super-celebrate {
  animation: super-celebrate 5s infinite forwards;
}

@keyframes super-celebrate {
  5% {
    transform: scale(1.5, 1.5);
    color: rgba(124, 41, 115, 0.781);
  }
  10% {
    transform: scale(1, 1);
    transform: rotate(0);
    color: rgba(124, 41, 115, 0.781);
  }
  30% {
    transform: rotate(360deg);
    color: rgba(124, 41, 115, 0.781);
  }
  100% {
    transform: rotate(360deg);
    color: rgba(70, 63, 36, 0.781);
  }
}
</style>
