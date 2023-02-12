import axios from "axios";

export const requestAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});
