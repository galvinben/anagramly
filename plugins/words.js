import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getRandomWords(min, max, wordCount) {
      let difficulty =
        max > 0 ? `&lettersMin=${min}&lettersMax=${max}` : '&lettersMin=${min}'
      let freshWords = []
      while (freshWords.length < wordCount) {
        let data = await axios
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
        console.log(data)
        if (!data.word.includes(' ') && !data.word.includes('.')) {
          freshWords.push(data)
        }
      }
      return freshWords
    },
  },
}

export default WordsApiMixin

Vue.mixin(WordsApiMixin)
