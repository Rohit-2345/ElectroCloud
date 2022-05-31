import React from "react";
// import { products } from "../../Data";
import CategoryComponent from "./CategoryComponent";
import { useGlobalContext } from "../Context";
const Mobile = () => {
  const { products } = useGlobalContext();
  const data = products.filter((i) => i.category === "mobile");

  return <CategoryComponent data={data} />;
};

export default Mobile;
