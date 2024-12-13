import { useCallback, useEffect, useState } from 'react'
import { H1, XStack, YStack, Input, Spinner, useToastState } from '@my/ui'
import useColorThief from 'use-color-thief'
import type { Pokemon } from '@my/shared'
import { useDebounce } from '@my/shared'
import { useFetchPokemon, useFetchPokemonList } from '@my/shared/hooks'
import { HomeSheet, Details } from './components'

export function HomeScreen() {
  const [searchInput, setSearchInput] = useState('')
  const [isHearted, setIsHearted] = useState(false)

  const debouncedSearchInput = useDebounce(searchInput, 550)
  const { pokemon, image, isLoading, error } = useFetchPokemon(debouncedSearchInput)

  useEffect(() => {
    if (pokemon) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const isFavorited = favorites.some((fav) => fav.id === pokemon.id)
      setIsHearted(isFavorited)
    }
  }, [pokemon])

  const { palette } = useColorThief(image ?? '', {
    format: 'hex',
    colorCount: 2,
    quality: 10,
  })

  const color = palette && palette.length > 0 ? palette[0] : null

  const toggleHeart = useCallback(() => {
    if (!pokemon) return
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isHearted) {
      // Remove from favorites
      favorites = favorites.filter((fav: any) => fav.id !== pokemon.id)
    } else {
      // Add to favorites
      favorites.push(pokemon)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsHearted(!isHearted)
  }, [pokemon, isHearted])

  return (
    <YStack
      f={1}
      jc="center"
      ai="center"
      gap="$8"
      p="$4"
      bg="$background"
      backgroundColor={(color as any) ?? 'unset'}
    >
      <YStack gap="$4">
        <H1 ta="center" col="$color12">
          Which Pokémon are you looking for?
        </H1>
        <XStack display="flex" justifyContent="center" alignContent="center" alignItems="center">
          <Input
            focusVisibleStyle={{ outlineColor: error ? '$color.red10Dark' : '$outlineColor' }}
            aria-label="Pokémon search input"
            value={searchInput}
            flexGrow={1}
            onChangeText={setSearchInput}
            placeholder="Pokémon's Name or Number"
          />
          <Spinner
            position="absolute"
            opacity={isLoading ? 1 : 0}
            aria-busy={isLoading}
            animation="lazy"
            margin="$1"
          />
        </XStack>
      </YStack>
      {color && pokemon?.name && (
        <Details
          pokemon={pokemon}
          image={image}
          color={color as string}
          isHearted={isHearted}
          onHeartToggle={toggleHeart}
        />
      )}
      <HomeSheet
        page={pokemon?.id ?? 1}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </YStack>
  )
}
