import axios from "axios";
export const VIDEOGAMES = "VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_DETAILS = "GET_DETAILS";
export const GENRES_FILTER = "GENRES_FILTER";
export const CREATED_FILTER = "CREATED_FILTER";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const SET_LOADING = "SET_LOADING";
export const RESET_STATE = "RESET_STATE";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get("/videogames");
      dispatch(setLoading(false));
      return dispatch({
        type: VIDEOGAMES,
        payload: response.data,
      });
    } catch (e) {
      console.log("getVideogames" + e);
    }
  };
};

export const getDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/videogame/${id}`);
      dispatch(setLoading(false));
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      console.log(`getDetails ${e}`);
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const response = await axios.get("/genres");
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
};
export const getPlatforms = () => {
  return async (dispatch) => {
    const response = await axios.get("/platforms");
    return dispatch({
      type: GET_PLATFORMS,
      payload: response.data,
    });
  };
};

export const genresFilter = (payload) => {
  return {
    type: GENRES_FILTER,
    payload,
  };
};

export const createdFilter = (payload) => {
  return {
    type: CREATED_FILTER,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const getVideogamesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/videogames?name=${name}`);
      return dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (e) {
      console.log(`getVideogamesByName: ${name}`);
    }
  };
};

export const postVideogame = (payload) => {
  return async () => {
    const response = await axios.post("/videogame", payload);
    return response;
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};
