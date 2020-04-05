export default {
  head: {
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
    '@nuxtjs/dotenv',
  ],
}
