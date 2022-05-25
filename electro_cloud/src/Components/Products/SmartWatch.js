import React from "react";
import CategoryComponent from "./CategoryComponent";
import { products } from "../../Data";
const SmartWatch = () => {
  const data = products.filter((i) => i.category === "smartwatch");
  return <CategoryComponent data={data} />;
};

export default SmartWatch;
