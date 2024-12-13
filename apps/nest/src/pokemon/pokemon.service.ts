import { Injectable, NotFoundException } from '@nestjs/common'
import { PokedexService } from '../pokedex.service'
import { Generation, Pokemon, PokemonDetails, PokemonType, Region } from '@my/shared'

@Injectable()
export class PokemonService {
  constructor(private readonly pokedexService: PokedexService) {}

  async fetchPokemonImage(pokemonName: string): Promise<string> {
    try {
      const pokemon: Pokemon = await this.pokedexService.pokemon.getPokemonByName(pokemonName)
      return pokemon.sprites.other?.['official-artwork']?.front_default || 'default-image-url'
    } catch (error) {
      throw new NotFoundException(`Error fetching Pokémon image: ${error.message}`)
    }
  }

  async listPokemon(page = 1, limit = 8) {
    try {
      return await this.pokedexService.pokemon.listPokemons(page - 1, limit)
    } catch (error) {
      throw new Error(`Error fetching pokedex: ${error.message}`)
    }
  }

  async getPokemonDetails(pokemonName: string): Promise<PokemonDetails | any> {
    try {
      const pokemon = await this.pokedexService.pokemon.getPokemonByName(pokemonName)
      const form = await this.pokedexService.pokemon.getPokemonFormByName(pokemonName)
      const species = await this.pokedexService.pokemon.getPokemonSpeciesByName(pokemonName)
      const generation: Generation = await this.pokedexService.game.getGenerationByName(
        species.generation.name
      )
      const region: Region = await this.pokedexService.location.getRegionByName(
        generation.main_region.name
      )

      // Extract Japanese Name
      const japaneseNameEntry = species.names.find((name) => name.language.name === 'ja')
      const japaneseName = japaneseNameEntry ? japaneseNameEntry.name : pokemon.name

      // Extract Types
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name + ' ')

      return {
        ...pokemon,
        ...species,
        ...form,
        japaneseName,
        types: types as unknown as PokemonType[],
        region: region.name,
      }
    } catch (error) {
      throw new NotFoundException(`Error fetching Pokemon: ${error.message}`)
    }
  }

  //TODO: Add more data fetching as required
}
