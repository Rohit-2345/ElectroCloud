import React from "react";
import { useGlobalContext } from "./Context";
import WishListItem from "./WishListItem";
import ecimage from "../Images/electro.png";
import { BsBookmarkHeart } from "react-icons/bs";

const WishList = () => {
  const { wishList } = useGlobalContext();
  if (wishList.length === 0) {
    return (
      <div className="loading">
        {/* <img scr={ecimage} alt="Logo" className="logo-img" /> */}
        <h1>
          No Product Added to WishList{" "}
          <BsBookmarkHeart style={{ color: "red" }} />
        </h1>
      </div>
    );
  }
  return (
    <div>
      {wishList.map((item) => {
        return <WishListItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default WishList;
