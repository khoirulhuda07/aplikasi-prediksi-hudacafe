import { beforeEach, describe, it } from '@jest/globals';
import { toXmlMatch, setupTex, tex2mml } from '#helpers';
import '#js/input/tex/newcommand/NewcommandConfiguration';
import '#js/input/tex/ams/AmsConfiguration';
import '#js/input/tex/colorv2/ColorV2Configuration';

describe('Newcommand', () => {
  beforeEach(() => setupTex(['base', 'newcommand']));
  it('Newcommand Simple', () =>
    toXmlMatch(
      tex2mml('\\newcommand{\\sum}{2 + 3}\\sum'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newcommand{\\sum}{2 + 3}\\sum" display="block">
  <mn data-latex="2">2</mn>
  <mo data-latex="+">+</mo>
  <mn data-latex="3">3</mn>
</math>`
    ));
  it('Newcommand Arg', () =>
    toXmlMatch(
      tex2mml('\\renewcommand{\\sum}[1]{2 #1 3}\\sum{*}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\renewcommand{\\sum}[1]{2 #1 3}\\sum{*}" display="block">
  <mn data-latex="2">2</mn>
  <mo data-latex="*">&#x2217;</mo>
  <mn data-latex="3">3</mn>
</math>`
    ));
  it('Newcommand Optional', () =>
    toXmlMatch(
      tex2mml('\\renewcommand{\\sum}[1][+]{2 #1 3}\\sum\\sum[*]'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\renewcommand{\\sum}[1][+]{2 #1 3}\\sum\\sum[*]" display="block">
  <mn data-latex="2">2</mn>
  <mo data-latex="+">+</mo>
  <mn data-latex="3">3</mn>
  <mn data-latex="2">2</mn>
  <mo data-latex="*">&#x2217;</mo>
  <mn data-latex="3">3</mn>
</math>`
    ));
  it('Newcommand Arg Optional', () =>
    toXmlMatch(
      tex2mml('\\renewcommand{\\sum}[2][+]{2 #1 3 #2 4}\\sum{+}\\sum[*]{+}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\renewcommand{\\sum}[2][+]{2 #1 3 #2 4}\\sum{+}\\sum[*]{+}" display="block">
  <mn data-latex="2">2</mn>
  <mo data-latex="+">+</mo>
  <mn data-latex="3">3</mn>
  <mo data-latex="+">+</mo>
  <mn data-latex="4">4</mn>
  <mn data-latex="2">2</mn>
  <mo data-latex="*">&#x2217;</mo>
  <mn data-latex="3">3</mn>
  <mo data-latex="+">+</mo>
  <mn data-latex="4">4</mn>
</math>`
    ));
  it('Newenvironment Optional', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{argument}[1][a]{\\textbf{Argument #1:}}{aa}\\begin{argument}[c]b\\end{argument}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{argument}[1][a]{\\textbf{Argument #1:}}{aa}\\begin{argument}[c]b\\end{argument}" display="block">
  <mtext mathvariant="bold" data-latex="\\textbf{Argument c:}">Argument c:</mtext>
  <mi data-latex="b">b</mi>
  <mi data-latex="a">a</mi>
  <mi data-latex="a">a</mi>
</math>`
    ));
  it('Newenvironment Arg Optional', () =>
    toXmlMatch(
      tex2mml(
        '\\renewenvironment{argument}[2][a]{\\textbf{Argument #1(#2):}}{aa}\\begin{argument}[c]{3}b\\end{argument}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\renewenvironment{argument}[2][a]{\\textbf{Argument #1(#2):}}{aa}\\begin{argument}[c]{3}b\\end{argument}" display="block">
  <mtext mathvariant="bold" data-latex="\\textbf{Argument c(3):}">Argument c(3):</mtext>
  <mi data-latex="b">b</mi>
  <mi data-latex="a">a</mi>
  <mi data-latex="a">a</mi>
</math>`
    ));
  it('Def Double Let', () =>
    toXmlMatch(
      tex2mml(
        '\\def\\bar{h}\\let\\fooi\\bar\\def\\fooii{\\bar}\\fooi +\\fooii\\def\\bar{g}\\fooi +\\fooii'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar{h}\\let\\fooi\\bar\\def\\fooii{\\bar}\\fooi +\\fooii\\def\\bar{g}\\fooi +\\fooii" display="block">
  <mi data-latex="h">h</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="\\def\\bar{g}">h</mi>
  <mi data-latex="h">h</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="g">g</mi>
</math>`
    ));
  it('Def ReDef', () =>
    toXmlMatch(
      tex2mml(
        '\\def\\foo{a + b}\\foo\\def\\foo#1{a #1 b}\\foo{-}\\def\\foo#1#2{#2 #1 b}\\foo{-}{x}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\foo{a + b}\\foo\\def\\foo#1{a #1 b}\\foo{-}\\def\\foo#1#2{#2 #1 b}\\foo{-}{x}" display="block">
  <mi data-latex="a">a</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="\\def\\foo#1{a #1 b}">b</mi>
  <mi data-latex="a">a</mi>
  <mo data-latex="-">&#x2212;</mo>
  <mi data-latex="\\def\\foo#1#2{#2 #1 b}">b</mi>
  <mi data-latex="x">x</mi>
  <mo data-latex="-">&#x2212;</mo>
  <mi data-latex="b">b</mi>
</math>`
    ));
  it('Let Brace Equal', () =>
    toXmlMatch(
      tex2mml('\\let\\be={ \\be a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\be={ \\be a}" display="block">
  <mrow data-mjx-texclass="ORD" data-latex="{a}">
    <mi data-latex="a">a</mi>
  </mrow>
</math>`
    ));
  it('Let Brace', () =>
    toXmlMatch(
      tex2mml('\\let\\be{ \\be a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\be{ \\be a}" display="block">
  <mrow data-mjx-texclass="ORD" data-latex="{a}">
    <mi data-latex="a">a</mi>
  </mrow>
</math>`
    ));
  it('Let Caret', () =>
    toXmlMatch(
      tex2mml('\\let\\car^ a\\car b'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\car^ a\\car b" display="block">
  <msup data-latex="^b">
    <mi data-latex="a">a</mi>
    <mi data-latex="b">b</mi>
  </msup>
</math>`
    ));
  it('Let Brace Delim', () =>
    toXmlMatch(
      tex2mml('\\let\\lb=\\{ \\lb \\frac{1}{2} \\}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\lb=\\{ \\lb \\frac{1}{2} \\}" display="block">
  <mo fence="false" stretchy="false" data-latex="\\lb">{</mo>
  <mfrac data-latex="\\frac{1}{2}">
    <mn data-latex="1">1</mn>
    <mn data-latex="2">2</mn>
  </mfrac>
  <mo fence="false" stretchy="false" data-latex="\\}">}</mo>
</math>`
    ));
  it('Let Paren Delim', () =>
    toXmlMatch(
      tex2mml('\\let\\lb( \\lb \\frac{1}{2})'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\lb( \\lb \\frac{1}{2})" display="block">
  <mo fence="false" stretchy="false" data-latex="\\lb">(</mo>
  <mfrac data-latex="\\frac{1}{2}">
    <mn data-latex="1">1</mn>
    <mn data-latex="2">2</mn>
  </mfrac>
  <mo data-latex=")" stretchy="false">)</mo>
</math>`
    ));
  it('Let Relet', () =>
    toXmlMatch(
      tex2mml('\\let\\al\\alpha\\al\\alpha\\let\\al\\aleph\\al\\alpha'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\al\\alpha\\al\\alpha\\let\\al\\aleph\\al\\alpha" display="block">
  <mi data-latex="\\al">&#x3B1;</mi>
  <mi data-latex="\\let\\al\\aleph">&#x3B1;</mi>
  <mi mathvariant="normal" data-latex="\\al">&#x2135;</mi>
  <mi data-latex="\\alpha">&#x3B1;</mi>
</math>`
    ));
  it('Let Let', () =>
    toXmlMatch(
      tex2mml('\\let\\al\\alpha\\al\\alpha\\let\\alpha\\beta\\al\\alpha'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\al\\alpha\\al\\alpha\\let\\alpha\\beta\\al\\alpha" display="block">
  <mi data-latex="\\al">&#x3B1;</mi>
  <mi data-latex="\\let\\alpha\\beta">&#x3B1;</mi>
  <mi data-latex="\\al">&#x3B1;</mi>
  <mi data-latex="\\alpha">&#x3B2;</mi>
</math>`
    ));
  it('Def Let', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#2{#1 + #2}\\bar[a]{b}\\let\\foo\\bar\\foo[c]{d}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#2{#1 + #2}\\bar[a]{b}\\let\\foo\\bar\\foo[c]{d}" display="block">
  <mi data-latex="a">a</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="\\let\\foo\\bar">b</mi>
  <mi data-latex="c">c</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="d">d</mi>
</math>`
    ));
  it('Newcommand Let', () =>
    toXmlMatch(
      tex2mml(
        '\\newcommand{\\bar}[2][1]{#1 + #2}\\bar[a]{b}\\let\\foo\\bar\\foo[c]{d}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newcommand{\\bar}[2][1]{#1 + #2}\\bar[a]{b}\\let\\foo\\bar\\foo[c]{d}" display="block">
  <mi data-latex="a">a</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="\\let\\foo\\bar">b</mi>
  <mi data-latex="c">c</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="d">d</mi>
</math>`
    ));
  it('Let Circular Macro', () =>
    toXmlMatch(
      tex2mml(
        '\\let\\kk\\alpha\\kk\\let\\rr\\beta\\rr\\let\\rr\\kk\\let\\kk\\beta\\kk\\rr'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\kk\\alpha\\kk\\let\\rr\\beta\\rr\\let\\rr\\kk\\let\\kk\\beta\\kk\\rr" display="block">
  <mi data-latex="\\let\\rr\\beta">&#x3B1;</mi>
  <mi data-latex="\\let\\kk\\beta">&#x3B2;</mi>
  <mi data-latex="\\kk">&#x3B2;</mi>
  <mi data-latex="\\rr">&#x3B1;</mi>
</math>`
    ));
  it('Let Brace Equal Stretchy', () =>
    toXmlMatch(
      tex2mml('\\let\\lb=\\{\\left\\lb \\frac{1}{2} \\right\\}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\lb=\\{\\left\\lb \\frac{1}{2} \\right\\}" display="block">
  <mrow data-mjx-texclass="INNER" data-latex-item="\\left\\lb \\frac{1}{2} \\right\\}" data-latex="\\let\\lb=\\{\\left\\lb \\frac{1}{2} \\right\\}">
    <mo data-mjx-texclass="OPEN" data-latex-item="\\left\\lb " data-latex="\\left\\lb ">{</mo>
    <mfrac data-latex="\\frac{1}{2}">
      <mn data-latex="1">1</mn>
      <mn data-latex="2">2</mn>
    </mfrac>
    <mo data-mjx-texclass="CLOSE" data-latex-item="\\right\\}" data-latex="\\right\\}">}</mo>
  </mrow>
</math>`
    ));
  it('Let Paren Stretchy', () =>
    toXmlMatch(
      tex2mml('\\let\\lb( \\left\\lb \\frac{1}{2} \\right)'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\lb( \\left\\lb \\frac{1}{2} \\right)" display="block">
  <mrow data-mjx-texclass="INNER" data-latex-item="\\left\\lb \\frac{1}{2} \\right)" data-latex="\\let\\lb( \\left\\lb \\frac{1}{2} \\right)">
    <mo data-mjx-texclass="OPEN" data-latex-item="\\left\\lb " data-latex="\\left\\lb ">(</mo>
    <mfrac data-latex="\\frac{1}{2}">
      <mn data-latex="1">1</mn>
      <mn data-latex="2">2</mn>
    </mfrac>
    <mo data-mjx-texclass="CLOSE" data-latex-item="\\right)" data-latex="\\right)">)</mo>
  </mrow>
</math>`
    ));
  it('Let Fn', () =>
    toXmlMatch(
      tex2mml('\\let\\ll\\sin\\ll(x)'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\ll\\sin\\ll(x)" display="block">
  <mi data-latex="\\ll">sin</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex=")" stretchy="false">)</mo>
</math>`
    ));
  it('Let Fn Double', () =>
    toXmlMatch(
      tex2mml('\\let\\ll\\sin\\ll(x)\\let\\rr\\ll\\let\\ll\\cos\\rr(x)\\ll(x)'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\ll\\sin\\ll(x)\\let\\rr\\ll\\let\\ll\\cos\\rr(x)\\ll(x)" display="block">
  <mi data-latex="\\ll">sin</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex="\\let\\ll\\cos" stretchy="false">)</mo>
  <mi data-latex="\\rr">sin</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex=")" stretchy="false">)</mo>
  <mi data-latex="\\ll">cos</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex=")" stretchy="false">)</mo>
</math>`
    ));
  it('Let Fn Circular', () =>
    toXmlMatch(
      tex2mml(
        '\\let\\save\\sin\\let\\sin\\cos\\let\\cos\\tan\\let\\tan\\save\\sin(x)\\cos(x)\\tan(x)'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\save\\sin\\let\\sin\\cos\\let\\cos\\tan\\let\\tan\\save\\sin(x)\\cos(x)\\tan(x)" display="block">
  <mi data-latex="\\sin">cos</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex=")" stretchy="false">)</mo>
  <mi data-latex="\\cos">tan</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex=")" stretchy="false">)</mo>
  <mi data-latex="\\tan">sin</mi>
  <mo data-mjx-texclass="NONE">&#x2061;</mo>
  <mo data-latex="(" stretchy="false">(</mo>
  <mi data-latex="x">x</mi>
  <mo data-latex=")" stretchy="false">)</mo>
</math>`
    ));
  it('Let Paren Circular', () =>
    toXmlMatch(
      tex2mml(
        '\\let\\lp(\\let\\rp)\\let\\mp\\rp\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\lp(\\let\\rp)\\let\\mp\\rp\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp" display="block">
  <mrow data-mjx-texclass="INNER" data-latex-item="\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp" data-latex="\\let\\lp(\\let\\rp)\\let\\mp\\rp\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp">
    <mo data-mjx-texclass="OPEN" data-latex-item="\\left\\lp " data-latex="\\left\\lp ">(</mo>
    <mfrac data-latex="\\frac{a}{b}">
      <mi data-latex="a">a</mi>
      <mi data-latex="b">b</mi>
    </mfrac>
    <mrow data-mjx-texclass="CLOSE"></mrow>
    <mo data-latex-item="\\middle\\mp " data-latex="\\middle\\mp ">)</mo>
    <mrow data-mjx-texclass="OPEN" data-latex="\\middle\\mp"></mrow>
    <mi data-latex="c">c</mi>
    <mo data-mjx-texclass="CLOSE" data-latex-item="\\right\\rp" data-latex="\\right\\rp">)</mo>
  </mrow>
</math>`
    ));
  it('Let Angle Circular', () =>
    toXmlMatch(
      tex2mml(
        '\\let\\lp\\langle\\let\\rp\\rangle\\let\\mp\\rp\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\lp\\langle\\let\\rp\\rangle\\let\\mp\\rp\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp" display="block">
  <mrow data-mjx-texclass="INNER" data-latex-item="\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp" data-latex="\\let\\lp\\langle\\let\\rp\\rangle\\let\\mp\\rp\\left\\lp \\frac{a}{b}\\middle\\mp c \\right\\rp">
    <mo data-mjx-texclass="OPEN" data-latex-item="\\left\\lp " data-latex="\\left\\lp ">&#x27E8;</mo>
    <mfrac data-latex="\\frac{a}{b}">
      <mi data-latex="a">a</mi>
      <mi data-latex="b">b</mi>
    </mfrac>
    <mrow data-mjx-texclass="CLOSE"></mrow>
    <mo data-latex-item="\\middle\\mp " data-latex="\\middle\\mp ">&#x27E9;</mo>
    <mrow data-mjx-texclass="OPEN" data-latex="\\middle\\mp"></mrow>
    <mi data-latex="c">c</mi>
    <mo data-mjx-texclass="CLOSE" data-latex-item="\\right\\rp" data-latex="\\right\\rp">&#x27E9;</mo>
  </mrow>
</math>`
    ));
  it('Let Circular Character', () =>
    toXmlMatch(
      tex2mml(
        '\\let\\a a\\let\\b b\\a \\b\\let\\c\\a\\let\\a c\\c \\a\\let\\d=\\c\\let\\c\\b\\d \\c'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\a a\\let\\b b\\a \\b\\let\\c\\a\\let\\a c\\c \\a\\let\\d=\\c\\let\\c\\b\\d \\c" display="block">
  <mi data-latex="a">a</mi>
  <mi data-latex="\\let\\a c">b</mi>
  <mi data-latex="a">a</mi>
  <mi data-latex="\\let\\c\\b">c</mi>
  <mi data-latex="a">a</mi>
  <mi data-latex="b">b</mi>
</math>`
    ));
  it('Let Overwrite Sqrt Choose', () =>
    toXmlMatch(
      tex2mml('\\let\\sqrt\\choose a\\sqrt b'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\sqrt\\choose a\\sqrt b" display="block">
  <mrow data-mjx-texclass="ORD" data-latex-item="\\sqrt" data-latex="\\let\\sqrt\\choose a\\sqrt b">
    <mrow data-mjx-texclass="OPEN" data-latex="\\biggl (">
      <mo minsize="2.047em" maxsize="2.047em">(</mo>
    </mrow>
    <mfrac linethickness="0">
      <mi data-latex="a">a</mi>
      <mi data-latex="b">b</mi>
    </mfrac>
    <mrow data-mjx-texclass="CLOSE" data-latex="\\biggr )">
      <mo minsize="2.047em" maxsize="2.047em">)</mo>
    </mrow>
  </mrow>
</math>`
    ));
  it('Def Optional Brace', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#2{#1 + #2}\\bar[{a}]{b}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#2{#1 + #2}\\bar[{a}]{b}" display="block">
  <mi data-latex="a">a</mi>
  <mo data-latex="+">+</mo>
  <mi data-latex="b">b</mi>
</math>`
    ));
  it('Def Options CS', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#2{#1 + #2}\\bar[\\sqrt{2}]{b}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#2{#1 + #2}\\bar[\\sqrt{2}]{b}" display="block">
  <msqrt data-latex="\\sqrt{2}">
    <mn data-latex="2">2</mn>
  </msqrt>
  <mo data-latex="+">+</mo>
  <mi data-latex="b">b</mi>
</math>`
    ));
});

describe('Newcommand Color v2', () => {
  beforeEach(() => setupTex(['base', 'newcommand', 'colorv2']));
  it('Newenvironment Empty', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\begin{myHeartEnv}\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\begin{myHeartEnv}\\end{myHeartEnv}" display="block">
  <mstyle mathcolor="purple" data-latex="\\color{purple}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="green" data-latex="\\color{green}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mtext data-latex="\\text{ forever}">&#xA0;forever</mtext>
</math>`
    ));
  it('Newenvironment Content', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\begin{myHeartEnv}  2+3\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\begin{myHeartEnv}  2+3\\end{myHeartEnv}" display="block">
  <mstyle mathcolor="purple" data-latex="\\color{purple}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="green" data-latex="\\color{green}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mn data-latex="2">2</mn>
  <mo data-latex="+">+</mo>
  <mn data-latex="3">3</mn>
  <mtext data-latex="\\text{ forever}">&#xA0;forever</mtext>
</math>`
    ));
  it('Newenvironment Nested Double', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\end{yourHeartEnv}\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\end{yourHeartEnv}\\end{myHeartEnv}" display="block">
  <mstyle mathcolor="purple" data-latex="\\color{purple}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="green" data-latex="\\color{green}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="a">a</mi>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mtext data-latex="\\text{ forever}">&#xA0;forever</mtext>
</math>`
    ));
  it('Newenvironment Nested Double 2', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\end{yourHeartEnv}\\begin{theirHeartEnv}b\\end{theirHeartEnv}\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\end{yourHeartEnv}\\begin{theirHeartEnv}b\\end{theirHeartEnv}\\end{myHeartEnv}" display="block">
  <mstyle mathcolor="purple" data-latex="\\color{purple}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="green" data-latex="\\color{green}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="a">a</mi>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="b">b</mi>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mtext data-latex="\\text{ forever}">&#xA0;forever</mtext>
</math>`
    ));
  it('Newenvironment Nested Triple', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\begin{theirHeartEnv}b\\end{theirHeartEnv}\\end{yourHeartEnv}\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\begin{theirHeartEnv}b\\end{theirHeartEnv}\\end{yourHeartEnv}\\end{myHeartEnv}" display="block">
  <mstyle mathcolor="purple" data-latex="\\color{purple}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="green" data-latex="\\color{green}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="a">a</mi>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="b">b</mi>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mtext data-latex="\\text{ forever}">&#xA0;forever</mtext>
</math>`
    ));
  it('Newenvironment Nested Triple Text', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\begin{theirHeartEnv}b\\end{theirHeartEnv}c\\end{yourHeartEnv}d\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\begin{theirHeartEnv}b\\end{theirHeartEnv}c\\end{yourHeartEnv}d\\end{myHeartEnv}" display="block">
  <mstyle mathcolor="purple" data-latex="\\color{purple}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="green" data-latex="\\color{green}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="a">a</mi>
  <mstyle mathcolor="blue" data-latex="\\color{blue}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mspace width="-2.5pt" linebreak="nobreak" data-latex="\\kern-2.5pt"></mspace>
  <mstyle mathcolor="black" data-latex="\\color{black}{\\heartsuit}">
    <mi mathvariant="normal" data-latex="\\heartsuit">&#x2661;</mi>
  </mstyle>
  <mi data-latex="b">b</mi>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mi data-latex="c">c</mi>
  <mtext data-latex="\\text{ never}">&#xA0;never</mtext>
  <mi data-latex="d">d</mi>
  <mtext data-latex="\\text{ forever}">&#xA0;forever</mtext>
</math>`
    ));
  it('Newenvironment Nested Error', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\begin{theirHeartEnv}b\\end{yourHeartEnv}\\end{theirHeartEnv}\\end{myHeartEnv}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{myHeartEnv}{\\color{purple}{\\heartsuit}\\kern-2.5pt\\color{green}{\\heartsuit}}{\\text{ forever}}\\newenvironment{yourHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\newenvironment{theirHeartEnv}{\\color{blue}{\\heartsuit}\\kern-2.5pt\\color{black}{\\heartsuit}}{\\text{ never}}\\begin{myHeartEnv}\\begin{yourHeartEnv}a\\begin{theirHeartEnv}b\\end{yourHeartEnv}\\end{theirHeartEnv}\\end{myHeartEnv}" display="block">
  <merror data-mjx-error="\\begin{theirHeartEnv} ended with \\end{yourHeartEnv}">
    <mtext>\\begin{theirHeartEnv} ended with \\end{yourHeartEnv}</mtext>
  </merror>
</math>`
    ));
});

describe('Newcommand Ams', () => {
  beforeEach(() => setupTex(['base', 'newcommand', 'ams']));
  it('Newenvironment Align', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{proof}{\\textbf{Proof:}}{\\begin{align} \\blacksquare \\end{align}}\\begin{proof}a=b\\end{proof}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{proof}{\\textbf{Proof:}}{\\begin{align} \\blacksquare \\end{align}}\\begin{proof}a=b\\end{proof}" display="block">
  <merror data-mjx-error="Erroneous nesting of equation structures">
    <mtext>Erroneous nesting of equation structures</mtext>
  </merror>
</math>`
    ));
  it('Newenvironment Align End', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{proof}{\\begin{align}\\textbf{Proof:}}{\\end{align}}\\begin{proof}a=b\\end{proof}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{proof}{\\begin{align}\\textbf{Proof:}}{\\end{align}}\\begin{proof}a=b\\end{proof}" display="block">
  <merror data-mjx-error="Erroneous nesting of equation structures">
    <mtext>Erroneous nesting of equation structures</mtext>
  </merror>
</math>`
    ));
  it('Newenvironment Align Split', () =>
    toXmlMatch(
      tex2mml(
        '\\newenvironment{proof}{\\begin{align}\\textbf{Proof:}&}{ \\begin{split} 5 \\end{split}&& \\blacksquare\\end{align}}\\begin{proof}a&=b\\end{proof}'
      ),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{proof}{\\begin{align}\\textbf{Proof:}&amp;}{ \\begin{split} 5 \\end{split}&amp;&amp; \\blacksquare\\end{align}}\\begin{proof}a&amp;=b\\end{proof}" display="block">
  <merror data-mjx-error="Erroneous nesting of equation structures">
    <mtext>Erroneous nesting of equation structures</mtext>
  </merror>
</math>`
    ));
  it('Let Bar', () =>
    toXmlMatch(
      tex2mml('\\let\\b\\lvert\\let\\lvert\\langle\\vert\\b\\lvert'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\b\\lvert\\let\\lvert\\langle\\vert\\b\\lvert" display="block">
  <mo data-mjx-texclass="ORD" fence="false" stretchy="false" data-latex="\\vert">|</mo>
  <mo data-mjx-texclass="OPEN" fence="false" stretchy="false" data-latex="\\b">|</mo>
  <mo fence="false" stretchy="false" data-latex="\\lvert">&#x27E8;</mo>
</math>`
    ));
  it('Let Bar Stretchy', () =>
    toXmlMatch(
      tex2mml('\\let\\b\\lvert\\let\\lvert\\langle\\left\\b q \\right\\lvert'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\b\\lvert\\let\\lvert\\langle\\left\\b q \\right\\lvert" display="block">
  <mrow data-mjx-texclass="INNER" data-latex-item="\\left\\b q \\right\\lvert" data-latex="\\let\\b\\lvert\\let\\lvert\\langle\\left\\b q \\right\\lvert">
    <mo data-mjx-texclass="OPEN" data-latex-item="\\left\\b " data-latex="\\left\\b ">|</mo>
    <mi data-latex="q">q</mi>
    <mo data-mjx-texclass="CLOSE" data-latex-item="\\right\\lvert" data-latex="\\right\\lvert">&#x27E8;</mo>
  </mrow>
</math>`
    ));
});

describe('NewcommandError', () => {
  beforeEach(() => setupTex(['base', 'newcommand']));
  it('No Sequence', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#3{}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#3{}" display="block">
  <merror data-mjx-error="Parameters for \\bar must be numbered sequentially">
    <mtext>Parameters for \\bar must be numbered sequentially</mtext>
  </merror>
</math>`
    ));
  it('No CS', () =>
    toXmlMatch(
      tex2mml('\\def{\\bar}[#1]#2{}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def{\\bar}[#1]#2{}" display="block">
  <merror data-mjx-error="\\def must be followed by a control sequence">
    <mtext>\\def must be followed by a control sequence</mtext>
  </merror>
</math>`
    ));
  it('Illegal Hash', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[##1]#2{#1}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[##1]#2{#1}" display="block">
  <merror data-mjx-error="Illegal use of # in template for \\bar">
    <mtext>Illegal use of # in template for \\bar</mtext>
  </merror>
</math>`
    ));
  it('No Replacement', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#2'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#2" display="block">
  <merror data-mjx-error="Missing replacement string for definition of \\def">
    <mtext>Missing replacement string for definition of \\def</mtext>
  </merror>
</math>`
    ));
  it('Runaway Argument', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#2{}\\bar['),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#2{}\\bar[" display="block">
  <merror data-mjx-error="Runaway argument for \\bar?">
    <mtext>Runaway argument for \\bar?</mtext>
  </merror>
</math>`
    ));
  it('Illegal CS', () =>
    toXmlMatch(
      tex2mml('\\newcommand{\\11}{a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newcommand{\\11}{a}" display="block">
  <merror data-mjx-error="Illegal control sequence name for \\newcommand">
    <mtext>Illegal control sequence name for \\newcommand</mtext>
  </merror>
</math>`
    ));
  it('Illegal Parameter Number', () =>
    toXmlMatch(
      tex2mml('\\newenvironment{hh}[a]{}{}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newenvironment{hh}[a]{}{}" display="block">
  <merror data-mjx-error="Illegal number of parameters specified in \\newenvironment">
    <mtext>Illegal number of parameters specified in \\newenvironment</mtext>
  </merror>
</math>`
    ));
  it('Let Undefined CS', () =>
    toXmlMatch(
      tex2mml('\\let\\aa\\bb \\aa'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\aa\\bb \\aa" display="block">
  <merror data-mjx-error="Undefined control sequence \\aa">
    <mtext>Undefined control sequence \\aa</mtext>
  </merror>
</math>`
    ));
  it('Missing Arguments', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[#1]#2#3{c + c}\\bar'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[#1]#2#3{c + c}\\bar" display="block">
  <merror data-mjx-error="Use of \\bar doesn\'t match its definition">
    <mtext>Use of \\bar doesn\'t match its definition</mtext>
  </merror>
</math>`
    ));
  it('Single Let Error', () =>
    toXmlMatch(
      tex2mml('\\let\\aa\\textbf\\let\\bb\\aa\\aa'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\aa\\textbf\\let\\bb\\aa\\aa" display="block">
  <merror data-mjx-error="Missing argument for \\aa">
    <mtext>Missing argument for \\aa</mtext>
  </merror>
</math>`
    ));
  it('Double Let Error', () =>
    toXmlMatch(
      tex2mml('\\let\\aa\\textbf\\let\\bb\\aa\\bb'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\aa\\textbf\\let\\bb\\aa\\bb" display="block">
  <merror data-mjx-error="Missing argument for \\bb">
    <mtext>Missing argument for \\bb</mtext>
  </merror>
</math>`
    ));
  it('Triple Let Error', () =>
    toXmlMatch(
      tex2mml('\\let\\aa\\textbf\\let\\bb\\aa\\let\\textbf\\sqrt\\textbf[1]'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\let\\aa\\textbf\\let\\bb\\aa\\let\\textbf\\sqrt\\textbf[1]" display="block">
  <merror data-mjx-error="Missing argument for \\textbf">
    <mtext>Missing argument for \\textbf</mtext>
  </merror>
</math>`
    ));
  it('Illegal Argument Number', () =>
    toXmlMatch(
      tex2mml('\\newcommand{\\foo}[a]{#1 + #2}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\newcommand{\\foo}[a]{#1 + #2}" display="block">
  <merror data-mjx-error="Illegal number of parameters specified in \\newcommand">
    <mtext>Illegal number of parameters specified in \\newcommand</mtext>
  </merror>
</math>`
    ));
  it('Optional Brace Error', () =>
    toXmlMatch(
      tex2mml('\\def\\bar[{#1}]#2{#1 + #2}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\def\\bar[{#1}]#2{#1 + #2}" display="block">
  <merror data-mjx-error="You can\'t use \'macro parameter character #\' in math mode">
    <mtext>You can\'t use \'macro parameter character #\' in math mode</mtext>
  </merror>
</math>`
    ));
});
