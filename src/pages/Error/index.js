import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Error = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link to={"/"}>Voltar para a lista</Link>
    </div>
  );
};

export default Error;
