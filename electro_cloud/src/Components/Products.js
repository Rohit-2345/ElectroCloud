import React from "react";
import CarouselComponent from "./CarouselComponent";

const Products = () => {
  return (
    <div>
      <div className="mobile-container">
        <h1>Mobiles</h1>
        <CarouselComponent type="mobile" />
      </div>
      <div className="laptop-container">
        <h1>Laptops</h1>
        <CarouselComponent type="laptop" />
      </div>
      <div className="smartwatch-container">
        <h1>SmartWatches</h1>
        <CarouselComponent type="smartwatch" />
      </div>
      <div className="tv-container">
        <h1>TV</h1>
        <CarouselComponent type="TV" />
      </div>
    </div>
  );
};

export default Products;
