import axios from 'axios';
import { isEmpty } from 'lodash';

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
    const { data: { damage_relations : { 
      double_damage_from, 
      double_damage_to, 
      half_damage_from, 
      half_damage_to,
      no_damage_from,
      no_damage_to
    } } } = await requestAPI.get(cleanUrl(url));
    
    return {
      name,
      double_damage_from, 
      double_damage_to, 
      half_damage_from, 
      half_damage_to,
      no_damage_from,
      no_damage_to
    };
  }));

  return typesInfo.reduce((acc: any, type) => {
    acc.names = acc.names ? acc.names +  `, ${type.name}` : type.name;
    acc.no_damage_to = acc.no_damage_to ? acc.no_damage_to +  `, ${joinAttribute(type.no_damage_to, 'name')}` : joinAttribute(type.no_damage_to, 'name');
    acc.half_damage_to = acc.half_damage_to ? acc.half_damage_to +  `, ${joinAttribute(type.half_damage_to, 'name')}` : joinAttribute(type.half_damage_to, 'name');
    acc.double_damage_to = acc.double_damage_to ? acc.double_damage_to +  `, ${joinAttribute(type.double_damage_to, 'name')}` : joinAttribute(type.double_damage_to, 'name');
    acc.double_damage_from = acc.double_damage_from ? acc.double_damage_from +  `, ${joinAttribute(type.double_damage_from, 'name')}` : joinAttribute(type.double_damage_from, 'name');
    
    return acc;
  }, {})
};

const processMoves = (moves: any) => {
  return moves.map(({ move: { name } } : { move: { name: string } }) => name).sort();
};

const processSpecies = async (ogSpecies : PKTypeInternal) => {
  const { data: { evolution_chain: { url } } } = await requestAPI.get(cleanUrl(ogSpecies.url));

  if (url) {
    const { data: { chain: { species, evolves_to } } } = await requestAPI.get(cleanUrl(url));
    const { data: { order, name } } = await requestAPI.get(cleanUrl(species.url));
    const { data: { types } } = await requestAPI.get(`pokemon/${order}`);

    const evolutions = [{ name, types: types.map(({ type: { name } } : { type: { name : string } } ) => name).join(', ')}];

    const stage = await Promise.all(evolves_to.map(async (evolution: any) => {
      const { data: { order, name } } = await requestAPI.get(cleanUrl(evolution.species.url));
      const { data: { types } } = await requestAPI.get(`pokemon/${order}`);
      
      evolutions.push({ name, types: types.map(({ type: { name } } : { type: { name : string } } ) => name).join(', ')});

      if (!isEmpty(evolution.evolves_to)) {
        const { data: { order, name } } = await requestAPI.get(cleanUrl(evolution.evolves_to[0].species.url));
        const { data: { types } } = await requestAPI.get(`pokemon/${order}`);
        
        evolutions.push({ name, types: types.map(({ type: { name } } : { type: { name : string } } ) => name).join(', ')});
      }

    }));

    return evolutions;
    
  } else {
    return null;
  }
};

export const getPokemonInfo = async (id: number) => {
  try {
    const { data: { name, types, species, sprites, moves } } = await requestAPI.get(`pokemon/${id}`);

    const description = await getPokemonDescription(species);
    const typeInfo = await getPokemonType(types);
    const movesInfo = processMoves(moves);
    const evolutionTree = await processSpecies(species);

    return {
      description,
      ...evolutionTree && { evolutionTree },
      id,
      image: sprites.front_default,
      movesInfo,
      name,
      typeInfo
    };
  } catch (error) {
    console.log(error);

    return {};
  }
};

const cleanUrl = (url: string) => {
  return url.replace('https://pokeapi.co/api/v2/', '');
}

const joinAttribute = (data: any, attribute: string) => {
  return data.map((element: any) => {
    return element[attribute];
  }).join(', ');
};

