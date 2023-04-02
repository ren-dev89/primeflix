import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import api from "../../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [films, setFilms] = useState([]);

  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;

    const loadFilms = async () => {
      const response = await api.instance.get("movie/now_playing", {
        params: { api_key: api.key, language: "pt-BR", page: 1 },
      });

      setFilms(response.data.results);
      setShowLoading(false);
    };

    loadFilms();
    didLoad.current = true;
  }, []);

  return (
    <div className="container">
      {showLoading ? (
        <div className="loading">
          <h2>Carregando filmes...</h2>
        </div>
      ) : (
        <div className="film-list">
          {films.map((data) => (
            <article key={data.id}>
              <strong>{data.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                alt={data.title}
              />
              <Link to={`/film/${data.id}`}>Acessar</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
