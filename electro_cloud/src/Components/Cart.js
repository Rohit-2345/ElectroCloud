import React from "react";
import Product from "./Products/Product";
import CartItem from "./CartItem";
import ecimage from "../Images/electro.png";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "./Context";
const Cart = () => {
  const { cart } = useGlobalContext();
  if (cart.length === 0) {
    return (
      <div className="loading">
        {/* <img scr={ecimage} alt="Logo" className="logo-img" /> */}
        <h1>
          No Product Added to Cart{" "}
          <FaShoppingCart style={{ color: "darkviolet" }} />{" "}
        </h1>
      </div>
    );
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
