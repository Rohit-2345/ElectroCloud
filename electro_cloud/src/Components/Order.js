import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormInput from "./Form/FormInput";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./Context";
import styled from "styled-components";
import GooglePayButton from "@google-pay/button-react";
import axios from "axios";
import uuid from "react-uuid";
const Post_Order_URL = "https://localhost:44351/api/Order";

const Order = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { products, user } = useGlobalContext();
  const product = products.filter((item) => item.id.toString() === id)[0];
  const [total, setTotal] = useState(product.price * quantity);
  const [values, setValues] = useState({
    fname: user.fname,
    lname: user.lname,
    mobile: user.mobile,
    email: user.email,
    address: user.address,
  });

  const navigate = useNavigate();

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
      type: "text",
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
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Enter Address",
      label: "Address",
      required: true,
    },
  ];

  const handleOrder = async (e) => {
    e.preventDefault();
    if (id && user.Cust_ID) {
      const response = await axios.post(Post_Order_URL, {
        Order_ID: new Date().getTime().toString(),
        Cust_ID: user.Cust_ID,
        Product_ID: id,
        quantity: quantity,
        total_price: total,
        Transaction_ID: uuid(),
      });
      // console.log(response);
      if (response.status === 200) {
        toast.success(" 🦄 Order Successfull");
        navigate("/MyOrders");
      } else {
        toast.error("Order Failed");
      }
    } else {
      toast.error("Order Failed");
    }
  };

  const Add = () => {
    setQuantity((q) => q + 1);
  };
  const Minus = () => {
    if (quantity === 1) {
      setQuantity(quantity);
    } else {
      setQuantity((q) => q - 1);
    }
  };
  const handleTotal = () => {
    setTotal(product.price * quantity);
  };

  useEffect(() => {
    handleTotal();
  }, [quantity]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <div className="order">
        <div className="user-info">
          <h1>Details</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="product-info">
          <table>
            <tbody>
              <tr>
                <td className="name">
                  <span>Product :</span>
                  {product.name}
                </td>
              </tr>
              <tr>
                <td className="price">
                  <span>Price: </span>₹ {product.price}
                </td>
              </tr>
              <tr>
                <td>
                  Quantity :{" "}
                  <button
                    type="button"
                    className="minus_btn"
                    onClick={() => Minus()}
                  >
                    -
                  </button>
                  {"  "}
                  {quantity}
                  {"  "}
                  <button
                    type="button"
                    className="add_btn"
                    onClick={() => Add()}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <hr />
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <span>Total : </span>₹ {total}
          </p>
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: product.name,
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: total.toString(),
                currencyCode: "INR",
                countryCode: "IN",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("load payment data", paymentRequest);
            }}
          />

          <button type="submit" className="order-btn" onClick={handleOrder}>
            Order
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Order;

const Wrapper = styled.div`
  .order {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  td span {
    font-size: large;
    font-weight: bold;
  }

  .user-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
  }
  .product-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    margin: 5px 0;
  }

  .name {
    font-size: 20px;
  }
  .price {
    font-size: 16px;
  }

  .add_btn {
    border: none;
    color: white;
    background-color: green;
    border-radius: 20px;
    width: 25px;
    height: 25px;
    margin: 0 10px;
  }

  .minus_btn {
    border: none;
    color: white;
    background-color: red;
    border-radius: 20px;
    width: 25px;
    height: 25px;
    margin: 0 10px;
  }

  .order-btn {
    margin-top: 10px;
    padding: 10px 5px;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
    width: 60%;
    border: none;
    background-color: #ff9f00;
    color: white;
    font-size: larger;
  }
`;
