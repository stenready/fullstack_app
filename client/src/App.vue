<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="showMobileMenu">
      <!-- mobile menu -->
      <v-card class="mx-auto" max-width="300" tile>
        <v-list dense>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in checkAuth ? authMenu : unAuthMenu"
              :key="i"
              :to="item.path"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="showMobileMenu = true"></v-app-bar-nav-icon>
      <!-- gamburger -->

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">Sten Ready App</router-link>
        <!-- logo -->
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <!-- ссылки меню -->
        <v-btn
          v-for="(elem, i) of checkAuth ? authMenu : unAuthMenu"
          :key="i"
          text
          small
          :to="elem.path"
          :class="elem.className"
        >
          <v-icon left size="1.3rem">{{ elem.icon }}</v-icon>
          {{ elem.text }}
        </v-btn>

        <v-menu :offset-y="offsetY" v-if="checkAuth">
          <!-- dropdown menu -->
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on" style="text-transform: lowercase;">
              {{ getUser.email }}
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item style="cursor: pointer;" class="list_item_menu">
              <v-list-item-title>
                <v-icon class="icon_set">settings</v-icon> Setting
              </v-list-item-title>
            </v-list-item>

            <v-list-item style="cursor: pointer;" class="list_item_menu" to="/logaut">
              <v-list-item-title>
                <v-icon class="icon_set">exit_to_app</v-icon>Logaut
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      showMobileMenu: false,
      offsetY: true
    };
  },
  computed: {
    ...mapGetters(["checkAuth", "authMenu", "unAuthMenu", "getUser"])
  },
  methods: {}
};
</script>


<style lang="scss" scope>
.list_item_menu {
  &:hover {
    background-color: aliceblue;
  }
}
.icon_set{
  margin-right: 5px;
  transform: translateY(-1px);
}
</style>
