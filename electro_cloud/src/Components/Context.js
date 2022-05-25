import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [openLoginPage, setOpenLoginPage] = useState(false);
  const [cart, setCart] = useState([]);

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
