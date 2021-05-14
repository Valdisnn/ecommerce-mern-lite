import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem.jsx";
import Footer from "../footer/Footer.jsx";
import styled from "styled-components";

const BtnBuyBlock = styled.button`
  .cart {
    border: 1px solid #3f2aff;
    background: #3f2aff;
    margin-right: 5px;
    border-radius: 100px;
    transition: 0.5s;
  }

  .cart:hover {
    background: #fff;
    color: #000;
  }
`;

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <br />
          <br />
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p style={{ fontWeight: "bold", marginTop: "30px" }}>
            Этот товар покупали {detailProduct.sold} раз
          </p>
          <BtnBuyBlock>
            <Link
              to="/cart"
              className="cart"
              onClick={() => addCart(detailProduct)}
            >
              Купить
            </Link>
          </BtnBuyBlock>
        </div>
      </div>

      <div>
        <h2
          style={{
            color: "#555",
            textTransform: "uppercase",
            borderBottom: "1px solid #ddd",
            minHeight: "50px",
            marginTop: "5%",
            textAlign: "center",
          }}
        >
          Похожие товары
        </h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
        <br />
      </div>

      <Footer />
    </>
  );
}

export default DetailProduct;
