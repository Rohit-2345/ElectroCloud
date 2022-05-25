import React from "react";
import { useGlobalContext } from "./Context";
import WishListItem from "./WishListItem";
const WishList = () => {
  const { wishList } = useGlobalContext();
  if (wishList.length === 0) {
    return <div>No Product Added to WishList</div>;
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
