import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useGlobalContext } from "./Context";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const Login_URL = "https://localhost:44351/api/Login";

const Login = () => {
  const { openLoginPage, setOpenLoginPage, setIsLogin } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email === "r" && password === "r") {
  //     setIsLogin(true);
  //     setOpenLoginPage(false);
  //     navigate(-1);
  //   } else {
  //     setIsLogin(false);
  //     console.log("invalid user");
  //   }
  //   console.log("form submitted.");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert("Please Enter email");
        document.getElementById("email").style.borderColor = "red";
      } else if (!password) {
        alert("Please Enter password");
        document.getElementById("email").style.borderColor = "green";
        document.getElementById("password").style.borderColor = "red";
      } else {
        const response = await axios.post(Login_URL, {
          email: email,
          password: password,
        });
        const data = response.data;
        if (data === "User Not Found") {
          setIsLogin(false);
          alert(data);
        } else {
          setIsLogin(true);
          setOpenLoginPage(false);
          navigate(-1);
          window.sessionStorage.setItem("cust_id", response.data);
          console.log(window.sessionStorage.getItem("cust_id"));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenLoginPage(false);
    navigate(-1);
  };
  return (
    <Wrapper>
      <div
        className={openLoginPage ? "modal-overlay show-modal" : "modal-overlay"}
      >
        <div className="modal-container">
          <div className="login-template">
            <h2>Login</h2>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <div className="input-container">
            <button type="button" className="cross-btn" onClick={handleClose}>
              <FaTimes />
            </button>
            <div className="input-content">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
            </div>
            <div className="input-content">
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
            </div>
            <button type="submit" className="login-btn" onClick={handleSubmit}>
              Login
            </button>
            <Link to="/registration">
              <p style={{ color: "#2874f0" }}>
                New to ELECTROCLOUD? Create an Account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  .login-template h2 {
    color: white;
    font-size: x-large;
    margin: 0;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s linear;
    visibility: hidden;
    z-index: -1;
  }
  /* OPEN/CLOSE MODAL */
  .show-modal {
    visibility: visible;
    z-index: 1000000000000000000;
  }

  .modal-container {
    background: white;
    border-radius: 5px;
    width: 100%;
    height: 50%;
    max-width: 700px;
    position: relative;
    display: flex;
    /* flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .close-modal-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: darkred;
    cursor: pointer;
  }

  .login-template {
    width: 25%;
    background-color: #2874f0;
    color: #fff;
    padding: 10px;
    font-size: 15px;
  }

  .input-container {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin-top: 20px; */
  }

  .input-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin: 10px 5px;
  }

  label {
    width: 150px;
  }

  input {
    width: 300px;
    height: 20px;
  }

  .cross-btn {
    position: relative;
    bottom: 40px;
    left: 225px;
    border-style: none;
    background: white;
    font-size: xx-large;
    color: red;
  }
`;
