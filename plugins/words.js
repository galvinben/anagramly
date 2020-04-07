import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getRandomWord(min, max) {
      let difficulty =
        max > 0 ? `&lettersMin=${min}&lettersMax=${max}` : '&lettersMin=${min}'
      return await axios
        .get(`${process.env.wordsApiUrl}&lettersMin=${difficulty}`, {
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
