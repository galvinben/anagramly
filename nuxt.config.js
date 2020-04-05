if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {
  head: {
    title: 'Anagramly',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Inconsolata&display=swap',
      },
    ],
  },
  plugins: ['@/plugins/words'],
  modules: [
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far'],
          },
        ],
      },
    ],
    '@nuxtjs/axios',
  ],
  env: {
    wordsApiKey: process.env.WORDS_API_KEY,
    wordsApiHost: process.env.WORDS_API_HOST,
    wordsApiUrl: process.env.WORDS_API_URL,
  },
}
