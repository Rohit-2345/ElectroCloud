import React, { useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import axios from "axios";
import { toast } from "react-toastify";
const POST_PRODUCT_URL = "https://localhost:44351/api/Product";
//import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
////import { useForm } from "react-hook-form";

//import saveData from "./some_other_file";

function AdminDashboard() {
  const [values, setValues] = useState({
    name: "",
    desc: "",
    price: "",
    rating: "",
    company_name: "",
    category: "",
    quantity: 0,
    img: "",
    date: "",
    delivery: 1,
  });

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      if (
        values.name &&
        values.category &&
        values.company_name &&
        values.date &&
        values.delivery &&
        values.desc &&
        values.img &&
        values.price &&
        values.quantity &&
        values.rating
      ) {
        const response = await axios.post(POST_PRODUCT_URL, {
          ...values,
          id: uuid(),
        });
        console.log("Product", { ...values, id: uuid() });
        if (response.status === 200) {
          toast.success("Product Added to DB");
        } else {
          toast.error("Failed to Add");
        }
      } else {
        toast.warn("Filled All Required Data");
      }
    } catch (err) {
      if (err.response.status === 0) {
        toast.error("Network Error");
      }
    }
    // console.log({ ...values, id: uuid() });
  };

  return (
    <Styles>
      <form onSubmit={handleProduct}>
        <h1>Admin Dashboard</h1>
        <h1>ADD PRODUCT</h1>
        <label>Product Name</label>
        <input
          name="name"
          placeholder="Enter Product Name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          required
        />{" "}
        <br />
        <label>Description</label>
        <textarea
          name="desc"
          placeholder="Enter Description"
          value={values.desc}
          onChange={(e) => setValues({ ...values, desc: e.target.value })}
          required
        ></textarea>{" "}
        <br />
        <label>Price</label>
        <input
          name="price"
          placeholder="Enter Price"
          value={values.price}
          onChange={(e) => setValues({ ...values, price: e.target.value })}
          required
        />{" "}
        <br />
        <label>Rating</label>
        <input
          name="rating"
          placeholder="Enter Rating out of 5"
          value={values.rating}
          onChange={(e) => setValues({ ...values, rating: e.target.value })}
          required
        />{" "}
        <br />
        <label>Company Name</label>
        <input
          name="companyname"
          placeholder="Enter Company Name"
          value={values.company_name}
          onChange={(e) =>
            setValues({ ...values, company_name: e.target.value })
          }
          required
        />{" "}
        <br />
        <label>Category</label>
        <div>
          <select
            name="selectList"
            id="selectList"
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value })}
            required
          >
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
        <input
          name="qty"
          type="number"
          placeholder="Enter Quantity"
          value={values.quantity}
          onChange={(e) => setValues({ ...values, quantity: e.target.value })}
          required
        />{" "}
        <br />
        <label>Image</label>
        <textarea
          name="img"
          placeholder="Enter image links and sepearte it by ','"
          value={values.img}
          onChange={(e) => setValues({ ...values, img: e.target.value })}
          required
          multiple
        ></textarea>{" "}
        <br />
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={values.date}
          onChange={(e) => setValues({ ...values, date: e.target.value })}
          required
        />{" "}
        <br />
        <label>Delivery</label>
        <div className="delivery">
          <input
            name="delivery"
            type="radio"
            value={1}
            onChange={(e) => setValues({ ...values, delivery: e.target.value })}
          />
          <span>True</span>
        </div>
        <div className="delivery">
          <input
            name="delivery"
            type="radio"
            value={0}
            onChange={(e) => setValues({ ...values, delivery: e.target.value })}
          />
          <span>False</span>
          <br />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
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

  select {
    width: 130px;
    height: 35px;
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

  .delivery {
    display: flex;
    justify-content: baseline;
    align-content: flex-start;
  }
  .delivery input {
    width: 20px;
    margin: 5px 0;
  }

  .submit-btn {
    height: 30px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 5px;
  }
`;
