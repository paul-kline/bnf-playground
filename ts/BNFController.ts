import nearley from "nearley";
const bnfgrammar = require("./bnfgrammar.js");
const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");
const compile = require("nearley/lib/compile");
const generate = require("nearley/lib/generate");
const nearleygen = require("nearley-generator");
type State = {
  nearley: string;
  inruleleftList: any[];
  inrulerightSet: Set<any>;
  left: any;
  nearleycode?: string;
  compiledgrammar?: nearley.CompiledRules;
};
export default class BNFController {
  static _instance: null | BNFController = null;
  static getInstance(): BNFController {
    if (!BNFController._instance) {
      BNFController._instance = new BNFController();
    }
    return BNFController._instance;
  }
  compilationStatus: string = "uncompiled";
  bnfError: string = "";
  testingError: string = "";
  bnfParser: nearley.Parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(bnfgrammar)
  );
  state: State = initState();
  nonTerminals: string[] = []; //used to populate selector in stringtester.vue
  currentSourceCode: string = ""; //for string testing, this needs to be shared. updated on editor change.
  triggerSelection: any; //stringtester.vue sets this as a function which auto-selects the first non-terminal when compilation is triggered.
  selectedNonTerminal: string = ""; //stringtester.vue sets this. It is needed here for the validitytest.

  /**
   * This function does or calls all the interesting bnf compilation stuff.
   * It is called when the user clicks 'compile grammar'
   * @param grammar The entered grammar
   */
  bnfsubmitted(grammar: string = this.currentSourceCode) {
    this.testingError = ""; //clear out compilation needed message when compiled.
    this.currentSourceCode = grammar;
    this.state = initState(); //clear out old stuff.
    console.log("entered text", grammar);
    let parseTree = this.parseBNF(grammar);
    if (!parseTree) {
      return; //there is nothing to do. an invalid definition has been given.
    }

    let teststate = this.parseTreeToNearley2(parseTree);
    let checkst = checkstate(teststate);
    if (checkst.isError) {
      this.bnfError = "Uhoh, looks like you have an error: " + checkst.message;
      console.log("error after checkstate ", checkst, teststate);
      this.compilationStatus = "Error";
      return;
    }
    // populateSelector(teststate.inruleleftList);
    console.log("before:", this.selectedNonTerminal);
    this.nonTerminals = teststate.inruleleftList;
    console.log("before2:", this.selectedNonTerminal);
    if (this.triggerSelection)
      this.triggerSelection(
        "<" +
          ((this.nonTerminals.includes(this.selectedNonTerminal) &&
            this.selectedNonTerminal) ||
            this.nonTerminals[0]) +
          ">"
      ); //I have no idea why I have to pass this here, but I do or it resets to selecting top item
    console.log("after:", this.selectedNonTerminal);

    let nearleycode = teststate.nearley;
    console.log("STATE RESULT:", teststate);
    console.log("transcompilation result:\n", nearleycode);
    let compiledgrammar = compileGrammar(nearleycode);
    //if we made it here, let's save the state.
    // this.state.enteredText = enteredText;
    // this.state.parseTree = parseTree; //do I need this?
    this.state.nearleycode = nearleycode;
    this.state.compiledgrammar = compiledgrammar;
    console.log("here is my compiled grammar: ", compiledgrammar);
    return true;
  }
  /**
   * Takes the entered definition and attempts to make a parse tree according
   * to the nearley definition for a valid BNF given in bnf.ne.
   * @param str the raw bnf definition.
   * @returns the first valid parse tree or nothing in the case of an error (but sets error messages).
   */
  parseBNF(str: string) {
    //trim each line:
    str = str
      .split("\n")
      .map(x => x.trim())
      .join("\n")
      .trim();
    // str = str.trim();
    this.bnfError = "";
    this.compilationStatus = compilationStatus.compiling;

    // Parse something!
    try {
      this.bnfParser.feed(str);
      // parser.results is an array of possible parsings.
      console.log(this.bnfParser.results); // [[[[ "foo" ],"\n" ]]]
      console.log(this.bnfParser);
      if (this.bnfParser.results.length == 0) {
        throw new Error("General Error: Sorry I couldn't be more specific!");
      }
      this.compilationStatus = compilationStatus.good;
      console.log("compilation status: " + this.compilationStatus);
      return this.bnfParser.results[0];
      //okay,things went well, let's compile the grammar!
    } catch (e) {
      this.bnfError = "Uhoh, looks like you have an error: " + e;
      this.compilationStatus = compilationStatus.error;
      console.log(e);
    } finally {
      //things are very very broken if you don't reinitialize. Only good once I guess!
      this.bnfParser = new nearley.Parser(
        nearley.Grammar.fromCompiled(bnfgrammar)
      );
    }
  }
  /**
   * This function performs transcompilation of the parse Tree from user BNF into a Nearley grammar.
   * @param tree
   * @returns a state object with the transpilation results.
   */
  parseTreeToNearley2(tree: any): State {
    if (tree == null) {
      this.state.nearley += " ";
      return this.state;
    }
    //if it's an array, process each?
    if (tree instanceof Array) {
      return tree.reduce(
        (stacc, treebit) => this.parseTreeToNearley2(treebit),
        this.state
      );
    }
    if (typeof tree == "object" && tree.type) {
      if (tree.type == "rule") {
        this.state.left = true;
        let stprime: State = this.parseTreeToNearley2(tree.value.nonterminal); //OTHER FUNCTION CALL.
        stprime.nearley += " ->";
        console.log("state after left true:", stprime);
        stprime.left = false;
        return this.parseTreeToNearley2(tree.value.rulebody);
      }
      if (tree.type == "case") {
        return this.parseTreeToNearley2(tree.value);
      }
      if (tree.type == "terminal") {
        if (typeof tree.value == "string") {
          this.state.nearley += ' "' + tree.value + '"';
          return this.state;
        } else {
          return this.parseTreeToNearley2(tree.value);
        }
      }
      if (tree.type == "nonterminal") {
        if (typeof tree.value == "string") {
          this.state.nearley += ' "' + tree.value + '"';
          return this.state;
        } else {
          return this.parseTreeToNearley2(tree.value);
        }
      } //SPACE todo.
      if (tree.type == "newline") {
        this.state.nearley += "\n";
        return this.state;
      }
      if (tree.type == "regex") {
        this.state.nearley += " " + tree.value;
        return this.state;
      }
      if (tree.type == "ident") {
        this.state.nearley += tree.value;
        if (this.state.left) {
          //add to left list
          this.state.inruleleftList.push(tree.value);
        } else {
          this.state.inrulerightSet.add(tree.value);
        }
        // console.log("on ident,", state);
        return this.state;
      }
      if (tree.type == "esym") {
        this.state.nearley += ":" + tree.value;
        return this.state;
      }
      if (tree.type == "comment") {
        //state.nearley += tree.value;
        return this.state;
      }
    }
    // if(typeof data == "string"){return " " + data}
    console.log("unhandled case:", tree, "appending anyway");
    this.state.nearley += "" + tree;
    return this.state;
  }
  /**
   * Test the validity of a string against the compiled grammar stored in state.
   * @param testString the string to test against.
   */
  validityTest(testString: string): boolean {
    console.log("VALIDITY TEST");
    this.testingError = "";
    if (this.compilationStatus != compilationStatus.good) {
      //you need to compile your grammar first!
      this.testingError = "You need to compile your grammar before testing!";
      return false;
    }
    //now let's test it!
    if (!this.state.compiledgrammar) return false;
    const grammar = nearley.Grammar.fromCompiled(this.state.compiledgrammar);
    if (this.selectedNonTerminal) {
      console.log("setting start to: ", this.selectedNonTerminal);
      grammar.start = this.selectedNonTerminal;
    }
    let parser = new nearley.Parser(grammar);

    // Parse something!
    try {
      parser.feed(testString);
      console.log("parser:", parser);
      return parser.results.length > 0;
    } catch (e) {
      console.log(e);
      this.testingError = e.message;
      // this.bnfError = "Unprecedented Error: " + e.message;
      return false;
    }

    // parser.results is an array of possible parsings.
    console.log(testString);
    console.log(parser.results); // [[[[ "foo" ],"\n" ]]]
  }
  isCompiled(): boolean {
    return this.compilationStatus == compilationStatus.good;
  }
  onGenerate(currentString: string = ""): string {
    if (this.isCompiled() || this.bnfsubmitted()) {
      let term = this.selectedNonTerminal;
      let rate = 0.7;
      let grammarjs = this.state.compiledgrammar;
      if (!grammarjs) {
        console.error("state.compiledgrammar is null. this is unexpected");
        return currentString;
      }
      //this little loop ensures freshness
      let res = this.generateTest(grammarjs, term, rate);
      let counter: number = 0; //needed if there is only 1.
      while (currentString == res && counter++ < 20) {
        res = this.generateTest(grammarjs, term, rate);
      }

      console.log("generated string:", res);
      return res;
    } else {
      //I don't think it's possible to get here.
      this.bnfError = "Please compile your grammar first";
      return currentString;
    }
  }
  generateTest(
    jsgrammar: nearley.CompiledRules,
    term: string,
    rate: number
  ): string {
    console.log("nearleygen:", nearleygen);
    let g = new nearleygen.default(jsgrammar);
    let r = g.generate(term, rate);
    return r;
  }
}

