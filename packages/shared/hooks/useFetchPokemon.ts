import { useState, useEffect } from 'react'
import type { Pokemon, PokemonDetails } from '@my/shared'
import { useToastController } from '@my/ui/src'

export function useFetchPokemon(pokemonName: string) {
  const [pokemon, setPokemon] = useState<Array<PokemonDetails> | undefined>(undefined)
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const toast = useToastController()

  useEffect(() => {
    if (pokemonName.trim() === '') {
      setImage(null)
      setPokemon(undefined)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const fetchData = async () => {
      try {
        const [imageRes, detailsRes] = await Promise.all([
          fetch(`http://localhost:4000/api/pokemon/image/${pokemonName.toLowerCase()}`),
          fetch(`http://localhost:4000/api/pokemon/${pokemonName.toLowerCase()}`),
        ])

        if (!imageRes.ok || !detailsRes.ok) {
          throw { message: 'Failed to fetch Pokémon data', status: 404 }
        }

        const imageData = await imageRes.json()
        const detailsData: PokemonDetails[] = await detailsRes.json()

        setError(false)
        setImage(imageData.image_url)
        setPokemon(detailsData)
      } catch (err) {
        setError(true)

        console.error(err)

        if (err.status != 404) {
          toast.show(`Error loading pokemon`, {
            message: err.message,
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [pokemonName])

  return { pokemon, image, isLoading, error }
}
