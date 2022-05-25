import React from "react";
import Product from "./Products/Product";
import CartItem from "./CartItem";
import { useGlobalContext } from "./Context";
const Cart = () => {
  const { cart } = useGlobalContext();
  if (cart.length === 0) {
    return <div>No Product Added</div>;
  }
  return (
    <div>
      {cart.map((item) => {
        return <CartItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default Cart;
