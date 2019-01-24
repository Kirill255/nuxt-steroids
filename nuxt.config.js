// const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: "WD Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "My cool Web development blog" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff", height: "4px", duration: 5000 },
  //  loading: false, // Disable the Progress Bar

  /*
  ** if mode: "spa", https://nuxtjs.org/api/configuration-loading-indicator
  */
  // loadingIndicator: {
  //   name: "circle",
  //   color: "#3B8070",
  //   background: "white"
  // },
  // loadingIndicator: false, // Disable

  /*
  ** Global CSS
  */
  css: ["~assets/css/main.css"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Global variables
  */
  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-d5ca1.firebaseio.com/"
  },

  /*
  ** https://nuxtjs.org/api/configuration-transition
  */
  transition: {
    name: "fade",
    mode: "out-in"
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
