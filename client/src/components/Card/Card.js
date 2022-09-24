import React from "react";
import { Link } from "react-router-dom";
import c from "./Card.module.css";

const Card = ({ id, name, backgroundImage, genres, rating }) => {
  return (
    <Link className={c.link} to={`/videogame/${id}`}>
      <div className={c.card_container}>
        <span>{name}</span>
        <p>Rating: {rating}</p>
        <img src={backgroundImage} alt="backgroundImage" />
        {genres ? (
          <ul>
            {genres.map((e, i) => {
              return <li key={`${e}_${i}`}>{e}</li>;
            })}
          </ul>
        ) : (
          <p>No genres</p>
        )}
      </div>
    </Link>
  );
};

export default Card;
