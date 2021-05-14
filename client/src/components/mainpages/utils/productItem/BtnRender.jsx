import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import styled from "styled-components";

const RenderBlock = styled.div`
`;

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <RenderBlock>
      <div className="row_btn">
        {isAdmin ? (
          <>
            <Link
              id="btn_buy"
              to="#!"
              onClick={() =>
                deleteProduct(product._id, product.images.public_id)
              }
            >
              Удалить
            </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}`}>
              Редакт.
            </Link>
          </>
        ) : (
          <>
            <Link id="btn_buy" to="/" onClick={() => addCart(product)}>
              Купить
            </Link>
            <Link
              id="btn_view"
              to={`/detail/${product._id}`}
              onClick={() => {
                setTimeout(() => window.scrollTo(0, 0), 100);
              }}
            >
              Обзор
            </Link>
          </>
        )}
      </div>
    </RenderBlock>
  );
}

export default BtnRender;
