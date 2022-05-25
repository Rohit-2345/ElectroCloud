import React from "react";
import CategoryComponent from "./CategoryComponent";
import { products } from "../../Data";
const TV = () => {
  const data = products.filter((i) => i.category === "TV");
  return <CategoryComponent data={data} />;
};

export default TV;
