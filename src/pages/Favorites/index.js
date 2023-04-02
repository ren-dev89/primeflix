import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [myFilms, setMyFilms] = useState([]);

  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;

    const lsObject = localStorage.getItem("@primeflix");
    const savedFilms = JSON.parse(lsObject) || [];
    setMyFilms(savedFilms);

    didLoad.current = true;
  }, []);

  const deleteFilm = (id) => {
    let filteredFilms = myFilms.filter((film) => film.id !== id);
    setMyFilms(filteredFilms);
    localStorage.setItem("@primeflix", JSON.stringify(filteredFilms));
  };

  return (
    <div className="my-films">
      <h1>Meus filmes</h1>

      {myFilms.length > 0 ? (
        <ul>
          {myFilms.map((data) => (
            <li key={data.id}>
              <span>{data.title}</span>
              <div>
                <Link to={`/film/${data.id}`}>Ver detalhes</Link>
                <button onClick={() => deleteFilm(data.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>Você não possui nenhum filme salvo :(</span>
      )}
    </div>
  );
};

export default Favorites;
