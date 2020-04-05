import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getRandomWord() {
      return await axios
        .get(process.env.WORDS_API_URL, {
          headers: {
            'x-rapidapi-host': process.env.WORDS_API_HOST,
            'x-rapidapi-key': process.env.WORDS_API_KEY,
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
