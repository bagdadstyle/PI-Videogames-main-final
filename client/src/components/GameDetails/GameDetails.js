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

  return (
    <div>
      {game ? (
        <div className={c.button_container_detail}>
          <Link to="/home">
            <button className={c.button_detail}>Volver</button>
          </Link>

          <div className={c.title_container_detail}>
            <h1 className={c.title_detail}>{game.name}</h1>
            <img
              className={c.image_detail}
              src={game.background_image}
              alt="backgroundImage"
              width="500px"
              height="500px"
            />

            <p className={c.genres_detail}>
              Generos:
              {game.genres ? game.genres.map((e) => e).join(", ") : null}
            </p>

            <p className={c.platforms_detail}>
              Plataformas:
              {console.log(game)}
              {game.platforms ? game.platforms.map((e) => e).join(", ") : null}
            </p>

            <p className={c.released_detail}>
              Fecha de lanzamiento: {game.releaseDate}
            </p>
            <p className={c.rating_detail}>Rating: {game.rating}</p>
            <p className={c.description_detail}>Descripcion: </p>
            <br />
            {game.description}
            {console.log(game.platforms)}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default GameDetails;
