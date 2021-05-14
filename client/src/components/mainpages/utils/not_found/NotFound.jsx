import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20%", color: "#555" }}>
        <h2>404 | Страница не найдена</h2>
        <h2>
          <Link
            to="/"
            style={{
              textDecoration: "underline",
              color: "#000",
            }}
          >
            Вернуться на главную
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default NotFound;
