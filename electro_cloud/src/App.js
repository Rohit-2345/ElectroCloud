import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Laptop from "./Components/Products/Laptop";
import Category from "./Components/Category";
import TV from "./Components/Products/TV";
import Mobile from "./Components/Products/Mobile";
import SmartWatch from "./Components/Products/SmartWatch";

import Error from "./Components/Error";
import SingleProduct from "./Components/Products/SingleProduct";
import Login from "./Components/Login";
import WishList from "./Components/WishList";
import Cart from "./Components/Cart";
import Registration from "./Components/Registration";
import Order from "./Components/Order";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Category />

        <div style={{ marginTop: "125px" }}></div>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/Mobiles" element={<Mobile />} />
          <Route path="/Laptops" element={<Laptop />} />
          <Route path="/SmartWatches" element={<SmartWatch />} />
          <Route path="/Tvs" element={<TV />} />
          <Route path="/WishList" element={<WishList />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Product/:id" element={<SingleProduct />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Orders" element={<Order />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <div style={{ marginBottom: "20px" }}></div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
