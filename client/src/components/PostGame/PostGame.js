import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVideogame } from "../../actions";
import { useHistory, Link } from "react-router-dom";
import c from "./PostGame.module.css";

const PostGame = () => {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    backgroundImage: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  const [input, setInput] = useState({
    name: "",
    description: "",
    backgroundImage: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);
  function inputValidate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Inserte un nombre";
    }
    if (!input.backgroundImage) {
      errors.backgroundImage = "Inserte una imagen";
    }
    if (
      Number(input.rating) > 5 ||
      Number(input.rating) < 1 ||
      isNaN(Number(input.rating))
    ) {
      errors.rating = "El rating es invalido";
    }
    if (!input.description) {
      errors.description = "Inserte una descripcion";
    }

    return errors;
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      inputValidate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlePlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };
  const handleGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("Juego creado");
    setInput({
      name: "",
      description: "",
      backgroundImage: "",
      releaseDate: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  };
  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== e),
    });
  };
  const handleDeleteGenres = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== e),
    });
  };

  return (
    <div className={c.form_container}>
      <div className={c.back_container}>
        <Link to="/home">
          <span>Volver</span>
        </Link>
      </div>
      <div className={c.title}>
        <h1>Agregar Juego</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p>Nombre</p>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            required
          />
          {errors.name && <p className={c.danger_text}>{errors.name}</p>}
        </div>
        <div>
          <p>Imagen</p>
          <input
            type="text"
            value={input.backgroundImage}
            name="backgroundImage"
            onChange={handleChange}
            required
          />
          {errors.backgroundImage && (
            <p className={c.danger_text}>{errors.backgroundImage}</p>
          )}
        </div>
        <div>
          <p>Fecha de lanzamiento</p>
          <input
            type="date"
            value={input.releaseDate}
            name="releaseDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Rating</p>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
          {errors.rating && <p className={c.danger_text}>{errors.rating}</p>}
        </div>
        <div>
          <p>Generos</p>
          <select onChange={(e) => handleGenres(e)}>
            <option value="All" key="unique1">
              All
            </option>
            {genres.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <ul>
            {input.genres.map((e, i) => {
              return (
                <li key={i} onClick={() => handleDeleteGenres(e)}>
                  {e} X
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>Plataformas</p>
          <select onChange={(e) => handlePlatforms(e)}>
            <option value="All" key="unique2">
              All
            </option>
            {platforms.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <ul>
            {input.platforms.map((e, i) => {
              return (
                <li key={i} onClick={() => handleDeletePlatforms(e)}>
                  {e} X
                </li>
              );
            })}
          </ul>
          <div>
            <p>Descripcion</p>
            <input
              type="text"
              value={input.description}
              name="description"
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className={c.danger_text}>{errors.description}</p>
            )}
          </div>
        </div>
        <div className={c.button_submit}>
          <input value="Crear" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PostGame;
