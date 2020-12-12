<template>
  <div class="mt-3 rounded border pa-4">
    <div class="d-flex align-baseline mb-0 pb-0">
      <div>Test against non-terminal:</div>
      <v-select
        class="ml-1 mb-0 pb-0"
        :items="items"
        :value="selection"
        label="select non-terminal"
        dense
        solo
        @change="triggerSelection"
      ></v-select>
    </div>
    <v-textarea
      class="mb-0 pb-0"
      outlined
      name="input-7-4"
      label="Test a string here!"
      auto-grow
      dense
      row-height="2"
      v-model="str"
      :error="isError"
      :error-messages="bnf.testingError"
      @input="ontestStringChanged"
      :background-color="bgColor"
      :append-outer-icon="icon"
    ></v-textarea>
    <div class="d-flex ">
      <v-btn class="" @click="onGenerate"
        >Generate random <{{ bnf.selectedNonTerminal }}></v-btn
      >
    </div>
    <div class="mt-2"><testinghelp /></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BNFController, { compilationStatus } from "~/ts/BNFController.ts";
import testinghelp from "~/components/testinghelp.vue";
const _bnf = BNFController.getInstance();
@Component({ components: { testinghelp } })
export default class StringTester extends Vue {
  bnf = _bnf;
  str: string = "";
  selection: string = "";
  get items() {
    return this.bnf.nonTerminals.map(x => "<" + x + ">");
  }
  get icon(): string {
    if (this.isError) {
      return "mdi-alert-box-outline";
    } else {
      return "mdi-check-bold";
    }
  }
  mounted() {
    this.bnf.triggerSelection = this.triggerSelection;
  }
  onGenerate() {
    this.str = this.bnf.onGenerate(this.str);
  }
  triggerSelection(newval: any) {
    console.log("triggerSelection", newval, this.selection);
    if (!this.selection) this.selection = this.items[0];
    const str = newval ? newval : this.selection;
    this.selection = str;
    if (!str) return;
    this.bnf.selectedNonTerminal = str.slice(1, str.length - 1); //remove "<" and ">";
    // setTimeout(() => {
    //   this.$forceUpdate();
    // }, 10);
  }
  ontestStringChanged() {
    if (this.str.length == 0) {
      this.bnf.testingError = "";
    }
    console.log(this.str);
  }
  get isError(): boolean {
    return this.str.length > 0 && !this.bnf.validityTest(this.str);
  }
  get bgColor(): string {
    if (!this.str) {
      return "";
    }
    const b = this.isError;
    if (!b) {
      return "green lighten-1";
    } else {
      return "red darken-3";
    }
  }
}
</script>
<style>
.border {
  border-style: solid;
  border-color: grey;
  border-width: 1px;
}
</style>
