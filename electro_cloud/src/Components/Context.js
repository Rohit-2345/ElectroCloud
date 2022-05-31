import React, { useState, useEffect, useContext } from "react";
//Get
import { products as p } from "../Data";
const API_URL = "https://localhost:44351/api/Product";
const User_URL = "https://localhost:44351/api/Customer";
//Post
const Register_URL = "https://localhost:44351/api/Customer";
const Login_URL = "https://localhost:44351/api/Login";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [openLoginPage, setOpenLoginPage] = useState(false);
  const [cart, setCart] = useState([]);

  // console.log(new Date().getTime().toString());
  const [products, setProducts] = useState([...p]);
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
    // console.log(`${User_URL}/${window.sessionStorage.cust_id}`);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    // fetchUser();
  }, []);

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
