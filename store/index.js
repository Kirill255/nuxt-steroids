// WARN!!!  This feature is deprecated and will be removed in Nuxt 3.
// https://nuxtjs.org/guide/vuex-store#classic-mode

// import Vuex from "vuex";

// const createStore = () => {
//   return new Vuex.Store({
//     state: () => ({
//       loadedPosts: []
//     }),
//     getters: {
//       loadedPosts(state) {
//         return state.loadedPosts;
//       }
//     },
//     mutations: {
//       setPosts(state, posts) {
//         state.posts = posts;
//       }
//     },
//     actions: {
//       setPosts(context, posts) {
//         context.commit("setPosts", posts);
//       }
//     }
//   });
// };

// export default createStore;

// https://nuxtjs.org/guide/vuex-store#modules-mode

// import axios from "axios";
import Cookie from "js-cookie";

export const state = () => ({
  loadedPosts: [],
  token: null
});

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  },
  isAuthenticated(state) {
    return state.token != null;
  }
};

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post);
  },
  editPost(state, post) {
    const postIndex = state.loadedPosts.findIndex(p => p.id === post.id);
    state.loadedPosts[postIndex] = post;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  // https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
  // первый context это nuxt context в котором state, commit и т.д., а второй context это context приложения в котором app, store, params и т.д., чтобы не путать можно использовать деструктуризацию nuxtServerInit ({ state, commit }, { req, app, store }) {}
  nuxtServerInit(nuxtContext, context) {
    // const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    return context.app.$axios
      .$get("posts.json") // https://nuxt-blog-d5ca1.firebaseio.com/posts.json
      .then(data => {
        // у нас данные хранятся в сторе как массив, а из firebase нам приходит объект, поэтому нужно сконвертировать данные в массив, а также добавим к каждому посту id
        // upd1: axios module сразу возвращает data (диструктурирует response) https://axios.nuxtjs.org/helpers#fetch-style-requests, поэтому мы обращаемся сразу к data, а не к res.data
        const postsArray = [];
        for (const key in data) {
          postsArray.push({ ...data[key], id: key });
        }
        nuxtContext.commit("setPosts", postsArray);
      })
      .catch(err => {
        // console.log(err);
        context.error(err);
      });
  },
  setPosts(context, posts) {
    context.commit("setPosts", posts);
  },
  // https://firebase.google.com/docs/database/rest/auth#authenticate_with_an_id_token
  // "https://какой-то_запрос?auth=<ID_TOKEN>"
  addPost(context, post) {
    // const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    const createdPost = { ...post, updatedDate: new Date() };
    return this.$axios
      .$post("posts.json?auth=" + context.state.token, createdPost) // https://nuxt-blog-d5ca1.firebaseio.com/posts.json
      .then(data => {
        context.commit("addPost", { ...createdPost, id: data.name });
      })
      .catch(err => {
        console.log(err);
      });
  },
  editPost(context, post) {
    // const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    return this.$axios
      .$put("posts/" + post.id + ".json?auth=" + context.state.token, {
        ...post,
        updatedDate: new Date()
      }) // https://nuxt-blog-d5ca1.firebaseio.com/posts/${id}.json
      .then(data => {
        context.commit("editPost", post);
      })
      .catch(err => {
        console.log(err);
      });
  },
  authenticateUser(context, authData) {
    // войти verifyPassword https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
    let apiUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      process.env.fbAPIKey;

    if (!authData.isLogin) {
      // создать signupNewUser https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
      apiUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        process.env.fbAPIKey;
    }

    return this.$axios
      .$post(apiUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(data => {
        // console.log(data);
        context.commit("setToken", data.idToken);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
        );

        Cookie.set("jwt", data.idToken);
        Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(data.expiresIn) * 1000);

        return this.$axios.$post("http://localhost:3000/api/track-data", {
          data: "Authenticated!"
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  initAuth(context, req) {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }

      const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }

      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    } else if (process.client) {
      // добавили проверку  if (process.client) {}, так как при генерации статики у нас нет localStorage на сервере, вернее у нас даже сервера нету
      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiration");
    } else {
      // token = null;
      // expirationDate = null;
      // или можно не назначать null, просто останется undefined, т.к. изначальные значения у нас undefined let token; let expirationDate;, если при объявлении задали бы значения null let token = null;, то тогда сдесь тоже можно/нужно было бы устаноить token = null;
    }

    if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or invalid token");

      context.dispatch("logout");
      return;
    }

    context.commit("setToken", token);
  },
  logout(context) {
    context.commit("clearToken");

    Cookie.remove("jwt");
    Cookie.remove("expirationDate");

    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  }
};
