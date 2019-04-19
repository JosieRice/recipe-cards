import * as React from 'react';
import { useState } from 'react';

export const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(110);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}