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

import axios from "axios";

export const state = () => ({
  loadedPosts: []
});

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
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
  }
};

export const actions = {
  // https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
  // первый context это nuxt context в котором state, commit и т.д., а второй context это context приложения в котором app, store, params и т.д., чтобы не путать можно использовать деструктуризацию nuxtServerInit ({ state, commit }, { req, app, store }) {}
  nuxtServerInit(nuxtContext, context) {
    const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    return axios
      .get(baseUrl + "posts.json") // https://nuxt-blog-d5ca1.firebaseio.com/posts.json
      .then(res => {
        // у нас данные хранятся в сторе как массив, а из firebase нам приходит объект, поэтому нужно сконвертировать данные в массив, а также добавим к каждому посту id
        const postsArray = [];
        for (const key in res.data) {
          postsArray.push({ ...res.data[key], id: key });
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
  addPost(context, post) {
    const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    const createdPost = { ...post, updatedDate: new Date() };
    return axios
      .post(baseUrl + "posts.json", createdPost) // https://nuxt-blog-d5ca1.firebaseio.com/posts.json
      .then(res => {
        context.commit("addPost", { ...createdPost, id: res.data.name });
      })
      .catch(err => {
        console.log(err);
      });
  },
  editPost(context, post) {
    const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    return axios
      .put(baseUrl + "posts/" + post.id + ".json", {
        ...post,
        updatedDate: new Date()
      }) // https://nuxt-blog-d5ca1.firebaseio.com/posts/${id}.json
      .then(res => {
        context.commit("editPost", post);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
