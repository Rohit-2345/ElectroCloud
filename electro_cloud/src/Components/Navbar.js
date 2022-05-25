import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { BsBookmarkHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import video1 from "../Images/video.mp4";
import { useGlobalContext } from "./Context";
const Navbar = () => {
  const { isLogin, Logout, setOpenLoginPage } = useGlobalContext();
  return (
    <nav>
      <header className="header-container">
        <Link to="/" className="link">
          <video src={video1} autoPlay loop muted></video>

          <h1 className="title">ELECTROCLOUD</h1>
        </Link>
        <div className="nav-right">
          <div className="search-container">
            <input type="text" className="search" />
            <FaSearch className="search-icon" />
          </div>
          {isLogin ? (
            <div className="flex">
              <Link to="/WishList">
                <button type="button" className="wish-btn">
                  <BsBookmarkHeart />
                  <span>WishList</span>
                </button>
              </Link>
              <Link to="/Cart">
                <button type="button" className="cart-btn">
                  <FaShoppingCart />
                  <span>Cart</span>
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
          {isLogin ? (
            <Link to="/">
              <button type="button" className="logout-btn" onClick={Logout}>
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/Login">
              <button
                type="button"
                className="login-btn"
                onClick={() => setOpenLoginPage(true)}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
