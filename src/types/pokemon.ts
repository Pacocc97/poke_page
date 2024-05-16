export interface Pokemon {
  id?: string;
  pokemon_id: string;
  name: string;
  types: string[];
  abilities: string[];
  base_stats: { [key: string]: number };
  height: number;
  weight: number;
  sprite_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokeDex {
  score: number;
  results: Pokemon[];
}
