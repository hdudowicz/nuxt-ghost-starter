import { generateRoutes } from './util/ghost'
const pkg = require('./package')
require('dotenv').config()

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/filters.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-purgecss'
  ],
  purgeCSS: {
    // your settings here
  },
  env: {
    // loaded from .env file locally and from netlify in deployment
    ghostUri: process.env.GHOST_URI,
    ghostKey: process.env.GHOST_KEY
  },
  workbox: {
    dev: false
  },
  /*
  * Generate dynamic routes for static site generations
  */
  generate: {
    routes: generateRoutes
  },
  /*
  ** Extend routes so multiple routes can use same component
  */
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'PostIndex',
        path: '/page/:pageNumber',
        component: resolve(__dirname, 'pages/index.vue')
      })

      routes.push({
        name: 'TagIndex',
        path: '/tag/:slug/page/:pageNumber',
        component: resolve(__dirname, 'pages/tag/_slug.vue')
      })

      routes.push({
        name: 'AuthorIndex',
        path: '/author/:slug/page/:pageNumber',
        component: resolve(__dirname, 'pages/author/_slug.vue')
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
