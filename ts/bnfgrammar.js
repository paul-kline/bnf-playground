// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function() {
  function id(x) {
    return x[0];
  }
  var grammar = {
    Lexer: undefined,
    ParserRules: [
      { name: "bnf", symbols: ["rule"] },
      { name: "bnf", symbols: ["rule", "multinewline", "bnf"] },
      { name: "multinewline$ebnf$1", symbols: [{ literal: "\n", pos: 18 }] },
      {
        name: "multinewline$ebnf$1",
        symbols: [{ literal: "\n", pos: 18 }, "multinewline$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        }
      },
      {
        name: "multinewline",
        symbols: ["multinewline$ebnf$1"],
        postprocess: function(d) {
          return {
            type: "newline",
            value: "\n"
          };
        }
      },
      {
        name: "rule$string$1",
        symbols: [{ literal: ":" }, { literal: ":" }, { literal: "=" }],
        postprocess: function joiner(d) {
          return d.join("");
        }
      },
      {
        name: "rule",
        symbols: ["nonterminal", "_+", "rule$string$1", "_+", "rulebody"],
        postprocess: function(d) {
          return {
            type: "rule",
            value: { nonterminal: d[0], rulebody: d[4] }
          };
        }
      },
      { name: "rule", symbols: ["comment"] },
      {
        name: "nonterminal",
        symbols: [
          { literal: "<", pos: 47 },
          "ident",
          { literal: ">", pos: 51 }
        ],
        postprocess: function(d) {
          return {
            type: "nonterminal",
            value: d[1]
          };
        }
      },
      { name: "ident$ebnf$1$subexpression$1", symbols: [/[a-zA-Z_]/] },
      { name: "ident$ebnf$1$subexpression$1", symbols: [/[0-9]/] },
      { name: "ident$ebnf$1", symbols: ["ident$ebnf$1$subexpression$1"] },
      { name: "ident$ebnf$1$subexpression$2", symbols: [/[a-zA-Z_]/] },
      { name: "ident$ebnf$1$subexpression$2", symbols: [/[0-9]/] },
      {
        name: "ident$ebnf$1",
        symbols: ["ident$ebnf$1$subexpression$2", "ident$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        }
      },
      {
        name: "ident",
        symbols: ["ident$ebnf$1"],
        postprocess: function(d) {
          return {
            type: "ident",
            value: d[0].join("")
          };
        }
      },
      { name: "rulebody", symbols: ["rb2"] },
      {
        name: "comment$string$1",
        symbols: [{ literal: "/" }, { literal: "*" }],
        postprocess: function joiner(d) {
          return d.join("");
        }
      },
      { name: "comment$ebnf$1", symbols: [] },
      {
        name: "comment$ebnf$1",
        symbols: [/./, "comment$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        }
      },
      {
        name: "comment$string$2",
        symbols: [{ literal: "*" }, { literal: "/" }],
        postprocess: function joiner(d) {
          return d.join("");
        }
      },
      {
        name: "comment",
        symbols: ["comment$string$1", "comment$ebnf$1", "comment$string$2"],
        postprocess: function(d) {
          return {
            type: "comment",
            value: d[1].join("")
          };
        }
      },
      { name: "rb2", symbols: ["rb2", "_+", "t"] },
      {
        name: "rb2",
        symbols: ["rb2", "_+", { literal: "|", pos: 106 }, "_+", "t"]
      },
      { name: "rb2", symbols: ["t"] },
      { name: "t", symbols: ["t2", "wesym"] },
      { name: "t", symbols: ["t2"] },
      { name: "t2", symbols: ["term"] },
      {
        name: "t2",
        symbols: [
          { literal: "(", pos: 136 },
          "_",
          "rb2",
          "_",
          { literal: ")", pos: 144 }
        ]
      },
      {
        name: "wesym",
        symbols: ["esym"],
        postprocess: function(d) {
          return {
            type: "esym",
            value: d[0]
          };
        }
      },
      { name: "esym", symbols: [{ literal: "+", pos: 158 }], postprocess: id },
      { name: "esym", symbols: [{ literal: "?", pos: 163 }], postprocess: id },
      { name: "esym", symbols: [{ literal: "*", pos: 168 }], postprocess: id },
      { name: "term", symbols: ["nonterminal"], postprocess: id },
      { name: "term", symbols: ["terminal"], postprocess: id },
      {
        name: "terminal",
        symbols: ["terminalstr"],
        postprocess: function(d) {
          return {
            type: "terminal",
            value: d[0]
          };
        }
      },
      {
        name: "terminal",
        symbols: ["regex"],
        postprocess: function(d) {
          return {
            type: "terminal",
            value: d[0]
          };
        }
      },
      {
        name: "terminal",
        symbols: [{ literal: "E", pos: 202 }],
        postprocess: function(d) {
          return {
            type: "terminal",
            value: null
          };
        }
      },
      { name: "terminalstr$ebnf$1", symbols: ["validterminal"] },
      {
        name: "terminalstr$ebnf$1",
        symbols: ["validterminal", "terminalstr$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        }
      },
      {
        name: "terminalstr",
        symbols: [
          { literal: '"', pos: 210 },
          "terminalstr$ebnf$1",
          { literal: '"', pos: 215 }
        ],
        postprocess: function(d) {
          return d[1].join("");
        }
      },
      {
        name: "regex",
        symbols: [
          { literal: "[", pos: 225 },
          "range",
          { literal: "]", pos: 229 }
        ],
        postprocess: function(d) {
          return {
            type: "regex",
            value: d.join("")
          };
        }
      },
      { name: "range", symbols: ["numrange"] },
      { name: "range", symbols: ["letterrange"], postprocess: id },
      {
        name: "numrange",
        symbols: ["digit", { literal: "-", pos: 251 }, "digit"],
        postprocess: function(d) {
          return d.join("");
        }
      },
      {
        name: "letterrange",
        symbols: ["letter", { literal: "-", pos: 263 }, "letter"],
        postprocess: function(d) {
          return d.join("");
        }
      },
      { name: "digit", symbols: [/[0-9]/], postprocess: id },
      { name: "letter", symbols: [/[a-zA-Z]/], postprocess: id },
      { name: "validterminal", symbols: [/[a-zA-Z0-9]/] },
      { name: "validterminal", symbols: ["symbol"], postprocess: id },
      { name: "symbol", symbols: [{ literal: "|", pos: 301 }] },
      { name: "symbol", symbols: [{ literal: " ", pos: 305 }] },
      { name: "symbol", symbols: [{ literal: "-", pos: 309 }] },
      { name: "symbol", symbols: [{ literal: "!", pos: 313 }] },
      { name: "symbol", symbols: [{ literal: "#", pos: 317 }] },
      { name: "symbol", symbols: [{ literal: "$", pos: 321 }] },
      { name: "symbol", symbols: [{ literal: "%", pos: 325 }] },
      { name: "symbol", symbols: [{ literal: "&", pos: 329 }] },
      { name: "symbol", symbols: [{ literal: "(", pos: 333 }] },
      { name: "symbol", symbols: [{ literal: ")", pos: 337 }] },
      { name: "symbol", symbols: [{ literal: "*", pos: 341 }] },
      { name: "symbol", symbols: [{ literal: "+", pos: 345 }] },
      { name: "symbol", symbols: [{ literal: ",", pos: 349 }] },
      { name: "symbol", symbols: [{ literal: "-", pos: 353 }] },
      { name: "symbol", symbols: [{ literal: ".", pos: 357 }] },
      { name: "symbol", symbols: [{ literal: "/", pos: 361 }] },
      { name: "symbol", symbols: [{ literal: ":", pos: 365 }] },
      { name: "symbol", symbols: [{ literal: ";", pos: 369 }] },
      { name: "symbol", symbols: [{ literal: ">", pos: 373 }] },
      { name: "symbol", symbols: [{ literal: "=", pos: 377 }] },
      { name: "symbol", symbols: [{ literal: "<", pos: 381 }] },
      { name: "symbol", symbols: [{ literal: "?", pos: 385 }] },
      { name: "symbol", symbols: [{ literal: "@", pos: 389 }] },
      { name: "symbol", symbols: [{ literal: "[", pos: 393 }] },
      { name: "symbol", symbols: [{ literal: "\\", pos: 397 }] },
      { name: "symbol", symbols: [{ literal: "]", pos: 401 }] },
      { name: "symbol", symbols: [{ literal: "^", pos: 405 }] },
      { name: "symbol", symbols: [{ literal: "_", pos: 409 }] },
      { name: "symbol", symbols: [{ literal: "`", pos: 413 }] },
      { name: "symbol", symbols: [{ literal: "{", pos: 417 }] },
      { name: "symbol", symbols: [{ literal: "}", pos: 421 }] },
      { name: "symbol", symbols: [{ literal: "~", pos: 425 }] },
      { name: "symbol", symbols: [{ literal: "-", pos: 429 }] },
      { name: "symbol", symbols: [{ literal: "'", pos: 433 }] },
      {
        name: "symbol$string$1",
        symbols: [{ literal: "\\" }, { literal: '"' }],
        postprocess: function joiner(d) {
          return d.join("");
        }
      },
      { name: "symbol", symbols: ["symbol$string$1"], postprocess: id },
      { name: "_+$ebnf$1", symbols: [/[\s]/] },
      {
        name: "_+$ebnf$1",
        symbols: [/[\s]/, "_+$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        }
      },
      {
        name: "_+",
        symbols: ["_+$ebnf$1"],
        postprocess: function(d) {
          return null;
        }
      },
      { name: "_$ebnf$1", symbols: [] },
      {
        name: "_$ebnf$1",
        symbols: [/[\s]/, "_$ebnf$1"],
        postprocess: function arrconcat(d) {
          return [d[0]].concat(d[1]);
        }
      },
      {
        name: "_",
        symbols: ["_$ebnf$1"],
        postprocess: function(d) {
          return null;
        }
      }
    ],
    ParserStart: "bnf"
  };
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
