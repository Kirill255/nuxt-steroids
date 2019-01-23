<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  // asyncData(context) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "First Post",
  //             previewText: "This is our first post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           },
  //           {
  //             id: "2",
  //             title: "Second Post",
  //             previewText: "This is our second post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           }
  //         ]
  //       });
  //     }, 1500);
  //   })
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(err => {
  //       context.error(err);
  //     });
  // },
  // created() {
  //   this.$store.dispatch("setPosts", this.loadedPosts);
  // }

  // https://nuxtjs.org/guide/vuex-store#the-fetch-method
  // если нам будут нужны loadedPosts на других страницах, нам придёться повторить всю эту логику тоесть продублировать весь метод fetch() на каждой странице где необходимо, поэтому для таких случаев есть более удобный способ nuxtServerInit() который вызывается в самом хранилище
  // https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
  // fetch(context) {
  //   // если хранилище уже заполнено, тогда не нужно его заполнять ещё раз
  //   if (context.store.state.loadedPosts.length) {
  //     return null;
  //   }

  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "First Post",
  //             previewText: "This is our first post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           },
  //           {
  //             id: "2",
  //             title: "Second Post",
  //             previewText: "This is our second post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           }
  //         ]
  //       });
  //     }, 1500);
  //   })
  //     .then(data => {
  //       context.store.commit("setPosts", data.loadedPosts);
  //     })
  //     .catch(err => {
  //       context.error(err);
  //     });
  // },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
