<template>
  <div>
    <div id="editbnf">
      <v-text-field label="Grammar Title"></v-text-field>
      <div>Enter your BNF (or EBNF) below.</div>
      <div>
        <div
          class="code-mirror-holder"
          id="buffer"
          @touchstart="onCodeSizeMouseDown($event.srcElement)"
          @touchend="onCodeSizeMouseUp($event.srcElement)"
          @mouseup="onCodeSizeMouseUp($event.srcElement)"
          @mousedown="onCodeSizeMouseDown($event.srcElement)"
          ref="code-mirror-holder"
          @keydown.ctrl.83.prevent="bnfsubmitted"
        >
          <textarea rows="20" cols="50" id="textinput" ref="editor">
<gpa> ::= "4.0" | <leading> "." <trailing>
<leading> ::= [0-3]
<trailing> ::= [0-9]</textarea
          >
        </div>
        <div class="d-flex align-baseline">
          <v-btn elevation="2" @click="bnfsubmitted()" class="mr-2"
            >Compile BNF</v-btn
          >
          <v-alert dense :type="type" :color="color">{{ status }}</v-alert>
        </div>
      </div>
      <v-alert v-if="error" color="red" type="error"
        ><pre>{{ error }}</pre></v-alert
      >
      <div
        id="bnferror"
        style="font-family: 'Courier New', Courier, monospace"
        class="w3-red"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import codemirror from "codemirror";
import { Vue, Component, Prop } from "vue-property-decorator";
const bnfmode = require("codemirror/mode/ebnf/ebnf.js");
import BNFController, { compilationStatus } from "~/ts/BNFController.ts";
const bnf = BNFController.getInstance();
// console.log("bnfmode", bnfmode);
// (window as any).bnfmode = bnfmode;
const anyhint = require("codemirror/addon/hint/anyword-hint.js");
const showhint = require("codemirror/addon/hint/show-hint.js");
@Component
export default class Editor extends Vue {
  bnf = bnf; //this must be assigned as prop for reactivity.
  compilationEnum = compilationStatus;
  get status() {
    return this.bnf.compilationStatus; //must be done this way for reactivity.
  }
  get error() {
    return this.bnf.bnfError;
  }
  get type(): string {
    switch (this.status) {
      case this.compilationEnum.good:
        return "success";
      case this.compilationEnum.error:
        return "error";
      case this.compilationEnum.modified:
        return "info";
      default:
        return "info";
        break;
    }
  }
  get color(): string {
    switch (this.status) {
      case this.compilationEnum.modified:
        return "orange";
      default:
        return "";
        break;
    }
  }
  isMounted: boolean = false;
  //@ts-ignore
  editor: codemirror.EditorFromTextArea;
  mounted() {
    this.isMounted = true;
    console.log("editor mounted");
    this.initializeBNFEditor();
  }
  initializeBNFEditor() {
    this.editor = codemirror.fromTextArea(
      //@ts-ignore
      this.$refs["editor"],
      {
        mode: { name: "ebnf" },
        lineNumbers: true,
        theme: "abcdef",
        bracesMode: "javascript",
        extraKeys: { "Ctrl-Space": "autocomplete" }
      }
    );
    const me = this;
    me.bnf.currentSourceCode = me.editor.getDoc().getValue(); //set so that generate random works immediately.
    this.editor.on("change", function onEditorChanged(myself, changeObj) {
      //console.log("onchange event",myself,changeObj);
      me.bnf.compilationStatus = compilationStatus.modified;
      me.bnf.currentSourceCode = me.editor.getDoc().getValue();
    });
  }
  bnfsubmitted() {
    let enteredText = this.editor.getDoc().getValue();
    bnf.bnfsubmitted(enteredText);
  }
  //to be called when resizing code window.
  onCodeSizeMouseDown(ths: any) {
    ths.keepresizing = true;
    this.scheduleResizes(ths, this.editor, -20, 20);
  }
  scheduleResizes(
    ths: any,
    ed: codemirror.Editor,
    sizediff: number,
    freq: number
  ) {
    const me = this;
    if (ths.keepresizing) {
      setTimeout(() => {
        //console.log("resizing!");
        if (!ed) {
          return;
        }
        ed.setSize(null, me.pxadd(ths.style.height, sizediff));
        if (ths.keepresizing) {
          this.scheduleResizes(ths, ed, sizediff, freq);
        }
      }, freq);
    }
  }
  onCodeSizeMouseUp(ths: any) {
    ths.keepresizing = false;
  }
  resizeEditor(height: number, ed: codemirror.Editor) {
    ed.setSize(null, height);
  }
  pxadd(px1: any, px2: any) {
    return parseInt(px1, 10) + parseInt(px2, 10);
  }
}
</script>

<style>
@import "~/css/codemirror.css";
/* @import "~/css/3024-night.css"; */
@import "~/css/abcdef.css";
.code-mirror-holder {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  padding: 10px;
  resize: vertical;
  overflow: auto;

  overflow-y: hidden;
  overflow-x: hidden;
}
.light-gray {
  color: gray;
}
</style>
