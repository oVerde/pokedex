import { Controller, Get, Param, Query } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { GetPokemonName, ListPokemon } from './pokemon.dto'
import { Pokemon } from '@my/shared'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemon: PokemonService) {}

  @Get('list')
  async listPokemon(@Query() params: ListPokemon) {
    const { page, limit } = params
    return this.pokemon.listPokemon(page, limit)
  }

  @Get('image/:name')
  async fetchPokemonImage(@Param() params: GetPokemonName) {
    const { name } = params
    const image_url = await this.pokemon.fetchPokemonImage(name.toLowerCase())
    return { image_url }
  }

  @Get(':name')
  async getPokemonDetails(@Param() params: GetPokemonName): Promise<Pokemon> {
    const { name } = params
    return this.pokemon.getPokemonDetails(name.toLowerCase())
  }

  // TODO: add more methods when necessary
}
