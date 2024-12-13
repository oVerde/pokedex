import { Pokemon, PokemonForm, PokemonType } from 'pokenode-ts'

export interface PokemonDetails extends Pokemon, Omit<PokemonForm, 'sprites'> {
  japaneseName?: string
  types: PokemonType[]
  region?: string
}

export const generationToRegion: { [key: number]: string } = {
  1: 'Kanto',
  2: 'Johto',
  3: 'Hoenn',
  4: 'Sinnoh',
  5: 'Unova',
  6: 'Kalos',
  7: 'Alola',
  8: 'Galar',
}
