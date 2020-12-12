<template>
  <div>
    <div id="editbnf">
      <v-text-field
        class="large pb-3"
        height="1.5em"
        label="Grammar Title"
        v-model="title"
      ></v-text-field>
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
          @keydown.ctrl.83.prevent="ctrlS"
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
          <v-spacer />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="saveAsURL">
                Save BNF as URL
              </v-btn>
            </template>
            <span
              >Encodes your BNF to the current URL so you can bookmark it for
              later.</span
            >
          </v-tooltip>
        </div>
      </div>
      <v-alert v-if="error" color="red" type="error"
        ><pre>{{ error }}</pre></v-alert
      >
    </div>
  </div>
</template>
<script lang="ts">
import codemirror from "codemirror";
import { Vue, Component, Prop } from "vue-property-decorator";
const bnfmode = require("codemirror/mode/ebnf/ebnf.js");
import BNFController, { compilationStatus } from "~/ts/BNFController.ts";
const bnf = BNFController.getInstance();

const anyhint = require("codemirror/addon/hint/anyword-hint.js");
const showhint = require("codemirror/addon/hint/show-hint.js");
@Component
export default class Editor extends Vue {
  bnf = bnf; //this must be assigned as prop for reactivity.
  compilationEnum = compilationStatus;
  title: string = "";
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
    this.loadGetBNF();
    window.onpopstate = this.loadGetBNF;
  }
  beforeDestroy() {
    window.onpopstate = null;
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
  loadGetBNF() {
    let ustr = window.location.href;
    let url = new URL(ustr);
    let bnf = url.searchParams.get("bnf");
    let tit = url.searchParams.get("name");
    if (bnf) {
      console.log("bnf is here! it should be: ", decodeURIComponent(bnf));
      // setEnteredCode(decodeURIComponent(bnf));
      this.editor.getDoc().setValue(decodeURIComponent(bnf));
      this.title = tit ? tit : "";
    }
    console.log(bnf);
  }
  saveAsURL() {
    const url = this.generateSaveURL();
    window.history.pushState({}, "", url);
  }
  generateSaveURL() {
    const enteredText = this.editor.getDoc().getValue();
    const encoded = encodeURIComponent(enteredText);
    const tit = encodeURIComponent(this.title);
    const str =
      window.location.origin +
      window.location.pathname +
      "?bnf=" +
      encoded +
      "&name=" +
      tit;
    console.log(str);
    return str;
  }
  bnfsubmitted() {
    let enteredText = this.editor.getDoc().getValue();
    bnf.bnfsubmitted(enteredText);
  }
  ctrlS() {
    this.bnfsubmitted();
    this.saveAsURL();
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
.large {
  font-size: 2em;
}
</style>
