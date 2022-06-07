import React from "react";

const Checkout = () => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <div>
      {arr.map((n) => (
        <h1>{n}</h1>
      ))}
    </div>
  );
};

export default Checkout;
