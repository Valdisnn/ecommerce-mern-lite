import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const OrderHistBlock = styled.div`
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

  table a {
    text-transform: uppercase;
    color: #3f2aff;
  }

  .history-page img {
    height: 100px;
    object-fit: cover;
  }
`;

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <OrderHistBlock>
      <div className="history-page">
        <h2>История заказов</h2>

        <h4>Всего заказов: {history.length}</h4>

        <table>
          <thead>
            <tr>
              <th>ID заказа</th>
              <th>Дата покупки</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((items) => (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>Обзор</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OrderHistBlock>
  );
}

export default OrderHistory;
