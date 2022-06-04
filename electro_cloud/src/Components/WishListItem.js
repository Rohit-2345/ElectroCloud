import React from "react";
import { FaStar, FaShippingFast } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "./Context";
import { ToastContainer, toast } from "react-toastify";

const WishListItem = ({ item }) => {
  const { setWishList, cart, setCart } = useGlobalContext();
  const handleWishList = (id) => {
    console.log("handle wish remove");
    setWishList((oldWishlist) => {
      const newList = oldWishlist.filter((i) => i.id !== id);
      toast.error(`Product Remove Successfully`);
      return newList;
    });
  };

  const handleCart = (item) => {
    toast.success("Product Added to Cart");
    setCart([...cart, item]);
  };

  return (
    <Wrapper>
      <div key={item.id} className="laptop-card">
        <div className="img-content">
          <img
            className="laptop-img"
            src={item.img.split(",")[0]}
            alt={item.name}
          />
        </div>
        <div className="desc-content">
          <h1>{item.name.substring(0, 100)}...</h1>
          <button className="star">
            {item.rating}
            <FaStar style={{ margin: "0px 0px 2px 0px" }} />
          </button>
          <ul>
            {item.desc
              .split(",")
              .filter((v, n) => n < 4)
              .map((info, index) => {
                return (
                  <li key={index}>
                    {info.length > 80 ? (
                      <p>{info.substring(0, 80)}...</p>
                    ) : (
                      <p>{info}</p>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="price-content">
          <h2>₹{item.price}</h2>
          {item.delivery ? (
            <div className="flex">
              <FaShippingFast className="delivery-icon" />
              <span style={{ color: "cornflowerblue", marginLeft: "5px" }}>
                Free Shipping
              </span>
            </div>
          ) : (
            <></>
          )}

          <div className="cart-button">
            <button
              type="button"
              className="remove-wishlist-btn"
              onClick={() => handleWishList(item.id)}
            >
              Remove
            </button>
            <button
              type="button"
              className="add-btn"
              onClick={() => handleCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WishListItem;

const Wrapper = styled.div`
  .laptop-card {
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 5px;
    overflow: hidden;
  }

  .laptop-card:hover h1 {
    color: #2874f0;
  }

  .img-content {
    width: 20%;
  }

  .desc-content {
    width: 65%;
    padding: 5px;
  }

  .desc-content h1 {
    padding-left: 20px;
    font-family: Helvetica;
  }

  .desc-content li p {
    margin-block: 5px;
  }

  .desc-content li::marker {
    color: gray;
  }
  .price-content {
    width: 15%;
    padding: 5px;
  }

  .price-content h2 {
    font-family: Helvetica;
    font-size: xx-large;
  }

  .delivery-icon {
    color: green;
    width: 30px;
    height: 30px;
    margin: 10px 0px 0 10px;
  }
  .laptop-img {
    width: 200px;
    height: 200px;
  }

  h1 {
    font-size: large;
  }

  .wishlist {
    position: relative;
    top: 15px;
    left: 190px;
    width: 25px;
    height: 25px;
    color: gray;
  }

  .wish {
    color: red !important;
  }

  .star {
    border-style: none;
    border-radius: 5px;
    color: white;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 20px;
    margin-left: 20px;
  }

  .cart-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100px;
    justify-content: space-evenly;
  }

  .remove-wishlist-btn {
    color: white;
    background-color: red;
    width: 100px;
    height: 30px;
    border-style: none;
    border-radius: 5px;
  }
`;
