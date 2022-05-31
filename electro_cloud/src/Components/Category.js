import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import mobile from "../Images/mobile_logo.png";
import laptop from "../Images/laptop_logo.png";
import smartWatch from "../Images/smart-watch.jpeg";
import tv from "../Images/tv.jpeg";
import others from "../Images/Others.png";
import { FiChevronUp } from "react-icons/fi";
const Category = () => {
  return (
    <Wrapper>
      <Link to="/Mobiles" className="category">
        <img src={mobile} alt="Mobile" />
        <span>Mobile</span>
      </Link>
      <Link to="/Laptops" className="category">
        <img src={laptop} alt="Laptop" />
        <span>Laptop</span>
      </Link>
      <Link to="/SmartWatches" className="category">
        <img src={smartWatch} alt="Smart-Watch" />
        <span>Smart Watch</span>
      </Link>
      <Link to="/Tvs" className="category">
        <img src={tv} style={{ height: "50px", width: "75px" }} alt="TV" />
        <span>TV</span>
      </Link>
      <div className="others">
        <img src={others} alt="Others" />
        <span className="flex">
          Others <FiChevronUp className="icon" />
        </span>
        <div className="other-category">
          <Link to="/AC" className="oc">
            <span>Air Conditioner</span>
          </Link>
          <Link to="Washing_Machine" className="oc">
            <span>Washing Machine</span>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Category;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 75px;
  position: fixed;
  top: 50px;
  z-index: 1001;
  background-color: aliceblue;

  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 50px;
    height: 50px;
  }

  .others {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s all linear;
  }
  .others:hover .icon {
    transition: 0.3s all linear;
    transform: rotate(180deg);
  }

  .others:hover .other-category {
    visibility: visible;
  }
  .other-category {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: deepskyblue;
    position: absolute;
    top: 75px;
    visibility: hidden;
  }

  .oc {
    width: 200px;
    height: 20px;
    padding: 5px 0;
    border-bottom: 1px solid gray;
    text-align: center;
  }
`;
