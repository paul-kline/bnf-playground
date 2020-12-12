<template>
     <v-expansion-panels accordion>
      <v-expansion-panel >
        <v-expansion-panel-header>Grammar Help</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><strong>Rules:</strong>
      <ul>
          <li>non-terminals must be enclosed in brackets <span class="code">&lt;nonterminal&gt;</span</li>
          <li>Terminals must be surrounded in <span class="code">"quotes"</span>.</li>
          <li>At least one space is necessary between tokens. For example, <span class="code">&lt;nonterminal&gt;::=...</span> is INVALID. You must have at least one space surrounding <span class="code">'::='</span> i.e. <span class="code">&lt;nonterminal&gt; ::= ...</span></li>
          <li>Comments: Only c++ multi-line style comments are currently supported: <span class="code">/* interesting comment about something here */</span></li>
      </ul>
  </p>
  <p><strong>Syntactic Sugar:</strong>
        <ul>
            <li>Single digit and letter intervals are allowed. For instance, instead of writing: <span class="code">&lt;e&gt; ::= "1" | "2" | "3"</span>, you can write <span class="code">&lt;e&gt; ::= [1-3]</span></li>
            <li>Basic EBNF is supported. Specifically:
                <ul>
                    <li>"<span class="code">+</span>" can be used to mean "one or more of the previous." For example: <span class="code">&lt;e&gt; ::= [a-z]+</span> can produce any non-zero length sequence of lower case letters.</li>
                    <li>"<span class="code">*</span>" can be used to mean "zero or more of the previous."</li>
                    <li>"<span class="code">?</span>" can be used to mean "zero or one occurances of the previous."</li>
                    <li>"<span class="code">(</span>" "<span class="code">)</span>" can be used to group elements. For example, <span class="code">&lt;e&gt; ::= ([1-9] [a-z])+</span> allows strings such as: <span class="code">1a, 4f, 4g3f9d,</span> etc.</li>
                    <li>Inside parentheticals, you may also indicate choice by "<span class="code">|</span>". For example, <span class="code">&lt;e&gt; ::= ([1-9] | [a-z])+</span> allows strings such as: <span class="code">2, 3553, 1ffvv2, ggg</span>, etc.</li>
                    <li>Note: EBNF symbols must touch the element(s) they are grouping. valid:<span class="code">( [1-9]? | [a-z] )+</span> invalid: <span class="code">( [1-9] || [a-z] ) +</span>. </li>
                    <li>Check out the short <a href="#"><span onclick="document.getElementById('realnumberexample').click()">Real Numbers example</span></a> to see all these EBNF tricks in action.</li>
                </ul>

            </li>
        </ul>
        
    </p>
    <p><strong>Life Hacks:</strong>
        <ul>
            <li>
                Basic textual auto-complete is available via ctrl+space.
            </li>
            <li>
                Ctrl-S while editing will compile the grammar.
            </li>
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
    font-family: 'Courier New', Courier, monospace
}
</style>