import axios from "axios";

export const requestAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

const getPokemonDescription = async ({ url } : { url: string}) => {
  const { data }: any = await requestAPI.get(cleanUrl(url));
  const fixed = (data.flavor_text_entries.find(({ language: { name } }: PKName) => name === 'es').flavor_text as string).replace(
    /(?:\r\n|\r|\n)/g,
    ' '
  );

  return fixed;
};

const getPokemonType = async (types : PKType[]) => {

  const typesInfo = await Promise.all(types.map(async ({ type: { name, url } }) => {

    const { data: { 
      double_damage_from, 
      double_damage_to, 
      half_damage_from, 
      half_damage_to,
      no_damage_from,
      no_damage_to
    } } = await requestAPI.get(cleanUrl(url));
    
    return {
      name,
      double_damage_from, 
      double_damage_to, 
      half_damage_from, 
      half_damage_to,
      no_damage_from,
      no_damage_to

    }
  }));

  return typesInfo.reduce((acc: any, type) => {
    acc.names = acc.names ? acc.names +  `, ${type.name}` : type.name;

    return acc;
  }, {})
}

export const getPokemonInfo = async (id: number) => {
  const { data: { name, types, species, moves } } = await requestAPI.get(`pokemon/${id}`);

  const description = await getPokemonDescription(species);

  console.log({ name, types, species, moves })
  return {
    description
  };
};

const cleanUrl = (url: string) => {
  return url.replace('https://pokeapi.co/api/v2/', '');
}
