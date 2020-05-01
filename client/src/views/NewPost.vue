<template>
  <div class="home">
    <v-container>
      <v-row class=" mx-auto">
        <v-col md="7" sm="12" class="mx-auto">
          <h1 class="display-1 mb-2">Создайте Ваш пост:</h1>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" :rules="titleRules" label="Заголовок поста"></v-text-field>
            <v-textarea v-model="text" name="input-7-1" label="Текст поста" :rules="textRules"></v-textarea>
            <v-btn
              :disabled="!valid || load"
              style="margin-top: 8px;"
              color="error"
              class="mr-4"
              @click="donePost"
              :loading="load"
            >Create</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Create",
  data() {
    return {
      valid: false,
      load: false,
      title: "",
      text: "",
      titleRules: [v => !!v || "Заголовок - обязательное поле"],
      textRules: [v => !!v || "Текст новости - обязательное поле"]
    };
  },
  components: {},
  methods: {
    ...mapActions(['store_post', "auth_error_401"]),
    donePost(){
      if( this.$refs.form.validate() ) {
        this.load = true
        this.store_post({
          title: this.title,
          body: this.text
        })
        .then( res=> {
          this.$router.push('posts')
        } )
        .catch( err => {
          this.auth_error_401(err)
          this.$router.push('/login')
        } )
      }
    }
  }
};
</script>