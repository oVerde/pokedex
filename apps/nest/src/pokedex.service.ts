import { Injectable } from '@nestjs/common'
import { LocationClient, PokemonClient, GameClient } from 'pokenode-ts'

@Injectable()
export class PokedexService {
  public readonly pokemon: PokemonClient
  public readonly location: LocationClient
  public readonly game: GameClient

  constructor() {
    this.pokemon = new PokemonClient()
    this.location = new LocationClient()
    this.game = new GameClient()
    // TODO: Add more wrapper methods as needed
  }
}
