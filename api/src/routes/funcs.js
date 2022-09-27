require("dotenv").config();
const { API_KEY } = process.env;
const { default: axios } = require("axios");
const { Videogame, Genre, Platform } = require("../db");

const mapeo = (respuesta) => {
  let maps = respuesta.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      released: e.released,
      backgroundImage: e.background_image,
      rating: e.rating,
      platforms: e.platforms.map((e) => e.platform.name),
      genres: e.genres.map((e) => e.name),
    };
  });
  return maps;
};
module.exports = {
  // getAllGames: async () => {
  //   let gamesDb = await Videogame.findAll({ include: Genre });
  //   let apiResponse = await axios.get(
  //     `https://api.rawg.io/api/games?key=${API_KEY}`
  //   );
  //   let pages = 0;
  //   let results = [...gamesDb];
  //   while (pages < 5) {
  //     pages++;
  //     let gamePage = mapeo(apiResponse);
  //     results = [...results, ...gamePage];
  //     apiResponse = await axios.get(apiResponse.data.next);
  //   }
  //   return results;
  // },
  // getQueryGame: async (queryName) => {
  //   queryName = queryName.toLowerCase();
  //   let queryGame = await axios.get(
  //     `https://api.rawg.io/api/games?search=${queryName}&key=${API_KEY}`
  //   );
  //   queryGame = mapeo(queryGame);
  //   if (queryGame.length > 0) {
  //     return queryGame;
  //   }
  //   throw "Juego no encontrado";
  // },
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
      // if (gamesDb.length) {
      console.log(gamesDb);
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

    // if (id.includes("-")) {
    //   let gamesDb = await Videogame.findOne({
    //     where: { id: id },
    //     include: Genre,
    //   });
    //   gamesDb = JSON.stringify(gamesDb);
    //   gamesDb = JSON.parse(gamesDb);

    //   gamesDb.genres = gamesDb.genres.map((e) => e.name);
    //   return gamesDb;
    // } else {
    //   try {
    //     const response = await axios.get(
    //       `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    //     );
    //     let {
    //       id,
    //       name,
    //       description,
    //       background_image,
    //       genres,
    //       released: releaseDate,
    //       rating,
    //       platforms,
    //     } = response.data;
    //     genres = genres.map((e) => e.name);
    //     platforms = platforms.map((e) => e.name);

    //     return {
    //       id,
    //       name,
    //       description,
    //       background_image,
    //       genres,
    //       releaseDate,
    //       rating,
    //       platforms,
    //     };
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
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
    // if (data) {
    //   const newGame = await Videogame.create({
    //     name: data.name,
    //     description: data.description,
    //     releaseDate: data.releaseDate,
    //     rating: data.rating ? data.rating : null,
    //     platforms: data.platforms.join(", "),
    //     createdInDb: data.createdInDb,
    //     backgroundImage: data.backgroundImage,
    //   });
    //   await newGame.addGenres(data.genres);
    //   return true;
    // }
    // return false;
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
    await gameDb.addGenre(gameGenre);
  },
  getPlatforms: async () => {
    const platformsDb = await Platform.findAll();
    if (platformsDb.length > 0) return platformsDb;

    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const platforms = response.data.results;

    platforms.forEach(async (e) => {
      await Platform.findOrCreate({
        where: { name: e.name },
      });
    });
    return platforms;
  },
};
