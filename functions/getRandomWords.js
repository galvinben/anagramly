import axios from 'axios'

exports.handler = async (event, context) => {
  let min = event.queryStringParameters.min
  let max = event.queryStringParameters.max
  let wordCount = event.queryStringParameters.wordCount
  console.log(min)
  console.log(max)
  console.log(wordCount)
  console.log(process.env.WORDS_API_URL)
  console.log(process.env.WORDS_API_HOST)
  console.log(process.env.WORDS_API_KEY)
  let params =
    max > 0 ? `&lettersMin=${min}&lettersMax=${max}` : `&lettersMin=${min}`

  let freshWords = []
  for (let i = 0; i + 1 < wordCount; i++) {
    console.log(process.env.WORDS_API_URL + params)
    await axios
      .get(process.env.WORDS_API_URL + params, {
        headers: {
          'x-rapidapi-host': process.env.WORDS_API_HOST,
          'x-rapidapi-key': process.env.WORDS_API_KEY,
        },
      })
      .then(function (response) {
        console.log(response)
        freshWords.push(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return { statusCode: 200, body: { words: freshWords } }
}
