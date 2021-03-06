import React from "react";
import CategoryComponent from "./CategoryComponent";
import { products } from "../../Data";
import { useGlobalContext } from "../Context";
const SmartWatch = () => {
  const { products } = useGlobalContext();
  const data = products.filter((i) => i.category === "smartwatch");
  return <CategoryComponent data={data} />;
};

export default SmartWatch;
