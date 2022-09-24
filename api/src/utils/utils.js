require("dotenv").config();
const { API_KEY } = process.env;
const { default: axios } = require("axios");
const { Videogame, Genre } = require("../db");

const mapeo = (response) =>{
   let maps = response.data.results.map( e=>{
    return {
        
    }
   })
}

module.exports = {
  getAllGames: async () => {
    let gamesDb = await Videogame.findAll({ include: Genre });
    let apiResponse = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    let pages = 0;
    let results = [...gamesDb];
    while (pages < 3) {
      pages++;
      let gamePage = mapeo(apiResponse);
      results = [...results, ...gamePage];
      apiResponse = await axios.get(apiResponse.data.next);
    }
    return results;
  },
};
