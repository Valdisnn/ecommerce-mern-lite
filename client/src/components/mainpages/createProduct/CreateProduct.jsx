import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading.jsx";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

const CreateProdBlock = styled.div`
  .create_product {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    color: #555;
  }

  .upload {
    max-width: 450px;
    height: 500px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 1rem;
    padding: 15px;
    margin: 20px;
    position: relative;
  }

  #file_up {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
  }

  #file_up::before {
    content: "+";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: white;
    color: #3f2aff;
    font-size: 17rem;
    text-align: center;
    cursor: pointer;
    margin: auto;
  }

  #file_img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
  }

  #file_img img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  #file_img span {
    position: absolute;
    top: -13px;
    right: -13px;
    background: white;
    border-radius: 50%;
    padding: 6px 10px;
    cursor: pointer;
    font-weight: 600;
  }

  .create_product form {
    max-width: 500px;
    min-width: 290px;
    width: 100%;
    margin: 15px 30px;
  }

  .create_product form .row {
    width: 100%;
    margin: 15px 0;
  }

  .create_product form input,
  textarea {
    width: 100%;
    min-height: 40px;
    padding: 0 5px;
  }

  .create_product form button {
    width: 200px;
    height: 40px;
    background: #3f2aff;
    border: 1px solid #3f2aff;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 600;
    padding: 6px;
    border-radius: 100px;
    transition: 0.5s;
  }

  .create_product form button:hover {
    background: #fff;
    color: #000;
  }

  select {
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
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    color: #555;
  }

  form input {
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    color: #555;
  }
`;

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "Здесь должно быть описание товара для карточки.",
  content: "Здесь должно быть подробное описание товара (сплошной текст)",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Вы не админ");
      const file = e.target.files[0];

      if (!file) return alert("Нет такого файла");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Размер слишком большой");

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp"
      )
        // 1mb
        return alert("Формат не поддерживается");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("Вы не админ");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Вы не админ");
      if (!images) return alert("Изображение не загружено");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <CreateProdBlock>
      <div className="create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="product_id">ID товара</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>

          <div className="row">
            <label htmlFor="title">Название</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="price">Цена в USD</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="description">Описание</label>
            <input
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="content">Контент</label>
            <input
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="7"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="categories"></label>
            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Укажите категорию</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? "Изменить" : "Создать"}</button>
        </form>
      </div>
    </CreateProdBlock>
  );
}

export default CreateProduct;
