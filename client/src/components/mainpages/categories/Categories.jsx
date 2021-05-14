import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import styled from "styled-components";

const CategorBlock = styled.div`
  .categories {
    max-width: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 30px auto;
    color: #555;
  }

  .categories form {
    width: 290px;
    margin-bottom: 20px;
  }

  .categories label {
    display: block;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .categories input,
  button {
    height: 35px;
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    color: #555;
  }

  .categories input {
    width: 210px;
    border-radius: 0%;
  }

  .categories button {
    width: 70px;
    background-color: #3f2aff;
    text-transform: uppercase;
    border: 1px solid #3f2aff;
    border-radius: 100px;
    letter-spacing: 2px;
    font-weight: 700;
    color: white;
    margin-left: 10px;
    transition: 0.5s;
  }

  .categories button:hover { 
    border: 1px solid #3f2aff;
    background: #fff;
    color: #000;
  }

  .categories .row {
    min-width: 290px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <CategorBlock>
      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Укажите название</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit">{onEdit ? "ок" : "+"}</button>
        </form>

        <div className="col">
          {categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  ред.
                </button>
                <button onClick={() => deleteCategory(category._id)}>-</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CategorBlock>
  );
}

export default Categories;
