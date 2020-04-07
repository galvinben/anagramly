<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <Loading class="loading" v-if="loading" />
      <div
        v-touch:swipe.right="swipeRight"
        v-touch:swipe.left="swipeLeft"
        v-if="!loading"
        class="card"
        :style="cardWidth"
        title="Anagramly"
      >
        <img class="trump" src="@/static/trump.png" v-if="type==='trump'" />
        <div class="question">
          <div v-for="(letter, i) in sortedWords" :key="i">
            <h2 :class="letterTypedClass(letter)">{{ letter.letter }}</h2>
          </div>
        </div>
        <div class="answers">
          <div v-for="word in wordsMap" :key="word.id">
            <div v-if="word.sentence" class="sentence">{{ word.word }}</div>
            <div v-else class="answer">
              <Answer
                :word="word"
                @focusPreviousNotDisabled="focusPreviousNotDisabled"
                @focusNextNotDisabled="focusNextNotDisabled"
              />
              <Face v-if="!loading" :word="word" :win="win" />
            </div>
          </div>
        </div>
        <Actions @scramble="scramble" @clear="clear" @reset="reset" :loading="loading" :win="win" />
      </div>
    </transition>
  </div>
</template>

<script>
import Face from '@/components/Face'
import Loading from '@/components/Loading'
import Answer from '@/components/Answer'
import Actions from '@/components/Actions'

export default {
  props: ['wordCount', 'wordLength'],
  components: {
    Face,
    Loading,
    Answer,
    Actions,
  },
  data: () => ({
    scrambledLetters: [],
    words: [],
    wordsMap: [],
    loading: false,
    setUp: false,
    swiped: false
  }),
  computed: {
    type() {
      return this.wordCount === 7 && this.wordLength === 7 ? 'trump' : '';
    },
    lettersTyped() {
      return this.wordsMap.map((answer) => answer.result).join('')
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
        if(this.type == 'trump') {
          return `width: ${this.wordsMap.length * 3}rem`
        }
        return `width: ${this.scrambledLetters.length * 1.9}rem`
      } else return 'width: 80vw'
    },
    win() {
      return this.wordsMap.filter((answer) => !answer.win).length === 0
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
      this.wordsMap = this.words.map((word, index) => {
        if(word.sentence) {
          return {
            id: index+1,
            sentence: true,
            word: word.word,
          }
        }
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
      this.wordsMap = this.wordsMap.map((answer) => {
        if (answer.result.join('').toLowerCase() !== answer.answer.join('')) {
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
    swipeRight() {
      if (
        document.activeElement.parentElement &&
        document.activeElement.parentElement.nextElementSibling
      ) {
        this.focusNextNotDisabled(
          document.activeElement.parentElement.nextElementSibling
            .firstElementChild
        )
      } else if (
        document.activeElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.nextElementSibling
      ) {
        document.activeElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus()
      }
    },
    swipeLeft() {
      if (
        document.activeElement.parentElement &&
        document.activeElement.parentElement.previousElementSibling
      ) {
        this.focusPreviousNotDisabled(
          document.activeElement.parentElement.previousElementSibling
            .firstElementChild
        )
      } else if (
        document.activeElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.previousElementSibling
      ) {
        document.activeElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.focus()
      }
    },
    focusPreviousNotDisabled(element) {
      if (
        element.parentElement &&
        element.parentElement.previousElementSibling
      ) {
        if (element.disabled === true) {
          this.focusPreviousNotDisabled(
            element.parentElement.previousElementSibling.firstElementChild
          )
        }
      }
      element.focus()
    },
    focusNextNotDisabled(element) {
      if (element.parentElement && element.parentElement.nextElementSibling) {
        if (element.disabled === true) {
          this.focusNextNotDisabled(
            element.parentElement.nextElementSibling.firstElementChild
          )
        }
      }
      element.focus()
    },
  },
  updated() {
    if (
      !this.loading &&
      !this.setUp &&
      document.getElementsByTagName('input').length
    ) {
      this.setUp = true
      document.getElementsByTagName('input')[0].focus()
    }
  },
  async beforeMount() {
    this.loading = true
    console.log(this.type)
    let freshWords
    if(this.type === 'trump'){
       freshWords = await this.getTrumpQuote()
    } else {
      let min = this.wordLength == 7 ? 1 : this.wordLength * 2
      let max = this.wordLength != 6 ? this.wordLength == 7 ? 2 : this.wordLength * 2 + 2 : 0
       freshWords = await this.getRandomWords(min, max, this.wordCount === 7 ? 1 : this.wordCount)
    }
    freshWords.forEach((word) => {
      if(word.sentence) {
        this.words.push({
          word: word.word,
          sentence: true
        })
      } else {
        this.words.push({
          word: word.word,
          definition: word.results
            ? word.results[0].definition
            : 'No definition found...',
        })
        this.scrambledLetters.push(...word.word)
      }
    })
    this.loading = false
    this.scramble()
    this.calculateAnswers()
  },
  mounted() {
    console.log('👋 Hello! Enjoying Anagramly? Tell me at: www.bengalvin.co.uk')
    this.$ga.event({
      eventCategory: 'game',
      eventAction: 'new',
    })
    let typeTimeout
    for (let i in this.wordsMap) {
      document.getElementById(this.wordsMap[i].id).onkeydown = () => {
        clearTimeout(typeTimeout)
        this.wordsMap[i].typing = true
        typeTimeout = window.setTimeout(
          () => (this.wordsMap[i].typing = false),
          300
        )
      }
    }
  },
}
</script>

<style scoped>
.loading {
  margin-left: -18px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.3);
  padding: 25px;
  min-width: 400px;
  max-width: 80vw;
  z-index: 3;
}
.question {
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 500;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.answers {
  margin: 3rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.sentence {
  font-size: 2rem;
  margin-top: 2.25rem;
  padding: 0.4rem;
}

.answer {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0.5rem;
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
.trump {
  position: absolute;
  z-index: 0;
  margin-top: -55px;
}

@media screen and (max-width: 700px) {
  .card {
    height: auto;
    min-width: 80vw;
  }

  .sentence {
    margin-top: -0.5rem;
  }

  .answers {
    margin-top: 1rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 2rem;
  }

  .slide-fade-enter {
    transform: translateX(-600px);
  }

  .slide-fade-leave-to {
    transform: translateX(600px);
  }
}
</style>
