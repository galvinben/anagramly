import Vue from 'vue'
import axios from 'axios'

const WordsApiMixin = {
  methods: {
    async getWords(min, max, wordCount) {
      try {
        const res = await axios.get(
          `/.netlify/functions/getRandomWords?min=${min}&max=${max}&wordCount=${wordCount}`
        )
        console.log(res)
        return res.data.words
      } catch (e) {
        return [
          {
            word: 'sorry...',
            results: [
              {
                definition:
                  'Example: "I am just so sorry that the words API is not connecting"',
              },
            ],
          },
          { word: 'I', results: [{ definition: 'meaning me... Ben' }] },
          {
            word: 'cannot',
            results: [
              {
                definition: 'I CANNOT be bothered to write another definition',
              },
            ],
          },
          { word: 'connect', results: [{ definition: 'I am sorry ok.' }] },
        ]
      }
    },
  },
}

export default WordsApiMixin

Vue.mixin(WordsApiMixin)
