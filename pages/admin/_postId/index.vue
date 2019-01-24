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
// import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  middleware: "auth",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    // const baseUrl = "https://nuxt-blog-d5ca1.firebaseio.com/";
    // https://axios.nuxtjs.org/helpers#fetch-style-requests
    return context.app.$axios
      .$get("posts/" + context.params.postId + ".json")
      .then(data => {
        return {
          loadedPost: { ...data, id: context.params.postId }
        };
      })
      .catch(e => context.error());
  },
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch("editPost", postData).then(() => {
        this.$router.push("/admin");
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
