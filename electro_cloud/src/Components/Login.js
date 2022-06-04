import React from "react";
import styled from "styled-components";
import Login2 from "./Form/Login";
import { useGlobalContext } from "./Context";

const Login = () => {
  const { openLoginPage } = useGlobalContext();
  return (
    <Wrapper>
      <div
        className={openLoginPage ? "modal-overlay show-modal" : "modal-overlay"}
      >
        <Login2 />
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
    background: rgba(0, 0, 0, 0.1);
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
  }

  .input-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin: 10px 5px;
  }
`;
