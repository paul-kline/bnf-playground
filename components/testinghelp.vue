<template>
     <v-expansion-panels accordion>
      <v-expansion-panel >
        <v-expansion-panel-header>Testing Help</v-expansion-panel-header>
        <v-expansion-panel-content>
<p>
    <ul>
        <li> Once you compile your BNF, you can test strings for validity by typing them in the box above. Whatever non-terminal is selected in the "Test against non-terminal" dropdown is what will be used to judge the string.
        </li>
        <li>You can easily test different terms of your BNF by selecting a different non-terminal from the dropdown</li>
        <li><span class="green">Green</span> indicates a valid string; <span class="red">red</span> indicates invalid.</li>
        <li>You can also generate random strings for any term in your definition.</li>
    </ul>
                  

              </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class GrammarHelp extends Vue {
  
}
</script>

</script>
<style>
.code{
    font-family: 'Courier New', Courier, monospace;
    color:green;
}
.green{
    background-color:green;
}
.red{
    background-color:red;
}
</style>