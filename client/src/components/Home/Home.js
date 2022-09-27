/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createdFilter,
  genresFilter,
  getGenres,
  getVideogames,
  orderByName,
  resetState,
  setLoading,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import c from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [gamesPage, setGamesPage] = useState(15);
  const indexLastGame = page * gamesPage;
  const indexFirstGame = indexLastGame - gamesPage;
  const currentGames = videogames.slice(indexFirstGame, indexLastGame);
  const pagination = (pageN) => {
    setPage(pageN);
  };

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videogames]);
  useEffect(() => {
    dispatch(getVideogames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = async (e) => {
    dispatch(getVideogames());
  };
  const handleFilterGenres = (e) => {
    dispatch(genresFilter(e.target.value));
  };
  const handleFilterCreate = (e) => {
    dispatch(createdFilter(e.target.value));
  };
  const handleOrder = (e) => {
    dispatch(orderByName(e.target.value));
    setPage(1);
    setOrder(`order ${e.target.value}`);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <NavBar />
      <div className={c.filters_container}>
        <select defaultValue={"Order"} onChange={(e) => handleOrder(e)}>
          <option id={"Order"} value="Order" selected disabled hidden>
            Order
          </option>
          <option value="rating">Rating</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select defaultValue={"All"} onChange={(e) => handleFilterGenres(e)}>
          <option id={"All"} value="All" key="unique1">
            All
          </option>
          {genres.map((e, i) => {
            return (
              <option value={e.name} key={`${e.name}_${e.id}`}>
                {e.name}
              </option>
            );
          })}
        </select>
        <select defaultValue={"All"} onChange={(e) => handleFilterCreate(e)}>
          <option id={"All"} value="All">
            All
          </option>
          <option value="DB">DB</option>
          <option value="API">API</option>
        </select>
        <button onClick={(e) => handleClick(e)}>Refresh</button>
      </div>
      <Pagination
        videogames={videogames.length}
        gamesPage={gamesPage}
        pagination={pagination}
      />

      <div className={c.games_container}>
        {currentGames.map((e, i) => {
          return (
            <Card
              key={`${e.id}_${i}`}
              id={e.id}
              name={e.name}
              backgroundImage={e.backgroundImage}
              genres={e.genres}
              rating={e.rating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
