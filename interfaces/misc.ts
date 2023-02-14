interface PKName {
  language: {
    name: string
  }
};

interface PKTypeInternal {
  name: string,
  url: string
}

interface PKType {
  slot: number,
  type: PKTypeInternal
};

interface EvolutionTree {
  name: string,
  types: string
};

