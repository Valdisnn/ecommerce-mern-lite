import React from "react";
import styled from "styled-components";

const LoadBlock = styled.div`
  .loader-block {
    display: flex;
    justify-content: center;
    margin-top: 20%;
    margin-bottom: 40%;
  }

  .loader {
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    border-top: 0.3em solid #3f2aff;
    border-radius: 50%;
    animation: rotating 2s ease-in-out infinite;
    --direction: 1;
  }

  .loader::before,
  .loader::after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    box-sizing: border-box;
    top: -0.2em;
  }

  .loader::before {
    border-top: 0.3em solid #3f2aff;
    transform: rotate(120deg);
  }

  .loader::after {
    border-top: 0.3em solid #3f2aff;
    transform: rotate(240deg);
  }

  .loader span {
    position: absolute;
    color: #555;
    font-weight: bold;
    width: inherit;
    height: inherit;
    text-align: center;
    line-height: 10em;
    font-family: sans-serif;
    animation: rotating 2s linear infinite;
    --direction: -1;
  }

  @keyframes rotating {
    50% {
      transform: rotate(calc(180deg * var(--direction)));
    }

    100% {
      transform: rotate(calc(360deg * var(--direction)));
    }
  }
`;

function Loading() {
  return (
    <LoadBlock>
      <div className="loader-block">
        <div className="loader">
          <span>Загрузка...</span>
        </div>
      </div>
    </LoadBlock>
  );
}

export default Loading;
