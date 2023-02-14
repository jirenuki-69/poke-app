interface Pokemon {
  id: number,
  name: string,
  movesInfo: string[],
  image: string,
  typeInfo: TypeInfo,
  description: string
  evolutionTree?: EvolutionTree[]
}
