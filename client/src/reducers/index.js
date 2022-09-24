import {
  CREATED_FILTER,
  VIDEOGAMES,
  GENRES_FILTER,
  ORDER_BY_NAME,
  GET_BY_NAME,
  POST_VIDEOGAME,
  GET_GENRES,
  GET_PLATFORMS,
  GET_DETAILS,
  SET_LOADING,
  RESET_STATE,
} from "../actions";

const initialState = {
  videogames: [],
  allGames: [],
  vgFilter: [],
  genres: [],
  platforms: [],
  details: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allGames: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GENRES_FILTER:
      const allGames = state.allGames;
      const genresFilter =
        action.payload === "All"
          ? allGames
          : allGames.filter((e) => e.genres.includes(action.payload));
      return {
        ...state,
        videogames: genresFilter,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
      };
    case CREATED_FILTER:
      const games = state.allGames;
      const createdFilter =
        action.payload === "DB"
          ? games.filter((e) => e.createdInDb)
          : games.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames: action.payload === "All" ? state.allGames : createdFilter,
      };
    case ORDER_BY_NAME:
      if (action.payload === "rating") {
        let sorted = state.videogames.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (b.rating > a.rating) return 1;
          return 0;
        });
        return {
          ...state,
          videogames: sorted,
        };
      } else {
        let sorted =
          action.payload === "asc"
            ? state.videogames.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : state.videogames.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              });
        return {
          ...state,
          videogames: sorted,
        };
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case RESET_STATE:
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default rootReducer;
