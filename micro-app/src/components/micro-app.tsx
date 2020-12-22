import * as React from 'react';
import { useState } from 'react';

export const MicroApp = () => {
  const [rowCount, setRowCount] = useState<number>(10);
  const [colCount, setColCount] = useState<number>(10);
  // const [text, setText] = useState<string>('Lorem ipsum dolor sit amet. ');

  return (
    <>
      <h1>Micro App</h1>
      {/* <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      </div> */}
      <div>
        &nbsp;&nbsp;
        <button onClick={() => setColCount(colCount - 1)}> - </button>
        <button onClick={() => setColCount(colCount + 1)}> + </button>
        <br />
        <button onClick={() => setRowCount(rowCount - 1)}> - </button>
        <br />
        <button onClick={() => setRowCount(rowCount + 1)}> + </button>
      </div>
      <table>
        <tbody>
          {([...new Array(rowCount)]).map((val, rowIdx) => {
            return (
              <tr key={rowIdx}>
                {([...new Array(colCount)]).map((val, colIdx) => {
                  return (
                    <td key={colIdx}> xxxxx </td>
                  );
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <div>
        {([...new Array(rowCount)]).map((val, idx) => {
          return (
            <p key={idx}>{text}</p>
          );
        })}
      </div> */}
    </>
  );
}
