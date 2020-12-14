<template>
     <v-expansion-panels accordion focusable>
      <v-expansion-panel >
        <v-expansion-panel-header>Grammar Help</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><strong>Rules:</strong>
      <ul>
          <li>non-terminals must be enclosed in brackets <span class="code">&lt;nonterminal&gt;</span></li>
          <li>Terminals must be surrounded in <span class="code">"quotes"</span>.</li>
          <li>At least one space is necessary between tokens. For example, <span class="code">&lt;nonterminal&gt;::=...</span> is INVALID. You must have at least one space surrounding <span class="code">'::='</span> i.e. <span class="code">&lt;nonterminal&gt; ::= ...</span></li>
          <li>Comments: Only c++ multi-line style comments are currently supported and must begin and end on its own line: <span class="code">/* interesting comment about something here */</span></li>
      </ul>
  </p>
  <p><strong>Syntactic Sugar:</strong>
        <ul>
            <li>Single digit and letter intervals are allowed. For instance, instead of writing: <span class="code">&lt;e&gt; ::= "1" | "2" | "3"</span>, you can write <span class="code">&lt;e&gt; ::= [1-3]</span></li>
            <li>Basic EBNF is supported. Specifically:
                <ul>
                    <li>"<span class="code">+</span>" can be used to mean "<em>one or more of the previous.</em>" For example: <span class="code">&lt;e&gt; ::= [a-z]+</span> can produce any non-zero length sequence of lower case letters.</li>
                    <li>"<span class="code">*</span>" can be used to mean "<em>zero or more of the previous.</em>"</li>
                    <li>"<span class="code">?</span>" can be used to mean "<em>zero or one occurances of the previous.</em>"</li>
                    <li>"<span class="code">(</span>" "<span class="code">)</span>" can be used to group elements. For example, <span class="code">&lt;e&gt; ::= ([1-9] [a-z])+</span> allows strings such as: <span class="code">1a, 4f, 4g3f9d,</span> etc.</li>
                    <li>Inside parentheticals, you may also indicate choice by "<span class="code">|</span>". For example, <span class="code">&lt;e&gt; ::= ([1-9] | [a-z])+</span> allows strings such as: <span class="code">2, 3553, 1ffvv2, ggg</span>, etc.</li>
                    <li>Note: EBNF symbols must touch the element(s) they are grouping. valid:<span class="code">( [1-9]? | [a-z] )+</span> invalid: <span class="code">( [1-9] || [a-z] ) +</span>. </li>
                    <li>Check out the short <a :href="'/' + realLink"><span>Real Numbers example</span></a> to see all these EBNF tricks in action.</li>
                </ul>

            </li>
        </ul>
        
    </p>
    <p><strong>Life Hacks:</strong>
        <ul>
            <li>The special symbols backslash (\), double quote ("), and new-line (\n) can be a valid terminals when escaped: <span class="code">&lt;fun&gt; ::= "\\" | "\"" | "\n"</span></li>
            
            <li>
                Basic textual auto-complete is available via ctrl+space.
            </li>
            <li>
                Ctrl-S while editing will compile the grammar & save to your browser history.
            </li>
            <li>Each time you hit Ctrl-S OR 'Save BNF as URL' the state is saved in your browser history
                and you can use the forward and back buttons to navigate saved states.
            </li>
        </ul>

    </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import examples from "~/ts/examples.ts"
@Component
export default class GrammarHelp extends Vue {
    realLink :string = examples.find(x => x.title == "Real Numbers")?.link || ""
  
}
</script>

</script>
<style>
.code{
    font-family: 'Courier New', Courier, monospace;
    color:green;
}
</style>