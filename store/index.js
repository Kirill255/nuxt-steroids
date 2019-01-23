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
    state.posts = posts;
  }
};

export const actions = {
  setPosts(context, posts) {
    context.commit("setPosts", posts);
  }
};
