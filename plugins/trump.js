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
          if ((i > 0 || i + 1 < words.length) && word.length > 1) {
            let predecessors = [
              'of',
              'for',
              'very',
              'both',
              'is',
              'your',
              'greatly',
              'his',
              'my',
              'people',
              'the',
              'a',
              'almost',
            ]
            if (predecessors.includes(words[i - 1])) {
              solveable = true
              return { word, sentence: false }
            }
          }
          return { word, sentence: true }
        })
      }
      return quote
    },
  },
}

export default Trump

Vue.mixin(Trump)
