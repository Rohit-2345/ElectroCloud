import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import { products } from "../../Data";
import { FiShoppingCart } from "react-icons/fi";
import { BsLightningFill } from "react-icons/bs";
import { FaHeart, FaStar } from "react-icons/fa";
import { useGlobalContext } from "../Context";
const SingleProduct = () => {
  const { id } = useParams();
  const product = products.filter((item) => item.id.toString() === id)[0];
  // console.log(product);

  const { wishList, setWishList, cart, setCart } = useGlobalContext();
  const checkWish = wishList.find((i) => i.id === product.id);
  const [isWishlist, setIsWishlist] = useState(checkWish);

  const handleWishList = (item) => {
    if (!isWishlist) {
      setIsWishlist(true);
      setWishList((oldWishList) => {
        return [...oldWishList, item];
      });
      // console.log(wishList);
    } else {
      setIsWishlist(false);
      setWishList((oldWishList) => {
        const newList = oldWishList.filter((i) => i.id !== item.id);
        return newList;
      });
    }
  };

  const handleCart = (item) => {
    setCart([...cart, item]);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Wrapper>
      <div className="img-container">
        {wishList.find((i) => i.id === product.id) ? (
          <FaHeart
            className="wishlist wish"
            onClick={() => handleWishList(product)}
          />
        ) : (
          <FaHeart
            className="wishlist"
            onClick={() => handleWishList(product)}
          />
        )}
        <Carousel
          responsive={responsive}
          className="carousel"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={true}
        >
          {product.img.map((scr, index) => (
            <img src={scr} alt={product.name} key={index}></img>
          ))}
        </Carousel>

        <div className="btn-container">
          <button className="add-btn" onClick={() => handleCart(product)}>
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
          <button className="buy-btn">
            <BsLightningFill />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
      <div className="desc-container">
        <h2>{product.name}</h2>
        <button className="star">
          {product.rating}
          <FaStar style={{ margin: "0px 0px 2px 0px" }} />
        </button>

        <h1 style={{ fontSize: "28px" }}>₹{product.price}</h1>

        <div>
          <span>Specifications</span>
          <ul>
            {product.desc.split(",").map((info, index) => {
              return <li key={index}>{info}</li>;
            })}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProduct;

const Wrapper = styled.section`
  width: 100%;
  margin: 5px;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  .img-container {
    width: 40%;
    position: sticky;
    padding-top: 20px;
    border: 1px solid #f0f0f0;
    margin: 10px;
    box-shadow: 0px 0px 1px 1px white;
    background-color: white;
    box-sizing: border-box;
  }

  .img-container img {
    width: 350px;
    height: 350px;
    margin-left: 80px;
  }

  .wishlist {
    position: relative;
    /* top: 15px;
    left: 190px; */
    width: 25px;
    height: 25px;
    color: gray;
    top: 5px;
    left: 460px;
    /* z-index: 23; */
  }

  .wish {
    color: red !important;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 5px;
  }

  .btn-container svg {
    width: 25px;
    height: 25px;
    position: relative;
    top: 5px;
  }

  .btn-container span {
    margin-left: 5px;
    font-size: x-large;
  }

  .add-btn {
    padding: 14px 7px;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
    width: 60%;
    margin: 0 5px;
    border: none;

    background-color: #ff9f00;
    color: white;
  }

  .buy-btn {
    padding: 14px 7px;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
    width: 60%;
    margin: 0 5px;
    border: none;

    background-color: #fb641b;
    color: white;
  }

  .desc-container {
    width: 60%;
    border: 1px solid white;
    margin: 10px;
    box-shadow: 0px 0px 1px 1px white;
    background-color: white;
    box-sizing: border-box;
  }

  h2 {
    color: #212121;
    font-size: 18px;
    font-weight: 400;
    display: contents;
    padding: 0;
    line-height: 1.4;
  }
  .star {
    border-style: none;
    border-radius: 5px;
    color: white;
    background-color: green;
    display: flex;
    align-items: center;
    width: 40px;
    height: 20px;
  }
`;
