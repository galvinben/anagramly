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
  try {
    let params = max > 0 ? `&lettersMin=${min}&lettersMax=${max}` : `&lettersMin=${min}`
    let freshWords = []
    while (freshWords.length < wordCount) {
      let data = await axios
        .get(process.env.WORDS_API_URL+params, {
          headers: {
            'x-rapidapi-host': process.env.WORDS_API_HOST,
            'x-rapidapi-key': process.env.WORDS_API_KEY,
          },
        })
        .then(function (response) {
          console.log(response)
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      if (!data.word.includes(' ')) {
        freshWords.push(data)
      }
    }
    console.log(freshWords)
    return { statusCode: 200, body: { words: freshWords } }
  } catch (e) {
    this.error = e.response
    this.response = '—'
  }
}

11:14:01 AM: 2020-04-08T10:14:01.885Z	0f060193-facc-4f3c-a734-02b829e3d594	INFO	6
11:14:01 AM: 2020-04-08T10:14:01.886Z	0f060193-facc-4f3c-a734-02b829e3d594	INFO	8
11:14:01 AM: 2020-04-08T10:14:01.886Z	0f060193-facc-4f3c-a734-02b829e3d594	INFO	3
11:14:01 AM: 2020-04-08T10:14:01.886Z	0f060193-facc-4f3c-a734-02b829e3d594	INFO	https://wordsapiv1.p.rapidapi.com/words/?hasDetails=definitions&random=true
11:14:01 AM: 2020-04-08T10:14:01.886Z	0f060193-facc-4f3c-a734-02b829e3d594	INFO	wordsapiv1.p.rapidapi.com
11:14:01 AM: 2020-04-08T10:14:01.886Z	0f060193-facc-4f3c-a734-02b829e3d594	INFO	c1cb95b64amshe7c19b470b37e51p146d07jsn501f397ca9ff
11:14:01 AM: Duration: 5.19 ms	Memory Usage: 65 MB	Init Duration: 120.29 ms
11:14:23 AM: 2020-04-08T10:14:23.099Z	c29e2f3e-249c-46eb-be4f-251f7f0e34f0	INFO	6
11:14:23 AM: 2020-04-08T10:14:23.099Z	c29e2f3e-249c-46eb-be4f-251f7f0e34f0	INFO	8
11:14:23 AM: 2020-04-08T10:14:23.099Z	c29e2f3e-249c-46eb-be4f-251f7f0e34f0	INFO	3
11:14:23 AM: 2020-04-08T10:14:23.099Z	c29e2f3e-249c-46eb-be4f-251f7f0e34f0	INFO	https://wordsapiv1.p.rapidapi.com/words/?hasDetails=definitions&random=true
11:14:23 AM: 2020-04-08T10:14:23.099Z	c29e2f3e-249c-46eb-be4f-251f7f0e34f0	INFO	wordsapiv1.p.rapidapi.com
11:14:23 AM: 2020-04-08T10:14:23.099Z	c29e2f3e-249c-46eb-be4f-251f7f0e34f0	INFO	c1cb95b64amshe7c19b470b37e51p146d07jsn501f397ca9ff
11:14:23 AM: Duration: 3.31 ms	Memory Usage: 65 MB