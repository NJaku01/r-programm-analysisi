import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as py from '@msrvida/python-program-analysis';

import { parse as python3Parse, parser } from './python3';
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
    const code3 = ["if (!uncert) {","  # Compute expected damage. Note that (only) one of the hazard variables can ","  # be passed to the function as a vector.","  modelOutput <- ComputeDamage(he, velocity, duration, sediment, q, ","                  FA, IA, BA, EP, IH, BH, GL, NF, BT, BS, PD, PT, FL, YY, LM, ","                  repVal, up, uncert)","}else if (uncert) {","  # Probabilistic computation. All the hazard variables must be passed to the","  # function as scalars. x=2 }"].join('\n') + '\n';
    console.log(code)

    const code2 = ['if x==2:', '    return 3 == 2', "else:",' return 3'].join('\n') + '\n';
    const test = py.parse(code2)
    console.log(test)
      const test2= python3Parse(code2);
      console.log(test2)
    console.log(RParse(code3))
    // const cfg = new py.ControlFlowGraph(test);
    // console.log(cfg)
    // const analyzer = new py.DataflowAnalyzer();
    // const flows = analyzer.analyze(cfg).dataflows;
    // console.log(flows)
    // const test2= py.slice(test, {items: [{first_line: 6, first_column: 0, last_line: 6, last_column: 8}]})
    // console.log(test2)
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
