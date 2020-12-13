<template>
  <v-app dark>
    <v-app-bar fixed app>
      <!-- <v-toolbar-title> BNF Playground</v-toolbar-title> -->
      <!-- <Icon /> -->
      <v-img
        class="mr-2"
        lazy-src="/apple-touch-icon.png"
        max-width="60"
        src="/apple-touch-icon.png"
      ></v-img>
      <v-toolbar-title style="min-width:5.5em;">Playground</v-toolbar-title
      ><v-divider class="mx-4" vertical></v-divider>
      <v-tabs>
        <v-tab to="/">Editor</v-tab>

        <v-tab to="/about"> About</v-tab>
        <v-spacer />
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-tab v-bind="attrs" v-on="on">Examples</v-tab>
          </template>

          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              nuxt
              :href="home + item.link"
            >
              {{ item.title }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt keep-alive />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>PaulKlineLabs &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import examples from "~/ts/examples.ts";
import { Vue, Component, Prop } from "vue-property-decorator";
import Icon from "~/components/icon.vue";
@Component({ components: { Icon } })
export default class DefaultClass extends Vue {
  items = examples;
  get home() {
    return window.location.origin;
  }
}
</script>
