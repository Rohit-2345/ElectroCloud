import React from "react";
import { useGlobalContext } from "./Context";
import styled from "styled-components";
const Order_URL = "https://localhost:44351/api/Order?Cust_ID=10";

const MyOrders = () => {
  const { order, user, products } = useGlobalContext();
  //   const product = products.filter((p) => p.id === item.Product_ID)[1];
  // console.log(products.filter((p) => p.id === "3")[0]);

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Address</th>
          </tr>
        </thead>
        {order.map((item) => {
          return (
            <tbody key={item.Order_ID}>
              <tr>
                <td>{item.Order_ID}</td>
                <td>
                  {products.filter((p) => p.id === item.Product_ID)[0].name}
                </td>
                <td>{user.address}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </Wrapper>
  );
};

export default MyOrders;

const Wrapper = styled.div`
  table,
  th,
  td {
    border: 1px solid black;
    margin: 10px;
  }
`;
