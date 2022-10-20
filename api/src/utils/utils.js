require("dotenv").config();
const { API_KEY } = process.env;
const { default: axios } = require("axios");
const { Videogame, Genre, Platform } = require("../db");

module.exports = {
  getGameParams: async (id) => {
    if (id.includes("-")) {
      let gamesDb = await Videogame.findOne({
        where: {
          id: id,
        },
        include: Genre,
      });
      gamesDb = JSON.stringify(gamesDb);
      gamesDb = JSON.parse(gamesDb);

      gamesDb.genres = gamesDb.genres.map((e) => e.name);

      return gamesDb;
      // }
    } else {
      try {
        let gameParams = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        let {
          name,
          description_raw: description,
          platforms,
          rating,
          background_image,
          genres,
          released: releaseDate,
        } = gameParams.data;
        platforms = platforms.map((e) => e.platform.name);
        genres = genres.map((e) => e.name);
        let game = {
          name,
          description,
          platforms,
          rating,
          background_image,
          genres,
          releaseDate,
        };
        return game;
      } catch (e) {
        console.log(e + "/getParams");
      }
    }

    throw "ID incorrecta";
  },
  getGenres: async () => {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = apiGenres.data.results;
    genres.forEach(async (e) => {
      await Genre.findOrCreate({
        where: { name: e.name },
      });
    });
    const dbGenres = await Genre.findAll();
    if (dbGenres.length > 0) return dbGenres;
    throw "Not found db";
  },
  gamePost: async (data) => {
    let {
      name,
      description,
      backgroundImage,
      releaseDate,
      rating,
      genres,
      createdInDb,
      platforms,
    } = data;
    if (name && description && backgroundImage && genres && platforms) {
      platforms = platforms.join(", ");
      const gameDb = await Videogame.create({
        name,
        description,
        backgroundImage,
        releaseDate,
        rating,
        platforms,
        createdInDb,
      });
      const gameGenre = await Genre.findAll({
        where: {
          name: genres,
        },
      });

      await gameDb.addGenres(gameGenre);
    } else {
      throw "Datos incorrectos";
    }
  },
  getPlatforms: async () => {
    const platformsDb = await Platform.findAll();
    if (platformsDb.length > 0) return platformsDb;

    let response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    let platforms = response.data.results;

    platforms.forEach(async (e) => {
      await Platform.findOrCreate({
        where: { name: e.name },
      });
    });
    return platforms;
  },
};
