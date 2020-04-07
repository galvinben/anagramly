import Vue from 'vue'
import axios from 'axios'

const Trump = {
  methods: {
    async getTrumpQuote() {
      let solveable = false
      let quote
      while (!solveable) {
        let response = await axios
          .get(process.env.trumpUrl, {
            headers: {
              Accept: '*/*',
            },
          })
          .then(function (response) {
            return response
          })
          .catch(function (error) {
            console.log(error)
          })
        let words = response.data.value.split(' ')
        quote = words.map((word, i) => {
          if ((i > 0 || i + 1 < words.length) && word.length > 3) {
            let predecessors = [
              'of',
              'for',
              'very',
              'both',
              'is',
              'your',
              'greatly',
              'his',
              'her',
              'my',
              'people',
              'the',
              'a',
              'almost',
              'has',
            ]
            if (predecessors.includes(words[i - 1])) {
              return { word, sentence: false }
            }
          }
          return { word, sentence: true }
        })
        solveable = quote.filter((word) => !word.sentence).length > 1
      }
      return quote
    },
  },
}

export default Trump

Vue.mixin(Trump)
