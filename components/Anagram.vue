<template>
  <div class="page">
    <Loading v-if="loading" />
    <div v-if="!loading" class="card" :style="cardWidth" title="Anagramly">
      <div class="question">
        <div v-for="(letter, i) in sortedWords" :key="i">
          <div :class="letterTypedClass(letter)">{{ letter.letter }}</div>
        </div>
      </div>
      <div class="answers">
        <div v-for="word in answers" :key="word.id">
          <div class="answer">
            <Answer :word="word" />
            <Face
              v-if="!loading"
              :typed="word.result.toLowerCase().split('')"
              :answer="word.answer.toLowerCase().split('')"
              :typing="word.typing"
            />
          </div>
        </div>
      </div>
      <Actions @scramble="scramble" @clear="clear" :loading="loading" />
    </div>
  </div>
</template>

<script>
import Face from '@/components/Face'
import Loading from '@/components/Loading'
import Answer from '@/components/Answer'
import Actions from '@/components/Actions'

export default {
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
    loading: true,
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
      return `width: ${this.scrambledLetters.length * 30}px`
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
          answer: word,
          result: '',
          typing: false,
          width: word.length * 20 + 32,
        }
      })
    },
    clear() {
      this.answers = this.answers.map((answer) => {
        answer.result = ''
        return answer
      })
    },
    letterTypedClass(letter) {
      return letter.typed ? 'letter-crossed' : ''
    },
  },
  async beforeMount() {
    console.log(process.env.wordsApiUrl)
    while (this.scrambledLetters.length < 22) {
      let word = await this.getRandomWord()
      if (!word.includes(' ')) {
        this.words.push(word)
        this.scrambledLetters.push(...word)
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
.page {
  width: 100vw;
  height: 100vh;
  background-color: rgb(212, 178, 85);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.3);
  padding: 25px;
  width: 700px;
  height: 300px;
}
.question {
  font-size: 3em;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 500;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.answers {
  display: flex;
  flex-direction: row;
  height: 100px;
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
  color: rgb(172, 172, 172);
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

@media screen and (max-width: 800px) {
  .card {
    width: 80vw !important;
    height: 90vh;
  }
  .question {
    flex-wrap: wrap;
    flex-basis: 3em;
    flex-shrink: 1;
  }
  .answers {
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
