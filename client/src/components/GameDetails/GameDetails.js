import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDetails } from "../../actions";
import Loading from "../Loading/Loading";
import c from "./GameDetails.module.css";

const GameDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  const game = useSelector((state) => state.details);
  const loading = useSelector((state) => state.loading);

  return (
    <div className={c.detail_container}>
      {!loading ? (
        <div className={c.button_container_detail}>
          <Link to="/home">
            <button className={c.button_detail}>Volver</button>
          </Link>
          <div className={c.header_container}>
            <h1>{game.name}</h1>
            <img
              src={
                game.background_image
                  ? game.background_image
                  : game.backgroundImage
              }
              alt="backgroundImage"
            />
          </div>
          <div className={c.genANDplat_detail}>
            <div className={c.genre_container}>
              <label>Generos:</label>
              <p>{game.genres ? game.genres.map((e) => e).join(", ") : null}</p>
              <p>Fecha de lanzamiento: {game.releaseDate}</p>
            </div>
            <div className={c.plat_container}>
              <span>Plataformas:</span>
              <p>
                {/* {typeof game.platforms === "string"
                  ? game.platforms.split(",").join(", ")
                  : game.platforms.map((e) => e).join(", ")} */}
                {Array.isArray(game.platforms)
                  ? game.platforms.map((e) => e).join(", ")
                  : game.platforms}
              </p>
              <p className={c.rating}>Rating: {game.rating}</p>
            </div>
          </div>
          <p>Descripcion: </p>
          <br />
          {game.description}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default GameDetails;
