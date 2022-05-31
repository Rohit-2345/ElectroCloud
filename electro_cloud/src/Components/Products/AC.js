import React from "react";
import { products } from "../../Data";
import CategoryComponent from "./CategoryComponent";
import { useGlobalContext } from "../Context";
const AC = () => {
  const { products } = useGlobalContext();
  const data = products.filter((i) => i.category === "Air Conditioner");
  return <CategoryComponent data={data} />;
};

export default AC;
