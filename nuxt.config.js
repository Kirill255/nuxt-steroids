// const pkg = require("./package");
// const bodyParser = require("body-parser"); // теперь снова часть express
const express = require("express");
const axios = require("axios");

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
  plugins: ["~/plugins/core-components", "~/plugins/date-filter"],

  /*
  ** Nuxt.js modules
  */
  modules: ["@nuxtjs/axios"],
  // You can pass options for axios module https://axios.nuxtjs.org/options
  axios: {
    baseURL: process.env.BASE_URL || "https://nuxt-blog-d5ca1.firebaseio.com/"
    // credentials: false // now disabled by default
  },

  /*
  ** Global variables
  */
  env: {
    // baseUrl: process.env.BASE_URL || "https://nuxt-blog-d5ca1.firebaseio.com/"
    fbAPIKey: "AIzaSyDSfEiNFh_pKFAlTXGFQr8GgPX8c6Ggg_g"
  },

  /*
  ** https://nuxtjs.org/api/configuration-transition
  */
  transition: {
    name: "fade",
    mode: "out-in"
  },

  /*
  ** https://nuxtjs.org/api/configuration-router
  */
  router: {
    // middleware запускается вообще для всех роутов
    // middleware: "log", // название нашей middleware log.js
  },

  /*
  ** https://nuxtjs.org/api/configuration-servermiddleware
  // код внутри будет выполняться сверху вниз, по очерёдно, сначала express.json(), затем код по пути "~/api", а именно "~/api/index.js", и т.д., грубо говоря это middlewares которые выполнятются на стороне сервера, в порядке их написания, по express-принципу, что мы имеем, мы получаем входящий запрос, он всегда неизменный, serverMiddleware получает входящий запрос, он парсится express.json() (body-parser), дальше передаётся в "~/api/index.js"
  */
  // serverMiddleware: [bodyParser.json(), "~/api"], // bodyParser теперь снова часть express
  serverMiddleware: [express.json(), "~/api"],

  /*
  ** https://nuxtjs.org/api/configuration-generate
  // нужно будет выбрать все id-шники из базы, в нашем случае id-шники вида "-LWvM2YOCxd1KNQXzFOz"
  */
  // generate: {
  //   routes: [
  //     "/posts/-LWvM2YOCxd1KNQXzFOz",
  //     "/posts/-LWvMDH-cl39SM6-VllN",
  //     "/posts/-LWzBFYW42_KfXWSf_fz"
  //   ]
  // },
  // но, что если у нас очень много постов, не будем же мы вручную выбирать и устанавливать все роуты, для этого можно сделать функцию
  // generate: {
  //   routes: function () {
  //     return axios.get("https://nuxt-blog-d5ca1.firebaseio.com/posts.json").then(res => {
  //       const routes = [];
  //       for (const key in res.data) {
  //         routes.push("/posts/" + key);
  //       }
  //       return routes;
  //     });
  //   }
  // },
  // также можно передать нужные данные в payload, тогда нужно немного изменить код в posts/id
  generate: {
    routes: function () {
      return axios.get("https://nuxt-blog-d5ca1.firebaseio.com/posts.json").then(res => {
        const routes = [];
        for (const key in res.data) {
          routes.push({ route: "/posts/" + key, payload: { postData: res.data[key] } });
        }
        return routes;
      });
    }
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
