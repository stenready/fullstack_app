<template>
  <v-container>
    <v-row justify="space-around">
      <v-col md="5" sm="10">
        <h1 md="4" class="display-5 font-weight-light">Register your account</h1>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            append-icon="favorite_border"
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field append-icon="mail" v-model="email" :rules="emailRules" label="E-mail"></v-text-field>

          <v-text-field
            append-icon="lock"
            v-model="password"
            :rules="passwordRules"
            label="password"
          ></v-text-field>

          <v-text-field
            append-icon="lock_open"
            v-model="confirm"
            :rules="passwordConfirm"
            label="confirm password"
          ></v-text-field>

          <v-btn
            :disabled="!valid || load"
            style="margin-top: 8px;"
            color="error"
            class="mr-4"
            @click="SendData"
            :loading="load"
          >Register</v-btn>
          <v-spacer></v-spacer>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      load: false,
      name: "",
      email: "",
      password: "",
      confirm: "",
      nameRules: [v => !!v || "Имя должно быть обязательно"],
      passwordRules: [
        v => !!v || "Пароль - обязательное поле",
        v => (v && v.length >= 6) || "Пароль должен быть больше 6 символов"
      ],
      passwordConfirm: [
        v => v === this.password || "пароли должны совпадать",
        v => !!v || "Пароль - обязательное поле",
        v => (v && v.length >= 6) || "Пароль должен быть больше 6 символов"
      ],
      emailRules: [
        v => !!v || "E-mail - обязательное поле",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    ...mapGetters(['checkAuth'])
  },
  mounted() {
    if(this.checkAuth) this.$router.push('/posts')
  },
  methods: {
    ...mapActions(["register"]),
    SendData() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.register({
          name: this.name,
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.load = false;
            this.$router.push("posts");
          })
          .catch(err => {
            this.load = false;
            this.$toast.open({
              message: err.response.data.message,
              type: "error",
              position: "top"
            });
          });
      }
    }
  }
};
</script>

<style lang="scss">
.toast-text {
  font-family: "Roboto";
}
</style>


