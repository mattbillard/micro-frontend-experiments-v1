import * as React from 'react';
import { useState } from 'react';

export const MicroApp = () => {
  const [rowCount, setRowCount] = useState<number>(5);
  const [colCount, setColCount] = useState<number>(5);
  const [text, setText] = useState<string>('Lorem ipsum dolor sit amet. ');

  return (
    <>
      <h1>Micro App</h1>
      <div>
        &nbsp;&nbsp;
        <button onClick={() => colCount > 0 && setColCount(colCount - 1)}> - </button>
        <button onClick={() => setColCount(colCount + 1)}> + </button>
        <br />
        <button onClick={() => rowCount > 0 && setRowCount(rowCount - 1)}> - </button>
        <br />
        <button onClick={() => setRowCount(rowCount + 1)}> + </button>
      </div>

      <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        <p>
        {([...new Array(rowCount)]).map((val, rowIdx) => {
          return (
            <span key={rowIdx}>{text}</span>
          )
        })}
        </p>
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
    </>
  );
}
