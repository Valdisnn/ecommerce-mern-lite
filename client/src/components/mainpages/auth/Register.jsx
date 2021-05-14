import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const RegBlock = styled.div`
  .login-page {
    max-width: 500px;
    box-shadow: 0 0 15px #ddd;
    border-radius: 1rem;
    padding: 30px;
    margin: 72px auto;
  }

  .login-page h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #000;
  }

  .login-page form input,
  .login-page form button {
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 0 5px;
    outline: none;
    border: none;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }

  .login-page form .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .login-page form button {
    width: 150px;
    border: 1px solid #3f2aff;
    background: #3f2aff;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 600;
    padding: 6px;
    border-radius: 100px;
    transition: 0.5s;
  }

  .login-page form button:hover {
    background: #fff;
    color: #000;
  }

  .login-page form a {
    color: #000;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }

  @media (max-width: 320px) {
    .login-page form button {
      width: 140px;
    }
  }
`;

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <RegBlock>
      <div className="login-page">
        <form onSubmit={registerSubmit}>
          <h2>Регистрация</h2>
          <br />
          <input
            type="text"
            name="name"
            required
            placeholder="Имя"
            value={user.name}
            onChange={onChangeInput}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            placeholder="Пароль мин. 6 символов"
            value={user.password}
            onChange={onChangeInput}
          />

          <div className="row">
            <button type="submit">Сохранить</button>
            <Link to="/login">Войти</Link>
          </div>
        </form>
      </div>
    </RegBlock>
  );
}

export default Register;