function initState(): State {
  let state: any = {};
  state.nearley = "";
  state.inruleleftList = [];
  state.inrulerightSet = new Set();
  state.left = null;
  return state;
}
/**
 * Ensures that there are not multiple definitions for a non-terminal.
 * @param teststate
 */
function checkstate(teststate: State): { isError: boolean; message: string } {
  let result = { isError: false, message: "\n" };
  teststate.inrulerightSet.forEach(el => {
    if (teststate.inruleleftList.includes(el)) {
      //all good here
    } else {
      result.isError = true;
      console.log("in set for each here is elem:", el);
      result.message += "No rule defined for: <" + el + ">\n";
      console.log("message so far:", result.message);
    }
  });
  //now let's check for multiple definitions of a non-terminal:
  let alreadyreported = new Set();
  teststate.inruleleftList.forEach((el, i) => {
    if (
      teststate.inruleleftList.indexOf(el, i + 1) > -1 &&
      !alreadyreported.has(el)
    ) {
      //uhoh, then it's in here twice!
      result.isError = true;
      result.message += "Multiple rules defined for: <" + el + ">\n";
      alreadyreported.add(el);
    }
  });
  return result;
}

/**
 * compiles a nearley grammar.
 * @param sourceCode nearley grammar
 */
function compileGrammar(
  sourceCode: string
): {
  Lexer: nearley.Lexer;
  ParserRules: nearley.ParserRule[];
  ParserStart: string;
} {
  // Parse the grammar source into an AST
  const grammarParser = new nearley.Parser(nearleyGrammar);
  grammarParser.feed(sourceCode);
  const grammarAst = grammarParser.results[0]; // TODO check for errors

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {});
  // Generate JavaScript code from the rules
  const grammarJs = generate(grammarInfoObject, "grammar");

  // Pretend this is a CommonJS environment to catch exports from the grammar.
  const module = { exports: {} };
  eval(grammarJs);
  console.log("result of compileGrammar");
  //@ts-ignore
  return module.exports;
}
export const compilationStatus = {
  good: "All good!",
  error: "Error",
  modified: "uncompiled",
  compiling: "compiling.."
};
