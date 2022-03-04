export class Entity {
    name: string = '';
    url: string = '';
  }

export class Type extends Entity {
    slot: number = 0;
    type: Type = {} as Type;
}
  export class Species extends Entity {
    evolves_from_species: Entity = {} as Entity;
}

export default class Pokedex extends Entity  {
    id: number = 0;
    height?: number;
    location_area_encounters?: string;
    base_experience?: number;
    order?: number
    species: Species = {} as Species;
    types?: Type[];
    weight?: number;
}

export class PokedexDataContract  {
    count: number = 0;
    results: Pokedex[] = [];
}
