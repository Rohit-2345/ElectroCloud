import React, { useState } from "react";

const Order = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => setValue(value - 1)}>
        Minus
      </button>
      <h1>{value}</h1>
      <button type="button" onClick={() => setValue(value + 1)}>
        Add
      </button>
    </div>
  );
};

export default Order;
