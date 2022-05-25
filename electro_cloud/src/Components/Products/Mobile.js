import React from "react";
import { products } from "../../Data";
import CategoryComponent from "./CategoryComponent";
const Mobile = () => {
  const data = products.filter((i) => i.category === "mobile");
  return <CategoryComponent data={data} />;
};

export default Mobile;
