import React, { useState } from "react";
import styled from "styled-components";

//import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
////import { useForm } from "react-hook-form";

//import saveData from "./some_other_file";

const divStyle = {
  margin: 10,
  width: 10,
};

function AdminDashboard() {
  return (
    <Styles>
      <form>
        <h1>Admin Dashboard</h1>
        <label>Name</label>
        <input name="name" /> <br />
        <label>Description</label>
        <textarea name="desc"></textarea> <br />
        <label>Price</label>
        <input name="price" /> <br />
        <label>Rating</label>
        <input name="rating" /> <br />
        <label>Company Name</label>
        <input name="companyname" /> <br />
        <label>Category</label>
        <div style={divStyle}>
          <select name="selectList" id="selectList" required>
            <option value="select">--select--</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="SmartWatch">Smart Watch</option>
            <option value="TV">TV</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="AC">AC</option>
          </select>
        </div>{" "}
        <br />
        <label>Quantity</label>
        <input name="qty" type="number" /> <br />
        <label>Image</label>
        <textarea name="img"></textarea> <br />
        <label>Date</label>
        <input name="date" type="date" /> <br />
        <label>Delivery</label>
        <input name="delivery" type="text" /> <br />
        <input type="submit" />
      </form>
    </Styles>
  );
}

export default AdminDashboard;

const Styles = styled.div`
  background: lavender;
  padding: 20px;

  h1 {
    border-bottom: 1px solid white;
    color: #3d3d3d;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    padding: 10px;
    text-align: center;
  }

  form {
    background: white;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 500px;
    padding: 30px 50px;
  }

  input {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }

  label {
    color: #3d3d3d;
    display: block;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .error {
    color: red;
    font-family: sans-serif;
    font-size: 12px;
    height: 30px;
  }

  .custom-select {
    width: 100px;
  }

  .submitButton {
    background-color: #6976d9;
    color: white;
    font-family: sans-serif;
    font-size: 14px;
    margin: 20px 0px;
  }
`;
