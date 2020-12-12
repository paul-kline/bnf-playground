const examples = [
  {
    title: "Real Numbers",
    link:
      '?bnf=<real>%20%3A%3A%3D%20<pos>%20%7C%20<neg>%0A<pos>%20%3A%3A%3D%20("0"%20%7C%20%20%5B1-9%5D%20%5B0-9%5D*)%20("."%20%5B0-9%5D%2B%20)%3F%0A<neg>%20%3A%3A%3D%20"-"%20<pos>&name=Real%20Numbers'
  },
  {
    title: "Simple Prog Lang",
    link:
      '?bnf=<program>%20%3A%3A%3D%20<statement>%0A%0A<statement>%20%3A%3A%3D%20<ass_statement>%0A%20%7C%20<while_statement>%0A%20%7C%20<if_statement>%0A%20%7C%20"print("%20<exp>%20")"%0A%20%7C%20<statement>%20"%3B"%20<statement>%0A%0A<ass_statement>%20%3A%3A%3D%20<var>%20"%3A%3D"%20<exp>%0A<while_statement>%20%3A%3A%3D%20"while("%20<b_exp>%20")%7B"%20<statement>%20"%7D"%0A<if_statement>%20%3A%3A%3D%20"if("%20<b_exp>%20")%7B"%20<statement>%20"%7D"%0A%20%7C%20"if("%20<b_exp>%20")%7B"%20<statement>%20"%7D"%0A%20%20%20"else%20%7B"%20<statement>%20"%7D"%0A%20%0A%20%0A<exp>%20%3A%3A%3D%20<b_exp>%20%7C%20<m_exp>%0A%0A%0A<m_exp>%20%3A%3A%3D%20<num>%0A%20%7C%20"("%20<m_exp>%20")"%0A%20%7C%20<m_exp>%20<mop>%20<m_exp>%0A%20%7C%20<var>%0A<num>%20%3A%3A%3D%20%5B0-9%5D%2B%0A<mop>%20%3A%3A%3D%20"%2B"%20%7C%20"-"%20%7C%20"*"%20%7C%20"%2F"%0A<var>%20%3A%3A%3D%20%5Ba-z%5D%2B%0A%0A<b_exp>%20%3A%3A%3D%20<bool>%0A%20%7C%20"("%20<b_exp>%20")"%0A%20%7C%20"!"%20<b_exp>%0A%20%7C%20<b_exp>%20<bop>%20<b_exp>%0A%20%7C%20<var>%0A%20%7C%20<m_exp>%20<eq_op>%20<m_exp>%0A%20%7C%20<b_exp>%20<eq_op>%20<b_exp>%0A%20%7C%20<m_exp>%20<cmp_op>%20<m_exp>%0A<bop>%20%3A%3A%3D%20"%26%26"%20%7C%20"%7C%7C"%0A<bool>%20%3A%3A%3D%20"true"%20%7C%20"false"%0A<eq_op>%20%3A%3A%3D%20"%3D%3D"%20%7C%20"!%3D"%0A<cmp_op>%20%3A%3A%3D%20">"%20%7C%20">%3D"%20%7C%20"<"%20%7C%20"<%3D"%0A%0A&name=Simple%20Programming%20Language'
  },
  {
    title: "Date",
    link:
      '?bnf=<date>%20%3A%3A%3D%20<month>%20"%2F"%20<day>%20"%2F"%20<year>%0A<month>%20%3A%3A%3D%20"1"%20%5B0-2%5D%20%7C%20"0"%20%5B1-9%5D%0A<day>%20%3A%3A%3D%20"0"%20%5B1-9%5D%20%7C%20%5B1-2%5D%20%5B0-9%5D%20%7C%20"3"%20%5B0-1%5D%0A<year>%20%3A%3A%3D%20%5B0-9%5D%20%5B0-9%5D%20%5B0-9%5D%20%5B0-9%5D&name=Date%20Format'
  },
  {
    title: "BNF",
    link:
      '?bnf=%20<syntax>%20%20%20%20%20%20%20%20%20%3A%3A%3D%20<rule>%20%7C%20<rule>%20<syntax>%0A%20<rule>%20%20%20%20%20%20%20%20%20%20%20%3A%3A%3D%20<opt_whitespace>%20"<"%20<rule_name>%20">"%20<opt_whitespace>%20"%3A%3A%3D"%20<opt_whitespace>%20<expression>%20<line_end>%0A%20<opt_whitespace>%20%3A%3A%3D%20"%20"*%0A%20<expression>%20%20%20%20%20%3A%3A%3D%20<list>%20%7C%20<list>%20<opt_whitespace>%20"%7C"%20<opt_whitespace>%20<expression>%0A%20<line_end>%20%20%20%20%20%20%20%3A%3A%3D%20<opt_whitespace>%20"%5Cn"%20%7C%20<line_end>%20<line_end>%0A%20<list>%20%20%20%20%20%20%20%20%20%20%20%3A%3A%3D%20<term>%20%7C%20<term>%20<opt_whitespace>%20<list>%0A%20<term>%20%20%20%20%20%20%20%20%20%20%20%3A%3A%3D%20<literal>%20%7C%20"<"%20<rule_name>%20">"%0A%20<literal>%20%20%20%20%20%20%20%20%3A%3A%3D%20"%60"%20<text>%20"%60"%0A%20<text>%20%20%20%20%20%20%20%20%20%20%3A%3A%3D%20<character>%20<text>%20%7C%20<character>%0A%20<character>%20%20%20%20%20%20%3A%3A%3D%20<letter>%20%7C%20<digit>%0A%20<letter>%20%20%20%20%20%20%20%20%20%3A%3A%3D%20"A"%20%7C%20"B"%20%7C%20"C"%20%7C%20"D"%20%7C%20"E"%20%7C%20"F"%20%7C%20"G"%20%7C%20"H"%20%7C%20"I"%20%7C%20"J"%20%7C%20"K"%20%7C%20"L"%20%7C%20"M"%20%7C%20"N"%20%7C%20"O"%20%7C%20"P"%20%7C%20"Q"%20%7C%20"R"%20%7C%20"S"%20%7C%20"T"%20%7C%20"U"%20%7C%20"V"%20%7C%20"W"%20%7C%20"X"%20%7C%20"Y"%20%7C%20"Z"%20%7C%20"a"%20%7C%20"b"%20%7C%20"c"%20%7C%20"d"%20%7C%20"e"%20%7C%20"f"%20%7C%20"g"%20%7C%20"h"%20%7C%20"i"%20%7C%20"j"%20%7C%20"k"%20%7C%20"l"%20%7C%20"m"%20%7C%20"n"%20%7C%20"o"%20%7C%20"p"%20%7C%20"q"%20%7C%20"r"%20%7C%20"s"%20%7C%20"t"%20%7C%20"u"%20%7C%20"v"%20%7C%20"w"%20%7C%20"x"%20%7C%20"y"%20%7C%20"z"%0A%20<digit>%20%20%20%20%20%20%20%20%20%20%3A%3A%3D%20"0"%20%7C%20"1"%20%7C%20"2"%20%7C%20"3"%20%7C%20"4"%20%7C%20"5"%20%7C%20"6"%20%7C%20"7"%20%7C%20"8"%20%7C%20"9"%0A%20<rule_name>%20%20%20%20%20%20%3A%3A%3D%20<letter>%20%7C%20<rule_name>%20<rule_char>%0A%20<rule_char>%20%20%20%20%20%20%3A%3A%3D%20<letter>%20%7C%20<digit>%20%7C%20"_"&name=BNF%20(from%20Wikipedia)%20with%20Modification'
  }
];
export default examples;
