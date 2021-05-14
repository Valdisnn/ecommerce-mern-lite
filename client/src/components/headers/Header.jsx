import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/burger.svg";
import Close from "./icon/exit.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/create_product">Добавить товар</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/category">Категории</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/history">История</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Выйти
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Agetech"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/">{isAdmin ? "Товары" : "Магазин"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li onClick={() => setMenu(!menu)}>
            <Link to="/login">Вход ✥ Регистр.</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
