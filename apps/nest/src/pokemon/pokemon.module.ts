import { Module } from '@nestjs/common'
import { PokemonController } from './pokemon.controller'
import { PokemonService } from './pokemon.service'
import { PokedexModule } from '../pokedex.module'

@Module({
  imports: [PokedexModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
