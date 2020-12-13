// const nearley = require("nearley");
// import nearley from "nearley";
// const bnfgrammar = require("./bnfgrammar.js");
// const compile = require("nearley/lib/compile");
// import compile from "nearley/lib/compile";
// const generate = require("nearley/lib/generate");
// const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");
// const codemirror = require("codemirror");
// import codemirror from "codemirror";
// const bnfmode = require("codemirror/mode/ebnf/ebnf.js");
// const anyhint = require("codemirror/addon/hint/anyword-hint.js");
// const showhint = require("codemirror/addon/hint/show-hint.js");
// const nearleygen = require("nearley-generator");
// import nearleygen from "nearley-generator";

// const global: any = {};
// global.nearleygen = nearleygen;
// global.CodeMirror = codemirror;
// function compileGrammar(sourceCode: string) {
//   // Parse the grammar source into an AST
//   const grammarParser = new nearley.Parser(nearleyGrammar);
//   grammarParser.feed(sourceCode);
//   const grammarAst = grammarParser.results[0]; // TODO check for errors

//   // Compile the AST into a set of rules
//   const grammarInfoObject = compile(grammarAst, {});
//   // Generate JavaScript code from the rules
//   const grammarJs = generate(grammarInfoObject, "grammar");

//   // Pretend this is a CommonJS environment to catch exports from the grammar.
//   const module = { exports: {} };
//   eval(grammarJs);

//   return module.exports;
// }

//const grammart = compileGrammar("main -> foo | bar");

// Create a Parser object from our grammar.
// let bnfparser = new nearley.Parser(nearley.Grammar.fromCompiled(bnfgrammar));

// function parseBNF(str: string) {
//   //trim each line:
//   str = str
//     .split("\n")
//     .map(x => x.trim())
//     .join("\n")
//     .trim();
//   // str = str.trim();
//   setBNFError("");
//   document.getElementById("compilationStatus").innerText =
//     compilationStatus.compiling;
//   // Parse something!
//   try {
//     bnfparser.feed(str);
//     global.bnfparser = bnfparser;
//     // parser.results is an array of possible parsings.
//     console.log(bnfparser.results); // [[[[ "foo" ],"\n" ]]]
//     console.log(bnfparser);
//     global.parserresults = bnfparser.results;
//     if (bnfparser.results.length == 0) {
//       throw new Error("General Error: Sorry I couldn't be more specific!");
//     }
//     document.getElementById("compilationStatus").innerText =
//       compilationStatus.good;
//     return bnfparser.results[0];
//     //okay,things went well, let's compile the grammar!
//   } catch (e) {
//     setBNFError("Uhoh, looks like you have an error: " + e);
//     document.getElementById("compilationStatus").innerText =
//       compilationStatus.error;
//     console.log(e);
//   } finally {
//     //things are very very broken if you don't reinitialize. Only good once I guess!
//     bnfparser = new nearley.Parser(nearley.Grammar.fromCompiled(bnfgrammar));
//   }
// }

// function checkstate(teststate) {
//   let result = { isError: false, message: "\n" };
//   teststate.inrulerightSet.forEach(el => {
//     if (teststate.inruleleftList.includes(el)) {
//       //all good here
//     } else {
//       result.isError = true;
//       console.log("in set for each here is elem:", el);
//       result.message += "No rule defined for: <" + el + ">\n";
//       console.log("message so far:", result.message);
//     }
//   });
//   //now let's check for multiple definitions of a non-terminal:
//   let alreadyreported = new Set();
//   teststate.inruleleftList.forEach((el, i) => {
//     if (
//       teststate.inruleleftList.indexOf(el, i + 1) > -1 &&
//       !alreadyreported.has(el)
//     ) {
//       //uhoh, then it's in here twice!
//       result.isError = true;
//       result.message += "Multiple rules defined for: <" + el + ">\n";
//       alreadyreported.add(el);
//     }
//   });
//   return result;
// }

// function populateSelector(arr) {
//   let d = document.getElementById("selector");
//   console.log(d);
//   let str = "";
//   arr.forEach(e => {
//     str += "<option value='" + e + "'>&lt" + e + "&gt</option>";
//   });
//   d.innerHTML = str;
// }

