import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaShippingFast } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { ToastContainer, toast } from "react-toastify";

const Product = ({ item, checkout }) => {
  const { wishList, setWishList, setCart, isLogin, setOpenLoginPage } =
    useGlobalContext();
  const [isWishlist, setIsWishlist] = useState(false);
  const navigate = useNavigate();
  const handleWishList = (item) => {
    if (!isLogin) {
      // alert("please login first");
      setOpenLoginPage(true);
      navigate("/Login");
    } else {
      if (!isWishlist) {
        setIsWishlist(true);
        toast.success("Product Added To WishList");
        setWishList((oldWishList) => {
          return [...oldWishList, item];
        });
      } else {
        setIsWishlist(false);
        toast.error("Product Remove Successfully");
        setWishList((oldWishList) => {
          const newList = oldWishList.filter((i) => i.id !== item.id);
          return newList;
        });
      }
    }
  };

  const handleCart = (item) => {
    setCart((oldCart) => {
      const newList = oldCart.filter((i) => i.id !== item.id);
      return newList;
    });
  };

  // useEffect(() => {
  //   console.log(wishList);
  // });
  return (
    <Wrapper>
      {wishList.find((i) => i.id === item.id) ? (
        <FaHeart
          className="wishlist wish"
          onClick={() => handleWishList(item)}
        />
      ) : (
        <FaHeart className="wishlist" onClick={() => handleWishList(item)} />
      )}
      <Link to={`/Product/${item.id}`} key={item.id} className="laptop-card">
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
          <h2>???{item.price}</h2>
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
          {checkout && (
            <div className="cart-button">
              <button
                type="button"
                className="remove-cart-btn"
                onClick={handleCart}
              >
                Remove
              </button>
              <button type="button" className="checkout-btn">
                Checkout
              </button>
            </div>
          )}
        </div>
      </Link>
    </Wrapper>
  );
};

export default Product;

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

  .remove-cart-btn {
    color: white;
    background-color: red;
    width: 100px;
    height: 30px;
    border-style: none;
    border-radius: 5px;
  }

  .checkout-btn {
    color: orange;
    background-color: white;
    width: 100px;
    height: 30px;
    border: 1px solid orange;
    border-radius: 5px;
  }
`;
