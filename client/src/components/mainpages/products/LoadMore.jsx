import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import styled from "styled-components";

const LoadMoreBlock = styled.div``;

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    <LoadMoreBlock>
      <div className="load_more">
        {result < page * 12 ? (
          ""
        ) : (
          <button onClick={() => setPage(page + 1)}>Больше</button>
        )}
      </div>
    </LoadMoreBlock>
  );
}

export default LoadMore;
