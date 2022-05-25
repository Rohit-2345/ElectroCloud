import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Product from "./Product";

const CategoryComponent = ({ data }) => {
  const [item, setItem] = useState(data);

  let cc = [];
  data.forEach((i) => {
    cc.push(i.company_name);
  });
  const companies = Array.from(new Set(cc));

  const [filterPrice, setFilterPrice] = useState(0);
  const priceFilter = (price) => {
    // setFilterPrice(e.target.value);
    // console.log(filterPrice);
    if (filterPrice === 0) {
      setItem(data);
    } else {
      const newList = data.filter((i) => i.price < price);
      setItem(newList);
    }
  };

  useEffect(() => {
    priceFilter(filterPrice);
  }, [filterPrice]);

  const [brand, setBrand] = useState("");

  const brandFilter = (brand) => {
    // setBrand(val);
    // console.log(brand);

    if (brand === "") {
      setItem(data);
    } else {
      const newList = data.filter((i) => i.company_name === brand);
      setItem(newList);
    }
  };

  useEffect(() => {
    brandFilter(brand);
  }, [brand]);

  return (
    <Wrapper>
      <div className="filter">
        <div className="filter-content">
          <span>Price</span>
          <div className="price-filter">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={300000}
              step={10000}
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              // onChange={filter}
            />
            <span>{filterPrice}</span>
          </div>
        </div>
        <div className="filter-content">
          <span>Brand</span>
          <button className="reset-btn" onClick={() => setBrand("")}>
            Reset
          </button>
          <div className="company-filter">
            {companies.map((c, i) => {
              return (
                <p key={i}>
                  <input
                    type="radio"
                    name="brand"
                    value={c}
                    onClick={(e) => setBrand(e.target.value)}
                  />
                  {c}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="products">
        <div>
          {item.map((item) => {
            return <Product item={item} key={item.id} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoryComponent;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #f1f3f6;
  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  span {
    font-size: large;
    font-weight: bold;
  }
  .filter {
    width: 20%;
    border: 1px solid white;

    margin: 10px 5px 10px 10px;
    box-shadow: 0px 0px 1px 1px white;
    background-color: white;
    box-sizing: border-box;
  }

  .filter-content {
    border-bottom: 1px solid rgb(240, 240, 240);
    margin-top: 10px;
  }
  .price-filter {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  .compnay-filter {
    display: flex;
    flex-direction: column;
  }

  .reset-btn {
    width: 75px;
    height: 25px;
    color: white;
    background-color: red;
    border-style: none;
    border-radius: 5px;
    margin-left: 100px;
  }

  .products {
    width: 80%;
    border: 1px solid white;
    margin: 10px 10px 10px 5px;
    box-shadow: 0px 0px 1px 1px white;
    background-color: white;
    box-sizing: border-box;
  }

  .item-card {
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 5px;
    overflow: hidden;
  }

  .item-card:hover h1 {
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
  .item-img {
    width: 200px;
    height: 200px;
  }

  h1 {
    font-size: large;
  }

  .wishlist {
    position: relative;
    bottom: 200px;
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
`;

// <Link
//   to={`/Product/${item.id}`}
//   key={item.id}
//   className="item-card"
// >
//   <div className="img-content">
//     <img
//       className="item-img"
//       src={item.img[0]}
//       alt={item.name}
//     />
//     {wishList.find((i) => i.id === item.id) ? (
//       <FaHeart
//         className="wishlist wish"
//         onClick={() => handleWishList(item)}
//       />
//     ) : (
//       <FaHeart
//         className="wishlist"
//         onClick={() => handleWishList(item)}
//       />
//     )}
//   </div>
//   <div className="desc-content">
//     <h1>{item.name.substring(0, 100)}...</h1>
//     <button className="star">
//       {item.rating}
//       <FaStar style={{ margin: "0px 0px 2px 0px" }} />
//     </button>
//     <ul>
//       {item.desc
//         .split(",")
//         .filter((v, n) => n < 4)
//         .map((info, index) => {
//           return (
//             <li key={index}>
//               {info.length > 80 ? (
//                 <p>{info.substring(0, 80)}...</p>
//               ) : (
//                 <p>{info}</p>
//               )}
//             </li>
//           );
//         })}
//     </ul>
//   </div>
//   <div className="price-content">
//     <h2>₹{item.price}</h2>
//   </div>
// </Link>
