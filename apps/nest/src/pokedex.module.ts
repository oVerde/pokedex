import { Module, Global } from '@nestjs/common'
import { PokedexService } from './pokedex.service'

@Global()
@Module({
  imports: [PokedexModule],
  providers: [PokedexService],
  exports: [PokedexService],
})
export class PokedexModule {}
