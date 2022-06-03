import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Register from "./Form/Register";
import { useGlobalContext } from "./Context";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Register_URL = "https://localhost:44351/api/Customer";

const Registration = () => {
  const { openLoginPage, setOpenLoginPage, setIsLogin } = useGlobalContext();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleClose = (e) => {
    e.preventDefault();
    setOpenLoginPage(false);
    navigate(-2);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (fname && lname && email && password && address) {
  //     console.log(fname, lname, email, password, address);
  //     console.log("form submitted");
  //     setIsLogin(true);
  //     setOpenLoginPage(false);
  //     navigate(-2);
  //   } else {
  //     console.log("invalid");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (fname && lname && mobile && email && password && address) {
        const response = await axios.post(Register_URL, {
          Cust_ID: new Date().getTime().toString(),
          fname: fname,
          lname: lname,
          mobile: mobile,
          email: email,
          password: password,
          address: address,
        });
        const data = response.data;
        if (data === "Failed to Add") {
          setIsLogin(false);
          alert(data);
        } else {
          alert(data);
          setIsLogin(true);
          setOpenLoginPage(false);
          navigate(-2);
          // window.sessionStorage.setItem("cust_id", JSON.stringify(response.data));
          // console.log(window.sessionStorage.getItem("cust_id"));
        }
      } else {
        alert("Enter All Fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div
        className={openLoginPage ? "modal-overlay show-modal" : "modal-overlay"}
      >
        <div className="modal-container">
          <Register />
          {/* <div className="login-template">
            <h2>Looks like you're new here!</h2>
            <p>Sign up with your mobile number to get started</p>
          </div>
          <div className="input-container">
            <button type="button" className="cross-btn" onClick={handleClose}>
              <FaTimes />
            </button>
            <div className="input-content">
              <label>First Name</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="Enter First Name"
                required={true}
              />
            </div>
            <div className="input-content">
              <label>Last Name</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Enter Last Name"
                required={true}
              />
            </div>
            <div className="input-content">
              <label>Mobile No.</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile No."
                required={true}
              />
            </div>
            <div className="input-content">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required={true}
              />
            </div>

            <div className="input-content">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required={true}
              />
            </div>
            <div className="input-content">
              <label>Address</label>
              <textarea
                type="text"
                style={{ width: "300px", height: "50px", resize: "none" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                required={true}
              />
            </div>

            <button type="submit" className="signup-btn" onClick={handleSubmit}>
              SignUp
            </button>
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Registration;

const Wrapper = styled.div`
  .login-template h2 {
    color: white;
    font-size: x-large;
    margin: 0;
  }

  .modal-overlay {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.5); */
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
    /* height: 70%; */
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

  /* label {
    width: 150px;
  }

  input {
    width: 300px;
    height: 20px;
  }

  .cross-btn {
    position: relative;
    bottom: 10px;
    left: 225px;
    border-style: none;
    background: white;
    font-size: xx-large;
    color: red;
  } */

  .signup-btn {
    width: 100px;
    height: 35px;
    background-color: green;
    border-radius: 5px;
    border-style: none;
    color: white;
    font-size: 15px;
    font-weight: 700;
  }
`;
