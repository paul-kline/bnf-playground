<template>
  <div class="container">
    <div>
      The BNF Playground is built on the
      <a href="https://nearley.js.org">Nearley Parser</a>. The grammar for BNF
      was written and compiled in nearley.js (greatly with the aid of the
      <a href="https://omrelli.ug/nearley-playground/">nearley playground</a>).
      Your entered specification is then parsed using this definition, followed
      by basic semantic analysis (are all non-terminals defined exactly once?)
      If all is well, the grammar is then transpiled into a nearley.js
      specification which is in turn compiled into a nearley grammar which is
      used for string testing. String generation is provided by cemulate from
      his git project
      <a href="https://github.com/cemulate/nearley-generator">here</a>.
    </div>
    <div class="mt-2">
      Problems, suggestions, or thanks can be emailed to pauliankline [(at)]
      gma1l ([dot]) c0m.
    </div>

    <v-card class="mt-2 card" id="donate">
      <v-card-title>
        I really like this site and have too much money. Take some!
      </v-card-title>
      <v-card-actions>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="9ELBULB54TW6E" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            border="0"
            name="submit"
            alt="PayPal - The safer, easier way to pay online!"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class About extends Vue {
  @Prop() name!: string;
  @Prop() initialEnthusiasm!: number;

  enthusiasm = this.initialEnthusiasm;

  increment() {
    this.enthusiasm++;
  }
  decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm--;
    }
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join("!");
  }
}
</script>
