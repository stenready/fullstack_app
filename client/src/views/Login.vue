<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!valid || load"
                  :loading="load"
                  @click="SendData"
                  color="primary"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      email: "",
      valid: false,
      password: "",
      load: false,
      emailRules: [
        v => !!v || "E-mail - обязательное поле",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Пароль - обязательное поле",
        v => (v && v.length >= 6) || "Пароль должен быть больше 6 символов"
      ]
    };
  },
  computed: {
    ...mapGetters(['checkAuth'])
  },
  mounted() {
    if( this.checkAuth ) this.$router.push('/posts')
  },
  methods: {
    ...mapActions(["login"]),
    SendData() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.login({
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.$router.push("posts");
            console.log('secsee login' + ' ' + res);
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


