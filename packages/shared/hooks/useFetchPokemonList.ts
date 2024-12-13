import { NamedAPIResourceList } from 'pokenode-ts'
import { useState, useEffect } from 'react'
import { PokemonDetails } from '../types'
import { useToastController } from '@my/ui/src'

export function useFetchPokemonList(page: number = 1, limit: number = 8) {
  const [listing, setListing] = useState<Array<PokemonDetails>>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToastController()

  page = page - 4 > 0 ? page - 4 : 1

  useEffect(() => {
    setIsLoading(true)
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/pokemon/list?page=${page ?? ''}&limit=${limit ?? ''}`
        )
        const { results }: NamedAPIResourceList = await response.json()
        setListing(results as unknown as PokemonDetails[])
      } catch (error) {
        console.error(error)
        toast.show(`Error loading list`, {
          message: error.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemonList()
  }, [page, limit])

  return { listing, isLoading }
}
