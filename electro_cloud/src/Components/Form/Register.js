import { useState } from "react";
import styled from "styled-components";
import FormInput from "./Registerinput";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
const Register_URL = "https://localhost:44351/api/Customer";
const Register = () => {
  const { openLoginPage, setOpenLoginPage, setIsLogin } = useGlobalContext();
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleClose = (e) => {
    e.preventDefault();
    setOpenLoginPage(false);
    navigate(-2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        values.fname &&
        values.lname &&
        values.mobile &&
        values.email &&
        values.password &&
        values.address
      ) {
        const response = await axios.post(Register_URL, {
          Cust_ID: new Date().getTime().toString(),
          fname: values.fname,
          lname: values.lname,
          mobile: values.mobile,
          email: values.email,
          password: values.password,
          address: values.address,
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

  const inputs = [
    {
      id: 1,
      name: "fname",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "lname",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "mobile",
      type: "tel",
      placeholder: "Mobile",
      errorMessage:
        "Mobile should be 10 characters and shouldn't include any special character!",
      label: "Mobile",
      pattern: "[0-9]{10}",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Enter Address",
      label: "Address",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <button type="button" className="cross-btn" onClick={handleClose}>
            <FaTimes />
          </button>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  width: 700px;
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding-top: 10px;
    padding-bottom: 20px; */
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
    width: 700px;
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
    left: 680px;
    border-style: none;
    background: white;
    color: red;
  }
  .cross-btn svg {
    font-size: 50px;
  }
`;
