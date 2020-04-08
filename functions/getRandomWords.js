axios = require('axios')

exports.handler = async (event, context) => {
  let min = event.queryStringParameters.min
  let max = event.queryStringParameters.max
  let wordCount = event.queryStringParameters.wordCount
  let params =
    max > 0 ? `&lettersMin=${min}&lettersMax=${max}` : `&lettersMin=${min}`

  let freshWords = []
  for (let i = 0; i + 1 < wordCount; i++) {
    await axios
      .get(process.env.WORDS_API_URL + params, {
        headers: {
          'x-rapidapi-host': process.env.WORDS_API_HOST,
          'x-rapidapi-key': process.env.WORDS_API_KEY,
        },
      })
      .then(function (response) {
        freshWords.push(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return { statusCode: 200, body: JSON.stringify({ words: freshWords }) }
}
