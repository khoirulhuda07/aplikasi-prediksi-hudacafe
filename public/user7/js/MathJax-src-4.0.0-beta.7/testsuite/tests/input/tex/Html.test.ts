import { beforeEach, describe, it } from '@jest/globals';
import { toXmlMatch, setupTex, tex2mml } from '#helpers';
import '#js/input/tex/html/HtmlConfiguration';

beforeEach(() => setupTex(['base', 'html']));

describe('Html', () => {
  it('Html Href Simple', () =>
    toXmlMatch(
      tex2mml('\\href{https://mathjax.org}{a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\href{https://mathjax.org}{a}" display="block">
  <mi data-latex="\\href{https://mathjax.org}{a}" href="https://mathjax.org">a</mi>
</math>`
    ));
  it('Html Href Complex', () =>
    toXmlMatch(
      tex2mml('\\href{https://mathjax.org}{\\frac{a}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\href{https://mathjax.org}{\\frac{a}{b}}" display="block">
  <mfrac data-latex="\\href{https://mathjax.org}{\\frac{a}{b}}" href="https://mathjax.org">
    <mi data-latex="a">a</mi>
    <mi data-latex="b">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Href Inner', () =>
    toXmlMatch(
      tex2mml('\\frac{a}{\\href{https://mathjax.org}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\frac{a}{\\href{https://mathjax.org}{b}}" display="block">
  <mfrac data-latex="\\frac{a}{\\href{https://mathjax.org}{b}}">
    <mi data-latex="a">a</mi>
    <mi data-latex="\\href{https://mathjax.org}{b}" href="https://mathjax.org">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Style Simple', () =>
    toXmlMatch(
      tex2mml('\\style{color:green;background-color:blue}{a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\style{color:green;background-color:blue}{a}" display="block">
  <mi data-latex="\\style{color:green;background-color:blue}{a}" style="color:green;background-color:blue">a</mi>
</math>`
    ));
  it('Html Style Complex', () =>
    toXmlMatch(
      tex2mml('\\style{color:green;background-color:blue}{\\frac{a}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\style{color:green;background-color:blue}{\\frac{a}{b}}" display="block">
  <mfrac data-latex="\\style{color:green;background-color:blue}{\\frac{a}{b}}" style="color:green;background-color:blue">
    <mi data-latex="a">a</mi>
    <mi data-latex="b">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Style Inner', () =>
    toXmlMatch(
      tex2mml('\\frac{a}{\\style{color:green;background-color:blue}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\frac{a}{\\style{color:green;background-color:blue}{b}}" display="block">
  <mfrac data-latex="\\frac{a}{\\style{color:green;background-color:blue}{b}}">
    <mi data-latex="a">a</mi>
    <mi data-latex="\\style{color:green;background-color:blue}{b}" style="color:green;background-color:blue">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Class Simple', () =>
    toXmlMatch(
      tex2mml('\\class{myclass}{a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\class{myclass}{a}" display="block">
  <mi data-latex="\\class{myclass}{a}" class="myclass">a</mi>
</math>`
    ));
  it('Html Class Medium', () =>
    toXmlMatch(
      tex2mml('\\class{myclass}{\\frac{a}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\class{myclass}{\\frac{a}{b}}" display="block">
  <mfrac data-latex="\\class{myclass}{\\frac{a}{b}}" class="myclass">
    <mi data-latex="a">a</mi>
    <mi data-latex="b">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Class Complex', () =>
    toXmlMatch(
      tex2mml('\\frac{a}{\\class{myclass}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\frac{a}{\\class{myclass}{b}}" display="block">
  <mfrac data-latex="\\frac{a}{\\class{myclass}{b}}">
    <mi data-latex="a">a</mi>
    <mi data-latex="\\class{myclass}{b}" class="myclass">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Id Inner', () =>
    toXmlMatch(
      tex2mml('\\cssId{myid-0}{a}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\cssId{myid-0}{a}" display="block">
  <mi data-latex="\\cssId{myid-0}{a}" id="myid-0">a</mi>
</math>`
    ));
  it('Html Id Simple', () =>
    toXmlMatch(
      tex2mml('\\cssId{myid-1}{\\frac{a}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\cssId{myid-1}{\\frac{a}{b}}" display="block">
  <mfrac data-latex="\\cssId{myid-1}{\\frac{a}{b}}" id="myid-1">
    <mi data-latex="a">a</mi>
    <mi data-latex="b">b</mi>
  </mfrac>
</math>`
    ));
  it('Html Id Complex', () =>
    toXmlMatch(
      tex2mml('\\frac{a}{\\cssId{myid-2}{b}}'),
      `<math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\\frac{a}{\\cssId{myid-2}{b}}" display="block">
  <mfrac data-latex="\\frac{a}{\\cssId{myid-2}{b}}">
    <mi data-latex="a">a</mi>
    <mi data-latex="\\cssId{myid-2}{b}" id="myid-2">b</mi>
  </mfrac>
</math>`
    ));
});
