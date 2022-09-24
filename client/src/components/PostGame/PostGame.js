import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVideogame } from "../../actions";
import { useHistory, Link } from "react-router-dom";

const PostGame = () => {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
    <div>
      <Link to="/home">
        <span>Volver</span>
      </Link>
      <h1>Agregar Juego</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripcion</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={input.backgroundImage}
            name="backgroundImage"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de lanzamiento</label>
          <input
            type="date"
            value={input.releaseDate}
            name="releaseDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Generos</label>
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
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default PostGame;