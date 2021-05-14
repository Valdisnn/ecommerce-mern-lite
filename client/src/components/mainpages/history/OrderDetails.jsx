import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import styled from "styled-components";

const OrderDetBlock = styled.div`
  .history-page {
    overflow-x: auto;
    color: #000;
  }

  .history-page h2,
  h4 {
    text-align: center;
    margin: 20px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  .history-page table {
    margin: auto;
    width: 100%;
  }

  .history-page table,
  th,
  tr,
  td {
    border: 1px solid #ddd;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: center;
    padding: 10px;
    text-transform: capitalize;
  }

  .history-page img {
    height: 100px;
    object-fit: cover;
  }
`;

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <OrderDetBlock>
      <div className="history-page">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Адрес</th>
              <th>Индекс</th>
              <th>Страна</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderDetails.address.recipient_name}</td>
              <td>
                {orderDetails.address.line1 + " - " + orderDetails.address.city}
              </td>
              <td>{orderDetails.address.postal_code}</td>
              <td>{orderDetails.address.country_code}</td>
            </tr>
          </tbody>
        </table>

        <table style={{ margin: "30px 0px" }}>
          <thead>
            <tr>
              <th>Изображение</th>
              <th>Товары</th>
              <th>Количество</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.cart.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.images.url} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OrderDetBlock>
  );
}

export default OrderDetails;
