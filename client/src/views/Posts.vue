<template>
  <div class="posts_root">
    <div class="posts_content" v-if="loading">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="card_wrap_mein">
              <v-spacer class="hidden-sm-and-down"></v-spacer>
              <div class="d-flex select_custom">
                <v-select :items="select_elems" v-model="selected" label="Фильтрация постов"></v-select>
              </div>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="card_wrap_mein">
              <v-card
                min-height="200px"
                class="card_set"
                v-for="(elem, idx) of getAllPosts"
                :key="idx"
              >
                <div class="card_wrapper">
                  <v-card-title>{{ elem.title }}</v-card-title>
                  <v-card-subtitle>
                    {{ elem.date | filterDataTime }}
                    <span>
                      <strong>Author:</strong>
                      {{ elem.userId.name | filterName }}
                      <strong>Email:</strong>
                      {{ elem.userId.email }}
                    </span>
                  </v-card-subtitle>
                  <v-card-text>
                    <p class="text--primary">
                      {{ elem.body | exectText }}
                      <router-link
                        :to=" '/post/' + elem._id "
                        v-if="elem.body.length > 150"
                      >Read more...</router-link>
                    </p>
                  </v-card-text>
                </div>
                <v-card-actions>
                  <v-btn :to=" '/post/' + elem._id " small color="success" dark>show post</v-btn>
                </v-card-actions>
              </v-card>
            </div>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Posts",
  data() {
    return {
      loading: false,
      selected: "all",
      select_elems: [
        {
          text: "Все посты",
          value: "all"
        },
        {
          text: "Мои посты",
          value: "my"
        }
      ]
    };
  },
  watch: {
    selected(value) {
      if (value == "all") {
        this.fetch_all_posts()
          .then(() => (this.loading = true))
          .catch(err => {
            const flag = this.auth_error_401(err);
            if (flag) this.$router.push("/login");
          });
      } else {
        this.fetch_only_my_posts()
          .then(res => {
            this.loading = true;
          })
          .catch(err => {
            const flag = this.auth_error_401(err);
            if (flag) this.$router.push("/login");
          });
      }
    }
  },
  computed: {
    ...mapGetters(["getAllPosts", "fetch_triger"])
  },
  methods: {
    ...mapActions(["fetch_all_posts", "fetch_only_my_posts", "auth_error_401"])
  },
  mounted() {
    if (this.fetch_triger == "all") {
      this.fetch_all_posts()
        .then(() => {
          this.loading = true;
          this.selected = "all";
        })
        .catch(err => {
          const flag = this.auth_error_401(err);
          if (flag) this.$router.push("/login");
        });
    }
    if (this.fetch_triger == "my") {
      this.fetch_only_my_posts()
        .then(res => {
          this.loading = true;
          this.selected = "my";
        })
        .catch(err => {
          const flag = this.auth_error_401(err);
          if (flag) this.$router.push("/login");
        });
    }
  }
};
</script>

<style lang="scss">
.card_set {
  width: 49%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card_wrap_mein {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
// .v-card__actions {
//   position: absolute;
//   bottom: 0;
// }
.wrap_loader {
  width: 100%;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .select_custom {
    width: 80%;
    justify-content: center;
  }
  .card_set {
    width: 80%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card_wrap_mein {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
@media screen and (max-width: 576px) {
  .card_set {
    width: 97%;
  }
  .select_custom {
    width: 97%;
    justify-content: center;
  }
}
</style>