interface Pokemon {
  id: number,
  name: string,
  movesInfo: string[],
  image: string,
  types: TypeInfo,
  description: string
  evolutionTree?: EvolutionTree[]
}
