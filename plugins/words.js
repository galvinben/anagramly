import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getRandomWord(wordLength) {
      let difficulty
      if (wordLength > 3) difficulty = `&lettersMin=${wordLength * 2}`
      else if (wordLength < 3) difficulty = `&lettersMax=${wordLength * 3}`
      else difficulty = ''
      return await axios
        .get(`${process.env.wordsApiUrl}${difficulty}`, {
          headers: {
            'x-rapidapi-host': process.env.wordsApiHost,
            'x-rapidapi-key': process.env.wordsApiKey,
          },
        })
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}

export default WordsApiMixin

Vue.mixin(WordsApiMixin)
