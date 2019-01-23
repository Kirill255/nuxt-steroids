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
    state.loadedPosts = posts;
  }
};

export const actions = {
  // https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
  // первый context это nuxt context в котором state, commit и т.д., а второй context это context приложения в котором app, store, params и т.д., чтобы не путать можно использовать деструктуризацию nuxtServerInit ({ state, commit }, { req, app, store }) {}
  nuxtServerInit(nuxtContext, context) {
    // console.log(nuxtContext);
    // console.log(context);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = [
          {
            id: "1",
            title: "First Post",
            previewText: "This is our first post!",
            thumbnail: "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          },
          {
            id: "2",
            title: "Second Post",
            previewText: "This is our second post!",
            thumbnail: "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          }
        ];

        nuxtContext.commit("setPosts", posts);
        resolve();
      }, 1500);
    });
  },
  setPosts(context, posts) {
    context.commit("setPosts", posts);
  }
};
