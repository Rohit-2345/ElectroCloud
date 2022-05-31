import { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login_URL = "https://localhost:44351/api/Login";

const Login = () => {
  const { openLoginPage, setOpenLoginPage, setIsLogin } = useGlobalContext();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email) {
      toast.warn("Enter Email");
    } else if (!values.password) {
      toast.warn("Enter Password");
    } else {
      try {
        const response = await axios.post(Login_URL, {
          email: values.email,
          password: values.password,
        });
        const data = response.data;
        if (data === "User Not Found") {
          setIsLogin(false);
          toast.error(data);
        } else {
          setIsLogin(true);
          setOpenLoginPage(false);
          navigate(-1);
          toast.success("Welcome");
          window.sessionStorage.setItem("cust_id", response.data);
          console.log(window.sessionStorage.getItem("cust_id"));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenLoginPage(false);
    navigate(-1);
  };

  return (
    <Wrapper>
      <div style={{ marginTop: "125px" }}></div>
      <div className="app">
        <form>
          <button type="button" className="cross-btn" onClick={handleClose}>
            <FaTimes />
          </button>
          <h1>Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button type="submit" className="button" onClick={handleSubmit}>
            Login
          </button>
          <Link to="/registration">
            <p className="link-reg">New to ELECTROCLOUD? Create an Account</p>
          </Link>
        </form>
      </div>
      <div style={{ marginBottom: "20px" }}></div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 20px;
    /* background: rgba(0, 0, 0, 0.5); */
    /* background: linear-gradient(
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
      ),
      url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"); */
    background-size: cover;
    background-position: center;
  }

  form {
    background-color: white;
    padding: 0px 60px;
    border-radius: 10px;
    width: 400px;
  }

  h1 {
    color: rgb(77, 1, 77);
    text-align: center;
  }

  .button {
    width: 100%;
    height: 50px;
    padding: 10px;
    border: none;
    background-color: rebeccapurple;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 30px;
  }

  .cross-btn {
    position: relative;
    top: 5px;
    left: 380px;
    border-style: none;
    background: white;
    color: red;
  }
  .cross-btn svg {
    font-size: 50px;
  }

  .link-reg {
    color: "#2874f0";
    text-align: center;
  }
`;
