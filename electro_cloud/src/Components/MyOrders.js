import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";
import styled from "styled-components";

const MyOrders = () => {
  const { fetchOrders, order, user, products } = useGlobalContext();

  useEffect(() => {
    setTimeout(fetchOrders, 2000);
  }, []);
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Address</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        {order.map((item) => {
          return (
            <tbody key={item.Order_ID}>
              <tr>
                <td>{item.Order_ID}</td>
                <td>
                  {products.filter((p) => p.id === item.Product_ID)[0].name ===
                  undefined
                    ? "Not Available"
                    : products.filter((p) => p.id === item.Product_ID)[0].name}
                </td>
                <td>{user.address}</td>
                <td>{item.quantity}</td>
                <td>{item.total_price}</td>
                <td>{item.Transaction_ID}</td>
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
