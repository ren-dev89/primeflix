import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import api from "../../services/api";

const Film = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(true);
  const [film, setFilm] = useState({});

  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;

    const loadFilm = async () => {
      await api.instance
        .get(`/movie/${id}`, {
          params: { api_key: api.key, language: "pt-BR" },
        })
        .then((response) => {
          // console.log(response.data);
          setFilm(response.data);
          setShowLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    };

    loadFilm();
    didLoad.current = true;
  }, [id, navigate]);

  const bookmarkFilm = () => {
    const lsObject = localStorage.getItem("@primeflix");
    const savedFilms = JSON.parse(lsObject) || [];
    const filmExists = savedFilms.some((savedFilm) => savedFilm.id === film.id);
    if (filmExists) {
      alert("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    savedFilms.push(film);
    localStorage.setItem("@primeflix", JSON.stringify(savedFilms));
    alert("FILME SALVO COM SUCESSO");
  };

  return (
    <div className="film-info">
      {showLoading ? (
        <h1 className="loading">Carregando detalhes...</h1>
      ) : (
        <div className="film-container">
          <h1>{film.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
            alt={film.title}
          />
          <h3>Sinopse</h3>
          <span>{film.overview}</span>
          <strong>Avaliação: {film.vote_average.toFixed(1)} / 10</strong>

          <div className="area-buttons">
            <button onClick={bookmarkFilm}>Salvar</button>
            <button>
              <a
                href={`https://youtube.com/results?search_query=${film.title} trailer`}
                target="_blank"
                rel="external noreferrer"
              >
                Trailer
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Film;
