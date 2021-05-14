import React from "react";
import BtnRender from "./BtnRender.jsx";
import styled from "styled-components";

const ProdItemBlock = styled.div`
  .product_card {
    max-width: 300px;
    overflow: hidden;
    height: 520px;
    padding: 15px;
    box-shadow: 0 0 15px #ddd;
    margin: 10px 0;
    position: relative;
    border-radius: 1rem;
  }

  .product_card img {
    width: 100%;
    height: 300px;
    display: block;
    object-fit: cover;
  }

  .product_box h2 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-transform: uppercase;
    color: #323232;
  }

  .product_card span {
    color: #555;
    font-size: 1.3rem;
    font-weight: bold;
  }

  .product_box p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 70px;
    overflow: hidden;
    color: #555;
  }

  .row_btn {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .row_btn a {
    width: 50%;
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 6px;
  }

  #btn_buy {
    border: 1px solid #3f2aff;
    background: #3f2aff;
    margin-right: 5px;
    border-radius: 100px;
    transition: 0.5s;
  }

  #btn_buy: hover{
    background: #fff;
    color: #000;
  }

  #btn_view {
    background: transparent;
    color: #555;
    margin-left: 5px;
    border-radius: 100px;
    transition: 0.5s;
  }

  #btn_view: hover{
    color: #000;
  }


  .product_card input {
    position: absolute;
    width: 25px;
    height: 25px;
  }
`;

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <ProdItemBlock>
      <div className="product_card">
        {isAdmin && (
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          />
        )}
        <img
          src={product.images.url}
          alt={product.title}
          title={product.title}
        />

        <div className="product_box">
          <h2 style={{ marginTop: "5px", marginBottom: "10px" }}>
            {product.title}
          </h2>
          <span>$ {product.price}</span>
          <p style={{ marginTop: "10px" }}>{product.description}</p>
        </div>

        <BtnRender product={product} deleteProduct={deleteProduct} />
      </div>
    </ProdItemBlock>
  );
}

export default ProductItem;