// function generateSaveURL() {
//   let enteredText = getEnteredCode();
//   let encoded = encodeURIComponent(enteredText);
//   let tit = encodeURIComponent(getGrammarName());
//   return (
//     window.location.origin +
//     window.location.pathname +
//     "?bnf=" +
//     encoded +
//     "&name=" +
//     tit
//   );
// }
//called when "compile bnf" is clicked.
// function bnfsubmitted() {
//   let enteredText = getEnteredCode();
//   let parseTree = parseBNF(enteredText);
//   if (!parseTree) {
//     return;
//   }
//   console.log("entered text: ", enteredText);
//   //let nearleycode = parseTreeToNearley(parseTree);
//   let teststate = parseTreeToNearley2(parseTree, initState());
//   let checkst = checkstate(teststate);
//   if (checkst.isError) {
//     setBNFError("Uhoh, looks like you have an error: " + checkst.message);
//     document.getElementById("compilationStatus").innerText =
//       compilationStatus.error;
//     return;
//   }
//   populateSelector(teststate.inruleleftList);
//   let nearleycode = teststate.nearley;
//   console.log("STATE RESULT:", teststate);
//   console.log("transcompilation result:\n", nearleycode);
//   let compiledgrammar = compileGrammar(nearleycode);
//   //if we made it here, let's save the state.
//   global.state.enteredText = enteredText;
//   global.state.parseTree = parseTree; //do I need this?
//   global.state.nearleycode = nearleycode;
//   global.state.compiledgrammar = compiledgrammar;
//   console.log("here is my compiled grammar: ", compiledgrammar);
//   return true;
// }
// global.bnfsubmitted = bnfsubmitted; //need this scope for button click entry.
// global.onGenerate = onGenerate;

// function onGenerate() {
//   if (isCompiled() || bnfsubmitted()) {
//     let term = getTermToGenerate();
//     let rate = getGenerationRate();
//     let grammarjs = global.state.compiledgrammar;
//     let currentString = document.getElementById("testinput").value;
//     let res = generateTest(grammarjs, term, rate);
//     while (currentString == res) {
//       res = generateTest(grammarjs, term, rate);
//     }

//     document.getElementById("testinput").value = res;
//     validityTest();

//     console.log("generated string:", res);
//   } else {
//     //setBNFError("Please compile your grammar first.");
//   }
// }

// function generateTest(jsgrammar, term, rate) {
//   console.log("nearleygen:", nearleygen);
//   let g = new nearleygen.default(jsgrammar);
//   let r = g.generate(term, rate);
//   return r;
// }
// function validityTest() {
//   let testString = getTestString();
//   if (
//     document.getElementById("compilationStatus").innerText !=
//     compilationStatus.good
//   ) {
//     //you need to compile your grammar first!
//     setBNFError("You need to compile your grammar before testing!");
//     return;
//   }
//   //now let's test it!
//   let parser = new nearley.Parser(
//     nearley.Grammar.fromCompiled(global.state.compiledgrammar)
//   );
//   // Parse something!
//   try {
//     parser.feed(testString);
//     if (parser.results.length > 0) {
//       document.getElementById("testinput").style.backgroundColor = "limeGreen";
//     } else {
//       document.getElementById("testinput").style.backgroundColor = "IndianRed";
//     }
//   } catch (e) {
//     console.log(e);
//     document.getElementById("testinput").style.backgroundColor = "IndianRed";
//   }

//   // parser.results is an array of possible parsings.
//   console.log(testString);
//   console.log(parser.results); // [[[[ "foo" ],"\n" ]]]
// }
// global.validityTest = validityTest; //need this scope for button click entry.

// function ontestStringChanged(obj) {
//   validityTest();
// }
// global.ontestStringChanged = ontestStringChanged;
// function parseTreeToNearley(data) {
//   if (data == null) {
//     return " ";
//   }
//   if (data instanceof Array) {
//     return data.reduce((acc, x) => acc + parseTreeToNearley(x), "");
//   }
//   if (typeof data == "object" && data.type) {
//     if (data.type == "rule") {
//       return (
//         parseTreeToNearley(data.value.nonterminal).trim() +
//         " ->" +
//         parseTreeToNearley(data.value.rulebody)
//       );
//     }
//     if (data.type == "case") {
//       return parseTreeToNearley(data.value);
//     }
//     if (data.type == "terminal") {
//       if (typeof data.value == "string") {
//         return ' "' + data.value + '"';
//       } else {
//         return parseTreeToNearley(data.value);
//       }
//     }
//     if (data.type == "nonterminal") {
//       return " " + parseTreeToNearley(data.value);
//     } //SPACE
//     if (data.type == "newline") {
//       return "\n";
//     }
//     if (data.type == "regex") {
//       return " " + data.value;
//     }
//     if (data.type == "ident") {
//       return data.value;
//     }
//     if (data.type == "esym") {
//       return ":" + data.value;
//     }
//   }
//   // if(typeof data == "string"){return " " + data}
//   console.log("unhandled case:", data, "appending anyway");
//   return "" + data;
// }

