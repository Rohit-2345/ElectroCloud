import React from "react";
import CategoryComponent from "./CategoryComponent";
import { products } from "../../Data";
import { useGlobalContext } from "../Context";
const TV = () => {
  const { products } = useGlobalContext();
  const data = products.filter((i) => i.category === "TV");
  return <CategoryComponent data={data} />;
};

export default TV;
