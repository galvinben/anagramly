import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getWords(min, max, wordCount) {
      try {
        const res = await axios.$get(
          `/.netlify/functions/getRandomWords?min=${min}&max=${max}&wordCount=${wordCount}`
        )
        return res.words
      } catch (e) {
        return ['sorry...', 'I', 'cannot', 'connect'])
      }
    },
  },
}

export default WordsApiMixin

Vue.mixin(WordsApiMixin)
