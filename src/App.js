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
    const code3 = ["if(test) {x =3 } else { x= 4} call(test)"].join('\n') + '\n';
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
    const test5= slice(codeJSON, {items: [{first_line: 400, first_column: 0, last_line: 400, last_column: 27}]})
    console.log(test5)
    handleAlogrithmusErrors(codeJSON.code,test5.items)
    // const test5= slice(codeJSON, {items: [{first_line: 17, first_column: 0, last_line: 17, last_column: 13}]})
    // console.log(test5)
    //const test6= slice(test, {items: [{first_line: 5, first_column: 0, last_line: 15, last_column: 11}]})
    // console.log(test6)
    // const test3 = py.printNode(test2)
    // console.log(test3)
    // setContent(test3)
  }

  const handleAlogrithmusErrors = (code, codelines) => {
    for(var codeItem  of code){
      switch (codeItem.type){
        case "call" : {
            if(codeItem.func.id == "par"){
              codelines.push(codeItem.location)
            }
            break;
        }
        case "if" : {
          for(var line of codelines){
            if(line.first_line > codeItem.location.first_line && line.last_line < codeItem.location.last_line){
              codelines.push(codeItem.location);
              break;
            }
          }
        }
        case "import": {
            codelines.push(codeItem.location)
        }
        }
      }
      optimizeCodelines(codelines);
    }

    const optimizeCodelines = (codelines)=> {
      codelines.sort(function(a,b){
        return a.first_line - b.first_line;
      })
      for(var i=0; i<codelines.length-1; i++){
        if(codelines[i].first_line <= codelines[i+1].first_line && codelines[i].last_line >= codelines[i+1].last_line){
          codelines.splice(i+1, 1)
          i--;
        }
        else if(codelines[i].last_line === codelines[i+1].first_line || codelines[i].last_line+1 === codelines[i+1].first_line){
          console.log(i);
          codelines.splice(i,2, {first_line: codelines[i].first_line, last_line: codelines[i+1].last_line});
          i--;
        }
      }

      console.log(codelines)
    }
  

  return (
    <div>
      <button onClick={() => parse()}> parse </button>
    </div>
  );
}

export default App;
