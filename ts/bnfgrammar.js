// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "bnf", "symbols": ["rule"]},
    {"name": "bnf", "symbols": ["rule", "multinewline", "bnf"]},
    {"name": "multinewline$ebnf$1", "symbols": [{"literal":"\n","pos":18}]},
    {"name": "multinewline$ebnf$1", "symbols": [{"literal":"\n","pos":18}, "multinewline$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "multinewline", "symbols": ["multinewline$ebnf$1"], "postprocess":  function(d) {
        return {
                 type : "newline",
                 value : "\n"
               };
        } 
        },
    {"name": "rule$string$1", "symbols": [{"literal":":"}, {"literal":":"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rule", "symbols": ["nonterminal", "_+", "rule$string$1", "_+", "rulebody"], "postprocess":  function(d) {
        return {
                 type : "rule",
                 value : {nonterminal : d[0],
                          rulebody : d[4]
                         }
               };
        } 
        },
    {"name": "rule", "symbols": ["comment"]},
    {"name": "nonterminal", "symbols": [{"literal":"<","pos":47}, "ident", {"literal":">","pos":51}], "postprocess":  function(d) {
        return {
                 type : "nonterminal",
                 value : d[1]
               };
        } 
        },
    {"name": "ident$ebnf$1$subexpression$1", "symbols": [/[a-zA-Z_]/]},
    {"name": "ident$ebnf$1$subexpression$1", "symbols": [/[0-9]/]},
    {"name": "ident$ebnf$1", "symbols": ["ident$ebnf$1$subexpression$1"]},
    {"name": "ident$ebnf$1$subexpression$2", "symbols": [/[a-zA-Z_]/]},
    {"name": "ident$ebnf$1$subexpression$2", "symbols": [/[0-9]/]},
    {"name": "ident$ebnf$1", "symbols": ["ident$ebnf$1$subexpression$2", "ident$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "ident", "symbols": ["ident$ebnf$1"], "postprocess":  function(d) { 
        return  {
           type : "ident",
           value : d[0].join("") 
        }
        } },
    {"name": "rulebody", "symbols": ["rb2"]},
    {"name": "comment$string$1", "symbols": [{"literal":"/"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment$ebnf$1", "symbols": []},
    {"name": "comment$ebnf$1$subexpression$1", "symbols": [/./]},
    {"name": "comment$ebnf$1$subexpression$1", "symbols": [{"literal":"\n","pos":86}]},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1$subexpression$1", "comment$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "comment$string$2", "symbols": [{"literal":"*"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment", "symbols": ["comment$string$1", "comment$ebnf$1", "comment$string$2"], "postprocess":  function(d){
        return {
                type : "comment",
                value : d[1].join("")
        
            }
        }
        },
    {"name": "rb2", "symbols": ["rb2", "_+", "t"]},
    {"name": "rb2", "symbols": ["rb2", "_+", {"literal":"|","pos":110}, "_+", "t"]},
    {"name": "rb2", "symbols": ["t"]},
    {"name": "t", "symbols": ["t2", "wesym"]},
    {"name": "t", "symbols": ["t2"]},
    {"name": "t2", "symbols": ["term"]},
    {"name": "t2", "symbols": [{"literal":"(","pos":140}, "_", "rb2", "_", {"literal":")","pos":148}]},
    {"name": "wesym", "symbols": ["esym"], "postprocess":  function(d) {
        return {
                 type : "esym", 
                 value : d[0]
               };
        } 
        },
    {"name": "esym", "symbols": [{"literal":"+","pos":162}], "postprocess": id},
    {"name": "esym", "symbols": [{"literal":"?","pos":167}], "postprocess": id},
    {"name": "esym", "symbols": [{"literal":"*","pos":172}], "postprocess": id},
    {"name": "term", "symbols": ["nonterminal"], "postprocess": id},
    {"name": "term", "symbols": ["terminal"], "postprocess": id},
    {"name": "terminal", "symbols": ["terminalstr"], "postprocess":  function(d) {
        return {
                 type : "terminal", 
                 value : d[0]
               };
        } 
        },
    {"name": "terminal", "symbols": ["regex"], "postprocess":  function(d) {
        return {
                 type : "terminal",
                 value : d[0]
               };
        } 
        },
    {"name": "terminalstr$ebnf$1", "symbols": ["validterminal"]},
    {"name": "terminalstr$ebnf$1", "symbols": ["validterminal", "terminalstr$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "terminalstr", "symbols": [{"literal":"\"","pos":208}, "terminalstr$ebnf$1", {"literal":"\"","pos":213}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "regex", "symbols": [{"literal":"[","pos":223}, "range", {"literal":"]","pos":227}], "postprocess":  function(d) {return {
        type : "regex",
        value : d.join("")
         } 
        } },
    {"name": "range", "symbols": ["numrange"]},
    {"name": "range", "symbols": ["letterrange"], "postprocess": id},
    {"name": "numrange", "symbols": ["digit", {"literal":"-","pos":249}, "digit"], "postprocess": function(d) {return d.join(""); }},
    {"name": "letterrange", "symbols": ["letter", {"literal":"-","pos":261}, "letter"], "postprocess": function(d) {return d.join(""); }},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "letter", "symbols": [/[a-zA-Z]/], "postprocess": id},
    {"name": "validterminal", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "validterminal", "symbols": ["symbol"], "postprocess": id},
    {"name": "symbol", "symbols": [{"literal":"|","pos":299}]},
    {"name": "symbol", "symbols": [{"literal":" ","pos":303}]},
    {"name": "symbol", "symbols": [{"literal":"-","pos":307}]},
    {"name": "symbol", "symbols": [{"literal":"!","pos":311}]},
    {"name": "symbol", "symbols": [{"literal":"#","pos":315}]},
    {"name": "symbol", "symbols": [{"literal":"$","pos":319}]},
    {"name": "symbol", "symbols": [{"literal":"%","pos":323}]},
    {"name": "symbol", "symbols": [{"literal":"&","pos":327}]},
    {"name": "symbol", "symbols": [{"literal":"(","pos":331}]},
    {"name": "symbol", "symbols": [{"literal":")","pos":335}]},
    {"name": "symbol", "symbols": [{"literal":"*","pos":339}]},
    {"name": "symbol", "symbols": [{"literal":"+","pos":343}]},
    {"name": "symbol", "symbols": [{"literal":",","pos":347}]},
    {"name": "symbol", "symbols": [{"literal":"-","pos":351}]},
    {"name": "symbol", "symbols": [{"literal":".","pos":355}]},
    {"name": "symbol", "symbols": [{"literal":"/","pos":359}]},
    {"name": "symbol", "symbols": [{"literal":":","pos":363}]},
    {"name": "symbol", "symbols": [{"literal":";","pos":367}]},
    {"name": "symbol", "symbols": [{"literal":">","pos":371}]},
    {"name": "symbol", "symbols": [{"literal":"=","pos":375}]},
    {"name": "symbol", "symbols": [{"literal":"<","pos":379}]},
    {"name": "symbol", "symbols": [{"literal":"?","pos":383}]},
    {"name": "symbol", "symbols": [{"literal":"@","pos":387}]},
    {"name": "symbol", "symbols": [{"literal":"[","pos":391}]},
    {"name": "symbol", "symbols": [{"literal":"\\","pos":395}]},
    {"name": "symbol", "symbols": [{"literal":"]","pos":399}]},
    {"name": "symbol", "symbols": [{"literal":"^","pos":403}]},
    {"name": "symbol", "symbols": [{"literal":"_","pos":407}]},
    {"name": "symbol", "symbols": [{"literal":"`","pos":411}]},
    {"name": "symbol", "symbols": [{"literal":"{","pos":415}]},
    {"name": "symbol", "symbols": [{"literal":"}","pos":419}]},
    {"name": "symbol", "symbols": [{"literal":"~","pos":423}]},
    {"name": "symbol", "symbols": [{"literal":"-","pos":427}]},
    {"name": "symbol", "symbols": [{"literal":"'","pos":431}]},
    {"name": "symbol$string$1", "symbols": [{"literal":"\\"}, {"literal":"\""}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "symbol", "symbols": ["symbol$string$1"], "postprocess": id},
    {"name": "_+$ebnf$1", "symbols": [/[\s]/]},
    {"name": "_+$ebnf$1", "symbols": [/[\s]/, "_+$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_+", "symbols": ["_+$ebnf$1"], "postprocess": function(d) {return null }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": [/[\s]/, "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "bnf"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
