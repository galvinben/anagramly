<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <Loading v-if="loading" />
      <div v-if="!loading" class="card" :style="cardWidth" title="Anagramly">
        <div class="question">
          <div v-for="(letter, i) in sortedWords" :key="i">
            <h2 :class="letterTypedClass(letter)">{{ letter.letter }}</h2>
          </div>
        </div>
        <div class="answers">
          <div v-for="word in answers" :key="word.id">
            <div class="answer">
              <Answer :word="word" />
              <Face v-if="!loading" :word="word" :win="win" />
            </div>
          </div>
        </div>
        <Actions
          @scramble="scramble"
          @clear="clear"
          @reset="reset"
          :loading="loading"
          :win="win"
        /></div
    ></transition>
  </div>
</template>

<script>
import Face from '@/components/Face'
import Loading from '@/components/Loading'
import Answer from '@/components/Answer'
import Actions from '@/components/Actions'

export default {
  props: ['difficulty', 'wordLength'],
  components: {
    Face,
    Loading,
    Answer,
    Actions,
  },
  data: () => ({
    scrambledLetters: [],
    words: [],
    answers: [],
    loading: false,
  }),
  computed: {
    lettersTyped() {
      return this.answers.map((answer) => answer.result).join('')
    },
    sortedWords() {
      let typed = this.lettersTyped
      return this.scrambledLetters.map((letter) => {
        let beenTyped = false
        for (let l = 0; l < typed.length; l++) {
          if (typed[l].toLowerCase() === letter.toLowerCase()) {
            typed = typed.slice(0, l) + typed.slice(l + 1)
            beenTyped = true
            l = typed.length
          }
        }
        return {
          letter: letter,
          typed: beenTyped,
        }
      })
    },
    cardWidth() {
      if (window.innerWidth > 700) {
        return `width: ${this.scrambledLetters.length * 1.9}rem`
      } else return 'width: 80vw'
    },
    win() {
      return this.answers.filter((answer) => !answer.win).length === 0
    },
  },
  methods: {
    scramble() {
      let time = 1
      let timeout
      let shuffle = () => {
        this.scrambledLetters = this.scrambledLetters.sort(() => {
          return 0.5 - Math.random()
        })
        clearTimeout(timeout)
        time = time + 2
        if (time < 50) timeout = window.setTimeout(shuffle, time)
      }
      timeout = window.setTimeout(shuffle, time)
    },
    calculateAnswers() {
      this.answers = this.words.map((word, index) => {
        return {
          id: index + 1,
          answer: word.word.toLowerCase().split(''),
          locks: word.word.split('').map((letter) => {
            return { letter: letter, locked: false }
          }),
          result: [],
          typing: false,
          win: false,
          definition: word.definition,
        }
      })
    },
    clear() {
      this.answers = this.answers.map((answer) => {
        if (answer.result.join('') !== answer.answer.join('')) {
          answer.result = []
        }
        return answer
      })
    },
    reset() {
      this.$emit('reset')
    },
    letterTypedClass(letter) {
      return letter.typed ? 'letter-crossed' : ''
    },
  },
  async beforeMount() {
    this.loading = true
    while (this.scrambledLetters.length < this.difficulty * 5) {
      let data = await this.getRandomWord(this.wordLength)
      if (!data.word.includes(' ')) {
        this.words.push({
          word: data.word,
          definition: data.results
            ? data.results[0].definition
            : 'No definition found...',
        })
        this.scrambledLetters.push(...data.word)
      }
    }
    this.loading = false
    this.scramble()
    this.calculateAnswers()
  },
  mounted() {
    let typeTimeout
    for (let i in this.answers) {
      document.getElementById(this.answers[i].id).onkeydown = () => {
        clearTimeout(typeTimeout)
        this.answers[i].typing = true
        typeTimeout = window.setTimeout(
          () => (this.answers[i].typing = false),
          300
        )
      }
    }
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.3);
  padding: 25px;
}
.question {
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 500;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.answers {
  margin: 5rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.answer {
  display: flex;
  flex-direction: column;
}

.statuses-face {
  height: 30px;
  display: flex;
  justify-content: center;
}

.spin {
  display: flex;
  justify-content: center;
}

.letter-crossed {
  color: rgba(0, 0, 0, 0.123);
}

.shuffle-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.shuffle-enter, .shuffle-leave-to
/* .shuffle-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.shuffle-leave-active {
  position: absolute;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(-1000px);
}

.slide-fade-leave-to {
  transform: translateX(1000px);
}

@media screen and (max-width: 700px) {
  .card {
    height: auto;
  }

  .answers {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 2rem;
  }

  .answer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .slide-fade-enter {
    transform: translateX(-600px);
  }

  .slide-fade-leave-to {
    transform: translateX(600px);
  }
}
</style>