// function initState() {
//   let state = {};
//   state.nearley = "";
//   state.inruleleftList = [];
//   state.inrulerightSet = new Set();
//   state.left = null;
//   console.log("initing state:", state);
//   return state;
// }
// //check the defined or nots while we traverse the tree.
//
//state.inruleleftList;
//state.inrulerightSet;
//state.nearley;
// function parseTreeToNearley2(tree) {
//   // console.log("state is,", state);
//   if (tree == null) {
//     state.nearley += " ";
//     return state;
//   }
//   if (tree instanceof Array) {
//     return tree.reduce(
//       (stacc, treebit) => parseTreeToNearley2(treebit, stacc),
//       state
//     );
//   }
//   if (typeof tree == "object" && tree.type) {
//     if (tree.type == "rule") {
//       state.left = true;
//       let stprime = parseTreeToNearley2(tree.value.nonterminal, state); //OTHER FUNCTION CALL.
//       stprime.nearley += " ->";
//       console.log("state after left true:", stprime);
//       stprime.left = false;
//       return parseTreeToNearley2(tree.value.rulebody, stprime);
//     }
//     if (tree.type == "case") {
//       return parseTreeToNearley2(tree.value, state);
//     }
//     if (tree.type == "terminal") {
//       if (typeof tree.value == "string") {
//         state.nearley += ' "' + tree.value + '"';
//         return state;
//       } else {
//         return parseTreeToNearley2(tree.value, state);
//       }
//     }
//     if (tree.type == "nonterminal") {
//       if (typeof tree.value == "string") {
//         state.nearley += ' "' + tree.value + '"';
//         return state;
//       } else {
//         return parseTreeToNearley2(tree.value, state);
//       }
//     } //SPACE todo.
//     if (tree.type == "newline") {
//       state.nearley += "\n";
//       return state;
//     }
//     if (tree.type == "regex") {
//       state.nearley += " " + tree.value;
//       return state;
//     }
//     if (tree.type == "ident") {
//       state.nearley += tree.value;
//       if (state.left) {
//         //add to left list
//         state.inruleleftList.push(tree.value);
//       } else {
//         state.inrulerightSet.add(tree.value);
//       }
//       // console.log("on ident,", state);
//       return state;
//     }
//     if (tree.type == "esym") {
//       state.nearley += ":" + tree.value;
//       return state;
//     }
//     if (tree.type == "comment") {
//       //state.nearley += tree.value;
//       return state;
//     }
//   }
//   // if(typeof data == "string"){return " " + data}
//   console.log("unhandled case:", tree, "appending anyway");
//   state.nearley += "" + tree;
//   return state;
// }

// function initializeBNFEditor() {
//   let editor = codemirror.fromTextArea(document.getElementById("textinput"), {
//     mode: { name: "ebnf" },
//     lineNumbers: true,
//     bracesMode: "javascript",
//     extraKeys: { "Ctrl-Space": "autocomplete" }
//   });
//   global.editor = editor; //for debugging purposes.
//   editor.on("change", onEditorChanged);
// }

// function onCodeResize(ths) {
//   console.log(ths);
//   console.log(ths.style.height);
// }
// global.onCodeResize = onCodeResize;
// function onEditorChanged(myself, changeObj) {
//   //console.log("onchange event",myself,changeObj);
//   getCompilationStatus().innerText = compilationStatus.modified;
// }
// function getCompilationStatus() {
//   return document.getElementById("compilationStatus");
// }
// function isCompiled() {
//   return getCompilationStatus().innerText == compilationStatus.good;
// }

// const compilationStatus = {
//   good: "All good!",
//   error: "Error",
//   modified: "uncompiled",
//   compiling: "compiling.."
// };
// global.state = {}; //which will hold our bnf and parse info.
// initializeBNFEditor();
// console.log("main has loaded!!!");

// function loadGetBNF() {
//   let ustr = window.location.href;
//   let url = new URL(ustr);
//   let bnf = url.searchParams.get("bnf");
//   let tit = url.searchParams.get("name");
//   if (bnf) {
//     console.log("bnf is here! it should be: ", decodeURIComponent(bnf));
//     setEnteredCode(decodeURIComponent(bnf));
//     setGrammarName(tit ? tit : "");
//   }
//   console.log(bnf);
// }
// function onSaveToURL() {
//   if (bnfsubmitted()) {
//     let url = generateSaveURL();
//     console.log(url);
//     document.getElementById("urloutput").value = url;
//   }
// }
// global.onSaveToURL = onSaveToURL;
// loadGetBNF();

//-------------GET SET
// function setGrammarName(str) {
//   document.getElementById("grammartitle").value = str;
// }
// function getGrammarName() {
//   return document.getElementById("grammartitle").value;
// }
// function getGenerationRate() {
//   return 0.7;
// }
// function getTermToGenerate() {
//   return document.getElementById("selector").value;
// }
// function getEnteredCode() {
//   return editor.doc.getValue();
// }
// function setEnteredCode(str) {
//   editor.doc.setValue(str);
// }
// function getTestString() {
//   return document.getElementById("testinput").value;
// }
// function setBNFError(str) {
//   document.getElementById("bnferror").innerHTML =
//     "<pre>" + str.replace(/</g, "&lt").replace(/>/g, "&gt") + "</pre>";
// }
