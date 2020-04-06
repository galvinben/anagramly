import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getRandomWord(wordLength) {
      return { word: 'asdas', results: [{ definition: 'asd' }] }
      let diffulty
      if (wordLength > 3) diffulty = `&lettersMin=${wordLength * 2}`
      else if (wordLength < 3) diffulty = `&lettersMax=${wordLength * 3}`
      else diffulty = ''
      return await axios
        .get(`${process.env.wordsApiUrl}${diffulty}`, {
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
