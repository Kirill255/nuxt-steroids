<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput
          v-model="email"
          type="email"
        >
          E-Mail Address
        </AppControlInput>

        <AppControlInput
          v-model="password"
          type="password"
        >
          Password
        </AppControlInput>

        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
        >Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
// подключили глобально
// import AppControlInput from "@/components/UI/AppControlInput";
// import AppButton from "@/components/UI/AppButton";

// https://firebase.google.com/docs/reference/rest/auth/
// https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
// https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
// установить правило в fb database rules ".write": "auth != null"

export default {
  name: "AdminAuthPage",
  layout: "admin",
  // components: {
  //   AppControlInput,
  //   AppButton
  // },
  data() {
    return {
      isLogin: true,
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/admin");
        });
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
/*

{
  "kind": "identitytoolkit#SignupNewUserResponse",
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1OWE2NDFhMWI4MmNjM2I1MGE4MDFiZjUwNjQwZjM4MjU3ZDEyOTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnV4dC1ibG9nLWQ1Y2ExIiwiYXVkIjoibnV4dC1ibG9nLWQ1Y2ExIiwiYXV0aF90aW1lIjoxNTQ4MzYwMjIzLCJ1c2VyX2lkIjoiNHZFcXdJZFN0cE1MOUFLSEpNTXMwUzFJVldvMSIsInN1YiI6IjR2RXF3SWRTdHBNTDlBS0hKTU1zMFMxSVZXbzEiLCJpYXQiOjE1NDgzNjAyMjMsImV4cCI6MTU0ODM2MzgyMywiZW1haWwiOiJ0ZXN0QG1haWwucnUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBtYWlsLnJ1Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UtMLzT9ngGkYIoSAlrRuXgYHYZXHzPDqhROUMzhc_3RqoNkI1Cv6aK9EO3iNscWRx70tQS6TYTo1x9YGWpFRrnMs9CyTOu292BaHhVW3V2Z-SrdomgCX57llV-k0_AI37YP_7QdWVgUWCYm9fV4tJK9RNKRmvS9UQsMgzc6W52N53ep640b99bIfHXY1FfnY5_9Aszs8rJkA8QbY2l4ZGp31bgPtQtWV_DYOpmUJOt-nZz2-axDKSt77VLc93AIaiEETdxlpjvC5l4x25Gr2J_KiUUWev6eHPYI3vpwJnulXxrVoVz75m0xUGLE2tra0euUf7vKM74E9clpf9dUcFw",
  "email": "test@mail.ru",
  "refreshToken": "AGK09AMjAUtRBm6yqozLVtjOoPf2YNrFlbGzWh3l80ynyQ2YMqZeLYE5A5zVVXJQI7UhznjivR43w4VUgix_S4r42U5GCwtOaTrp45zPuS7T7Qur_CD-0vJPIzvAekD4j4XHmd4HR6ZbfroTHCGFaZfowJu2R2lLW2g7ERkJdTmN-NI8Mt9fFfkSQP5aJyFwkjcTmlqaDFo9gzaX8ZrS0pJviZWUUmNRPQ",
  "expiresIn": "3600",
  "localId": "4vEqwIdStpML9AKHJMMs0S1IVWo1"
}
 */
