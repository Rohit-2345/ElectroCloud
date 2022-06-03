import React, { useState, useEffect, useContext } from "react";
//Get
import { products as p } from "../Data";
const API_URL = "https://localhost:44351/api/Product";
const User_URL = "https://localhost:44351/api/Register";
const Get_Order_URL = "https://localhost:44351/api/Order?Cust_ID={id}";
const GetALL_Order_URL = "https://localhost:44351/api/Order";
const Order_URL = "https://localhost:44351/api/Order?Cust_ID=";
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
  const [products, setProducts] = useState([...p]);

  // console.log(new Date().getTime().toString());
  const fetchData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setProducts(data);
    console.log(data);
  };
  const fetchUser = async () => {
    const response = await fetch(
      `${User_URL}/${window.sessionStorage.cust_id}`
    );
    const data = await response.json();
    setUser(data);
    // console.log(`${User_URL}/${window.sessionStorage.cust_id}`);
    // console.log(data);
  };

  const fetchOrders = async () => {
    // console.log(`${Order_URL}${window.sessionStorage.cust_id}`);

    const response = await fetch(
      `${Order_URL}${window.sessionStorage.cust_id}`
    );
    const order = await response.json();
    setOrder([...order]);
    console.log(order);
  };

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
    fetchOrders();
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
