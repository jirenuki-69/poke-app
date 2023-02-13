import axios from "axios";

export const requestAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export const getPokemonDescription = async (id: number) => {
  const { data }: any = await requestAPI.get(`pokemon-species/${id}`);

  const fixed = (data.flavor_text_entries[0].flavor_text as string).replace(
    /(?:\r\n|\r|\n)/g,
    ' '
  );

  return fixed;
};
