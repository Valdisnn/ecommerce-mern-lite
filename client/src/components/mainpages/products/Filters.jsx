import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import styled from "styled-components";
import Slider from "../slider/Slider.jsx";

const FiltersBlock = styled.div`
  /* ------------ Filters Menu ----------------- */
  .filter_menu {
    width: 100%;
    min-height: 40px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px 0;
    color: #000;
    padding-bottom: 12px;
  }

  .filter_menu select,
  input {
    padding: 0 5px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    height: 40px;
    color: #212529;
    background-color: #fff;
    background-size: 16px 12px;
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    color: #000;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  .filter_menu input {
    flex: 1;
    margin: 0 10px;
  }

  @media (max-width: 576px) {
    .filter_menu select,
    input {
      font-size: 0.7rem;
    }
  }
`;

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <FiltersBlock>
      <div className="filter_menu">
        <div className="row">
          <span>Фильтры: </span>
          <select name="category" value={category} onChange={handleCategory}>
            <option value="">Все товары</option>
            {categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          value={search}
          placeholder="Введите название товара"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <div className="row sort">
          <span>Сорт. по: </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Последние товары</option>
            <option value="sort=oldest">Ранние товары</option>
            <option value="sort=-sold">Бестселлеры</option>
            <option value="sort=-price">Цена по убыванию</option>
            <option value="sort=price">Цена по возрастанию</option>
          </select>
        </div>
      </div>

      {search !== "" || sort !== "" || category !== "" ? (
        <div></div>
      ) : (
        <Slider />
      )}
    </FiltersBlock>
  );
}

export default Filters;
