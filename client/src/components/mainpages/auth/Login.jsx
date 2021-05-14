import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const LoginBlock = styled.div`
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
      width: 100px;
    }
  }
`;

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <LoginBlock>
      <div className="login-page">
        <form onSubmit={loginSubmit}>
          <h2>Вход в профиль</h2>
          <br />
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
            placeholder="Пароль"
            value={user.password}
            onChange={onChangeInput}
          />

          <div className="row">
            <button type="submit">Войти</button>
            <Link to="/register">Регистр.</Link>
          </div>
        </form>
      </div>
    </LoginBlock>
  );
}

export default Login;
