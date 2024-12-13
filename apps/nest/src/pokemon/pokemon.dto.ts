import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class GetPokemonName {
  @IsString()
  @Length(1, 50, { message: 'Pokemon name must be between 1 and 50 characters' })
  name: string
}

export class ListPokemon {
  @IsOptional()
  @IsString()
  @Length(1, 5, { message: 'Invalid Page' })
  page?: number

  @IsOptional()
  @IsString()
  @Length(1, 5, { message: 'Invalid Limit' })
  limit?: number
}
