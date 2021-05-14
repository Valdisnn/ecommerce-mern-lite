import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products.jsx";
import DetailProduct from "./detailProduct/DetailProduct.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import OrderHistory from "./history/OrderHistory.jsx";
import OrderDetails from "./history/OrderDetails.jsx";
import Cart from "./cart/Cart.jsx";
import NotFound from "./utils/not_found/NotFound.jsx";
import Categories from "./categories/Categories.jsx";
import CreateProduct from "./createProduct/CreateProduct.jsx";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />

      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />

      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      />
      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />

      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : NotFound}
      />

      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
