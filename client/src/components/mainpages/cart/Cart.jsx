import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton.jsx";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CartBlock = styled.div`
  .cart {
    position: relative;
    transform: scaleY(0.98);
  }

  .amount span {
    color: #3f2aff;
    padding: 0 20px;
  }

  .amount button {
    width: 40px;
    height: 40px;
    border-radius: 100px;
    border: 1px solid #000;
    transition: 0.5s;
    color: #000;
    font-size: 28px;
  }

  .amount button:hover {
    border: 1px solid #3f2aff;
    background-color: #3f2aff;
    color: #fff;
  }

  .delete {
    position: absolute;
    top: 0;
    right: 5px;
    color: #3f2aff;
    font-weight: 900;
    cursor: pointer;
    margin-top: 2%;
    margin-right: 2%;
  }

  .total {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    padding-top: 10px;
  }

  .total h3 {
    text-transform: uppercase;
    color: #555;
    font-size: 32px;
  }

  @media (max-width: 767px) {
    .total h3 {
      color: #555;
      font-size: 22px;
    }
  }

  @media (max-width: 576px) {
    .total h3 {
      color: #555;
      font-size: 16px;
    }
  }
`;

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 10 ? (item.quantity = 10) : (item.quantity += 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Вы хотите убрать товар из корзины ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    addToCart([]);
    alert("Вы успешно оформили заказ");
  };

  if (cart.length === 0)
    return (
      <CartBlock>
        <div>
          <div style={{ textAlign: "center", marginTop: "20%", color: "#555" }}>
            <h2>Корзина пуста</h2>
            <h2>
              <Link
                to="/"
                style={{
                  textDecoration: "underline",
                  color: "#000",
                }}
              >
                Вернуться на главную
              </Link>
            </h2>
          </div>
        </div>
      </CartBlock>
    );

  return (
    <CartBlock>
      <div>
        {cart.map((product) => (
          <div className="detail cart" key={product._id} style={{borderBottom: '1px solid #ddd'}}>
            <img src={product.images.url} alt="" />

            <div className="box-detail">
              <h2 style={{ marginBottom: "30px" }}>{product.title}</h2>

              <h3 style={{ marginBottom: "30px" }}>
                $ {product.price * product.quantity}
              </h3>
              <p style={{ marginBottom: "30px" }}>{product.description}</p>

              <div className="amount">
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>

              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                X
              </div>
            </div>
          </div>
        ))}
        <div className="total">
          <h3>Итого: $ {total}</h3>
          <PaypalButton total={total} tranSuccess={tranSuccess} />
        </div>
        <br />
      </div>
    </CartBlock>
  );
}

export default Cart;
