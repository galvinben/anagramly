import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getRandomWord() {
      return await axios
        .get(process.env.wordsApiUrl, {
          headers: {
            'x-rapidapi-host': process.env.wordsApiHost,
            'x-rapidapi-key': process.env.wordsApiKey,
          },
        })
        .then(function (response) {
          return response.data.word
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}

export default WordsApiMixin

Vue.mixin(WordsApiMixin)
