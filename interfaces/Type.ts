interface Type {
  name: string,
  damage_relations: {
    double_damage_from: Info[],
    double_damage_to: Info[],
    half_damage_from: Info[],
    half_damage_to: Info[],
    no_damage_from: Info[],
    no_damage_to: Info[]
  }
};
