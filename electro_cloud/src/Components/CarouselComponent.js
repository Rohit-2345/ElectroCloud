import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ecproducts as products } from "../Data";
import { Link } from "react-router-dom";
// import { useGlobalContext } from "./Context";
// import { useGlobalContext } from "./Context";
// import { FiShoppingCart } from "react-icons/fi";

const CarouselComponent = ({ type }) => {
  // const { cart, setCart } = useGlobalContext();
  // const { products } = useGlobalContext();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const handleCart = (item) => {
  //   setCart([...cart, item]);
  // };
  return (
    <Carousel
      responsive={responsive}
      className="carousel"
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      showDots={true}
      style={{ margin: "0 10px" }}
    >
      {products
        .filter((item) => item.category === type)
        .map((item) => {
          // console.log(item.img.split(",")[0]);
          return (
            <Link
              to={`/Product/${item.id}`}
              key={item.id}
              className="product-card"
            >
              <img src={item.img[0]} className="product-img" alt={item.name} />
              <h1>
                {item.name.substring(0, 45)}
                {item.name.length > 45 ? "..." : ""}
              </h1>
              <h2>Price:₹{item.price}</h2>
              {/* <button className="add-btn" onClick={() => handleCart(item)}>
                <FiShoppingCart />
                <span>Add to Cart</span>
              </button> */}
            </Link>
          );
        })}
    </Carousel>
  );
};

export default CarouselComponent;
