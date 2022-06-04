import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
//Get
import { products as p } from "../Data";
const API_URL = "https://localhost:44351/api/Product";
const Single_Product_URL = "https://localhost:44351/api/Product/";
const User_URL = "https://localhost:44351/api/Register";
const Get_Order_URL = "https://localhost:44351/api/Order?Cust_ID={id}";
const GetALL_Order_URL = "https://localhost:44351/api/Order";
const Order_URL = "https://localhost:44351/api/Order?Cust_ID=";
const GET_Cart_URL = "https://localhost:44351/api/Cart?Cust_ID=";
const GET_Wishlist_URL = "https://localhost:44351/api/Wishlist?Cust_ID=";
//Post
const Register_URL = "https://localhost:44351/api/Register";
const Login_URL = "https://localhost:44351/api/Login";
const Post_Order_URL = "https://localhost:44351/api/Order";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [openLoginPage, setOpenLoginPage] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]); //useState([...p]) use this for see offline products

  //Fetch Products
  const fetchData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setProducts(data);
  };

  //Fetch User Details
  const fetchUser = async () => {
    const response = await fetch(
      `${User_URL}/${window.sessionStorage.cust_id}`
    );
    const data = await response.json();
    setUser(data);
  };

  //Fetch User Orders
  const fetchOrders = async () => {
    const response = await fetch(
      `${Order_URL}${window.sessionStorage.cust_id}`
    );
    const order = await response.json();
    setOrder([...order]);
  };

  //Fetch User Cart
  const fetchCart = async () => {
    const response = await fetch(
      `${GET_Cart_URL}${window.sessionStorage.cust_id}`
    );
    const cartList = await response.json();
    // console.log("cartList", cartList);
    // setCart([...cartList]);
  };

  //Fetch User Wishlist
  const fetchWishlist = async () => {
    const response = await axios.get(
      `${GET_Wishlist_URL}${window.sessionStorage.cust_id}`
    );
    const wish = await response.data;

    const wishData = wish.map((w) => fetchProductByID(w.Product_ID));

    console.log("wishData", wishData);
    // setWishList([...wish]);
  };

  const fetchProductByID = async (id) => {
    const response = await axios.get(`${Single_Product_URL}${id}`);
    const data = await response.data;
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchUser();
    fetchOrders();
    fetchCart();
    fetchWishlist();
  }, [window.sessionStorage.cust_id]);

  const openLogin = () => {
    setOpenLoginPage(() => true);
    console.log("op click", openLoginPage);
  };

  const closeLogin = () => {
    setOpenLoginPage(false);
  };
  // const Login = () => {
  //   setIsLogin(true);
  // };
  const Logout = () => {
    setIsLogin(false);
    window.sessionStorage.clear();
  };
  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        Logout,
        wishList,
        setWishList,
        openLoginPage,
        setOpenLoginPage,
        openLogin,
        closeLogin,
        cart,
        setCart,
        products,
        user,
        order,
        fetchOrders,
        fetchWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
