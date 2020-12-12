<template>
  <div>
    <h1 class="center">Welcome to the BNF Playground</h1>
    <h1 class="center">Beta!</h1>
    <div class="center mb-4">
      A place to design and test context free grammars using Backus-Naur Form or
      Extended Backus-Naur Form
    </div>

    <div class="" id="greeting"></div>
    <grammarhelp />
    <editor />
    <stringtester />
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import grammarhelp from "~/components/grammarhelp.vue";
import editor from "~/components/editor.vue";
import stringtester from "~/components/stringtester.vue";
@Component({ components: { grammarhelp, editor, stringtester } })
export default class GrammarHelp extends Vue {}
</script>
<style>
.center {
  text-align: center;
}
</style>
