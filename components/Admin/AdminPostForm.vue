<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput
      v-model="editedPost.content"
      control-type="textarea"
    >
      Content
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.previewText"
      control-type="textarea"
    >
      Preview Text
    </AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>

<script>
// подключили глобально
// import AppControlInput from "@/components/UI/AppControlInput";
// import AppButton from "@/components/UI/AppButton";

export default {
  // components: {
  //   AppControlInput,
  //   AppButton
  // },
  props: {
    post: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  computed: {
    /* eslint-disable */
    editedPost() {
      return Object.keys(this.post).length
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            previewText: ""
          };
    }
    /* eslint-enable */
  },
  methods: {
    onSave() {
      // Save the post
      // console.log(this.editedPost);
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      // Navigate back
      this.$router.push("/admin");
    }
  }
};
</script>
