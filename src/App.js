import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as py from '@msrvida/python-program-analysis';

import { parse as python3Parse, parser } from './python3';
import {DataflowAnalyzer} from './es6/data-flow'
import {ControlFlowGraph} from './es6/control-flow'
import {slice} from './es6/slice'
import { parse as RParse } from './R';
import code1 from './code'

/**
 * Reset the lexer state after an error. Otherwise, parses after a failed parse can fail too.
 */
let yy = parser.yy;
let oldParseError = yy.parseError;

function App() {

  const [content, setContent] = React.useState("test")

  const parse = () => {
    const code = code1.join('\n') + '\n';
    const code3 = ["test(a$b) "].join('\n') + '\n';
    console.log(code)

    const code2 = ['def test(x, y):', '    return 3 == 2', "x = 1",'y=3', 'x=test(x,y)'].join('\n') + '\n';
    const test = py.parse(code2)
    console.log(test)
      //const test2= python3Parse(code2);
      //console.log(test2)
    const codeJSON= RParse(code)
    console.log(codeJSON)
    // const cfg = new ControlFlowGraph(codeJSON);
    //  console.log(cfg)
    // const analyzer = new py.DataflowAnalyzer();
    //   var analyzer2 = new DataflowAnalyzer();
    //   const flows = analyzer2.analyze(cfg);
    //   console.log(flows)
    const test5= slice(codeJSON, {items: [{first_line: 413, first_column: 0, last_line: 413, last_column: 27}]})
    console.log(test5)
    // const test5= slice(codeJSON, {items: [{first_line: 17, first_column: 0, last_line: 17, last_column: 13}]})
    // console.log(test5)
    const test6= slice(test, {items: [{first_line: 5, first_column: 0, last_line: 15, last_column: 11}]})
    console.log(test6)
    // const test3 = py.printNode(test2)
    // console.log(test3)
    // setContent(test3)
  }


  const angle = (lat1, long1, lat2, long2) => {
    const dLon = (long2 - long1);

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
      * Math.cos(lat2) * Math.cos(dLon);

    let brng = Math.atan2(y, x);

    brng = radians_to_degrees(brng);
    brng = (brng + 360) % 360;
    brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

    console.log(brng);
  }

  function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
  }
  return (
    <div>
      <p>{content}</p>
      <button onClick={() => parse()}> parse </button>
    </div>
  );
}

export default App;
