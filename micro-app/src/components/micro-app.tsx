import * as React from 'react';
import { useState } from 'react';

export const MicroApp = () => {
  const [count, setCount] = useState<number>(1);
  const [text, setText] = useState<string>('Lorem ipsum dolor sit amet. ');

  return (
    <>
      <h1>Micro App</h1>
      <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
      </div>
      <div>
        <button onClick={() => setCount(count - 1)}> - </button>
        <button onClick={() => setCount(count + 1)}> + </button>
      </div>
      <div>
        {([...new Array(count)]).map((val, idx) => {
          return (
            <p key={idx}>{text}</p>
          );
        })}
      </div>
    </>
  );
}
