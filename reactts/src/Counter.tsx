import React, { useState } from "react";
import './Counter.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(2);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h1>Counter</h1>
      <h1 className="count">{count}</h1>
      <div className="buttons">
        <button onClick={increase} className="button increase">Increase</button>
        <button onClick={decrease} className="button decrease">Decrease</button>
        <button onClick={resetCount} className="button reset">Reset</button>
      </div>
    </div>
  );
};

export default Counter;
