<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm
        :post="loadedPost"
        @submit="onSubmitted"
      />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    return axios
      .get(baseUrl + "posts/" + context.params.postId + ".json")
      .then(res => {
        return {
          loadedPost: res.data
        };
      })
      .catch(e => context.error());
  },
  methods: {
    onSubmitted(postData) {
      const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
      axios
        .put(baseUrl + "posts/" + this.$route.params.postId + ".json", {
          ...postData,
          updatedDate: new Date()
        }) // https://nuxt-blog-d5ca1.firebaseio.com/posts.json
        .then(res => {
          // console.log(res);
          this.$router.push("/admin");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
