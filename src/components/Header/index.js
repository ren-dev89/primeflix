import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <Link to={"/"} className="logo">
        PrimeFlix
      </Link>
      <Link to={"/favorites"} className="btn">
        Meus filmes
      </Link>
    </header>
  );
};

export default Header;
