if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {
  head: {
    title: 'Anagramly - A word game - solve anagrams for fun!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'anagram, anagram game, word game, word scramble, word search, wordsearch, bananagrams, anagram puzzle, word puzzle, free word games',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'An online game where you solve multiple anagrams at varying levels of difficulty',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Inconsolata&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Cormorant&display=swap',
      },
    ],
  },
  plugins: ['@/plugins/words', '@/plugins/vue-touch', '@/plugins/trump'],
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
  buildModules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: process.env.ANALYTICS_ID,
      },
    ],
  ],
  env: {
    trumpUrl: process.env.TRUMP_URL,
  },
}
