bnf -> rule | rule multinewline bnf

multinewline -> "\n":+ {% function(d) {
    return {
             type : "newline",
             value : "\n"
           };
    } 
%}

rule -> nonterminal _+ "::=" _+ rulebody {% function(d) {
    return {
             type : "rule",
             value : {nonterminal : d[0],
                      rulebody : d[4]
                     }
           };
    } 
%} | comment

nonterminal -> "<" ident ">"  {% function(d) {
    return {
             type : "nonterminal",
             value : d[1]
           };
    } 
%}

ident -> ([a-zA-Z_] | [0-9] ):+ {% function(d) { 
  return  {
     type : "ident",
     value : d[0].join("") 
  }
  } %}

rulebody -> rb2

comment -> "/*" .:* "*/" {% function(d){
    return {
            type : "comment",
            value : d[1].join("")

        }
    }
    %}

rb2 -> rb2 _+ t | rb2 _+ "|" _+   t | t
t -> t2 wesym | t2 
t2 -> term | "(" _ rb2 _ ")"


wesym -> esym  {% function(d) {
    return {
             type : "esym", 
             value : d[0]
           };
    } 
%}
esym -> "+" {% id %}| "?" {% id %}| "*"  {% id %}

term -> nonterminal {% id %} | terminal {% id %}

terminal -> terminalstr {% function(d) {
    return {
             type : "terminal", 
             value : d[0]
           };
    } 
%} | regex  {% function(d) {
    return {
             type : "terminal",
             value : d[0]
           };
    } 
%} 

terminalstr -> "\"" validterminal:+  "\"" {% function(d) {return d[1].join(""); } %} #| "'" (validterminal  ):+  "'" {% function(d) {return d[1].join(""); } %}

regex -> "[" range "]"  {% function(d) {return {
    type : "regex",
    value : d.join("")
     } 
    } %}

range -> numrange | letterrange  {% id %}

numrange -> digit "-" digit  {% function(d) {return d.join(""); } %}

letterrange -> letter "-" letter  {% function(d) {return d.join(""); } %}

digit -> [0-9]  {% id %}

letter -> [a-zA-Z]  {% id %}

validterminal -> [a-zA-Z0-9] | symbol  {% id %}

symbol ->  "|" | " " | "-" | "!" | "#" | "$" | "%" 
| "&" | "(" | ")" | "*" | "+" | "," | "-" | "." 
| "/" | ":" | ";" | ">" | "=" | "<" | "?" | "@" 
| "[" | "\\" | "]" | "^" | "_" | "`" | "{" | "}" | "~" | "-" | "'"  {% id %}

_+ -> [\s]:+     {% function(d) {return null } %}

_ -> [\s]:*     {% function(d) {return null } %}