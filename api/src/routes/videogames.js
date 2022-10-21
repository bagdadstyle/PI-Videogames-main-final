require("dotenv").config();
const { Router } = require("express");
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");
// const { getAllGames, getQueryGame } = require("./../utils/utils");

const router = Router();

router.get("/", async (req, res) => {
  let queryName = req.query.name;
  let gamesDb = await Videogame.findAll({
    include: Genre,
  });
  gamesDb = JSON.stringify(gamesDb);
  gamesDb = JSON.parse(gamesDb);

  gamesDb = gamesDb.reduce(
    (acc, e) =>
      acc.concat({
        ...e,
        genres: e.genres.map((e) => e.name),
      }),
    []
  );
  if (queryName) {
    try {
      let response = await axios.get(
        `https://api.rawg.io/api/games?search=${queryName}&key=${API_KEY}`
      );
      if (!response.data.count) {
        return res.status(204).json(`juego no encontrado ${queryName}`);
      }
      const gamesToFront = response.data.results.map((e) => {
        return {
          id: e.id,
          name: e.name,
          backgroundImage: e.background_image,
          rating: e.rating,
          genres: e.genres.map((e) => e.name),
          released: e.released,
        };
      });
      const gamesDbFilter = gamesDb.filter((e) =>
        e.name.toLowerCase().includes(queryName.toLowerCase())
      );
      console.log(gamesDbFilter, "Console");
      const results = [...gamesDbFilter, ...gamesToFront.splice(0, 15)];
      if (results.length <= 0)
        return res.status(400).send("No se encontraron juegos");
      return res.json(results);
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      let results = [...gamesDb];
      let response1 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`
      );
      let response2 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`
      );
      let response3 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`
      );
      let responses = [
        ...response1.data.results,
        ...response2.data.results,
        ...response3.data.results,
      ];
      responses = responses.map((e) => {
        return {
          id: e.id,
          name: e.name,
          backgroundImage: e.background_image,
          rating: e.rating,
          released: e.released,
          genres: e.genres.map((e) => e.name),
        };
      });
      results = [...results, ...responses];

      return res.json(results);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  }
});
router.get("*", (req, res) => {
  return res.status(404).json({ msg: `Not Found` });
});
module.exports = router;
