<template>
  <div class="post_root">
    <div class="post_content" v-if="loading">
      <v-container>
        <!-- modal form update post -->
        <v-row justify="center">
          <v-dialog v-model="modal" width="600px" eager>
            <v-card>
              <v-card-title>
                <span class="headline">Updated your post</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-textarea
                    ref="title"
                    :rules="title_rules"
                    v-model="get_inner_title"
                    rows="3"
                    name="input-4-1"
                    label="Редактирование тайтла"
                  ></v-textarea>
                  <v-textarea
                    ref="body"
                    :rules="body_rules"
                    v-model="get_inner_body"
                    name="input-4-1"
                    label="Редактирование поста"
                  ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="canselUpdate" text>Cansel</v-btn>
                <v-btn
                  :disabled="!valid"
                  color="green darken-1"
                  text
                  @click="updateHandler($route.params.id)"
                >Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- modal form update post -->

        <v-row>
          <v-col md="9" sm="12" class="mx-auto">
            <v-card min-height="200px">
              <v-card-title>{{ getOnePost.title }}</v-card-title>
              <v-card-subtitle>
                {{ getOnePost.date | filterDataTime }}
                <span>
                  <strong>Author:</strong>
                  {{ getOnePost.userId.name | filterName }}
                  <strong>Email:</strong>
                  {{ getOnePost.userId.email }}
                </span>
              </v-card-subtitle>
              <v-card-text>
                <p class="text--primary">{{ getOnePost.body }}</p>
              </v-card-text>
              <v-card-actions>
                <div class="lider_actions" v-if="getOnePost.userId.email ===  getUser.email">
                  <v-btn @click="deleteHandler" class="post_button" small color="error">delete</v-btn>
                  <v-btn @click="modal = true" class="post_button" small color="primary">edit</v-btn>
                </div>
                <div class="other_actions">
                  <v-btn class="post_button" to="/posts" small color="success">Back</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="loader_m" v-else>
      <div class="wrap_loader">
        <v-progress-circular class="text-center" :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Post",
  data() {
    return {
      loading: false,
      modal: false,
      valid: false,
      title: "",
      body: "",
      title_rules: [v => !!v || "Заголовок - обязательное поле"],
      body_rules: [v => !!v || "Текст новости - обязательное поле"]
    };
  },
  methods: {
    ...mapActions([
      "fetchOnePost",
      "delete_one_post",
      "update_post",
      "auth_error_401"
    ]),
    deleteHandler() {
      this.delete_one_post(this.$route.params.id)
        .then(res => {
          this.$router.push("/posts");
        })
        .catch(err => {
          const flag = this.auth_error_401(err);
          if (flag) this.$router.push("/login");
        });
    },
    updateHandler(id) {
      const title = this.title || this.getOnePost.title;
      const body = this.body || this.getOnePost.body;
      if (this.$refs.form.validate()) {
        if (
          this.$refs.title.value === title &&
          this.$refs.body.value === body
        ) {
          this.modal = false;
          return false;
        }
        this.update_post({ id, title, body })
          .then(res => {
            this.$router.push("/posts");
          })
          .catch(err => {
            const flag = this.auth_error_401(err);
            if (flag) this.$router.push("/login");
          });
      }
    },
    canselUpdate() {
      this.modal = false;
      this.$router.push("/posts");
    }
  },
  computed: {
    ...mapGetters(["getOnePost", "getUser"]),
    get_inner_title: {
      get: function() {
        return this.getOnePost.title;
      },
      set: function(val) {
        this.title = val;
      }
    },
    get_inner_body: {
      get: function() {
        return this.getOnePost.body;
      },
      set: function(newValue) {
        this.body = newValue;
      }
    }
  },
  mounted() {
    this.fetchOnePost(this.$route.params.id)
      .then(res => {
        this.loading = true;
      })
      .catch(err => {
        const flag = this.auth_error_401(err);
        if (flag) this.$router.push("/login");
      });
  }
};
</script>

<style lang="scss" scoped>
.wrap_loader {
  width: 100%;
  display: flex;
  justify-content: center;
}
.post_button {
  margin-right: 10px;
}
</style>