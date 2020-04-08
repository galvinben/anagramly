exports.handler = async (event, context) => {
  let min = event.queryStringParameters.min
  let max = event.queryStringParameters.max

  let wordCount = event.queryStringParameters.wordCount

  try {
    let params =
      max > 0 ? `&lettersMin=${min}&lettersMax=${max}` : `&lettersMin=${min}`
    let freshWords = []
    while (freshWords.length < wordCount) {
      let data = await axios
        .get(`${process.env.WORDS_API_URL}{params}`, {
          headers: {
            'x-rapidapi-host': process.env.WORDS_API_HOST,
            'x-rapidapi-key': process.env.WORDS_API_KEY,
          },
        })
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      if (!data.word.includes(' ')) {
        freshWords.push(data)
      }
    }
    return { statusCode: 200, body: freshWords }
  } catch (e) {
    this.error = e.response
    this.response = '—'
  }
}
