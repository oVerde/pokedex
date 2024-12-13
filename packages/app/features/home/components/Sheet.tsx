import { Text, Button, Spinner, Sheet, YStack, Card, XStack } from '@my/ui'
import { ChevronDown, List, ChevronUp, Check } from '@tamagui/lucide-icons'
import { Pokemon } from '@my/shared'
import { useEffect, useState } from 'react'
import { useFetchPokemonList } from '@my/shared/hooks'

export function HomeSheet({ page, searchInput, setSearchInput }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [open, setOpen] = useState(false)
  const [_page, setPage] = useState<number>(page)
  const [position, setPosition] = useState(0)

  const { listing, isLoading: isLoading } = useFetchPokemonList(_page)

  useEffect(() => {
    if (open) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setFavorites(storedFavorites)
    }
  }, [open])

  useEffect(() => {
    setPage(page)
  }, [page])

  return (
    <>
      <Spinner height="$3" opacity={isLoading ? 1 : 0} animation="lazy" margin="$1" />

      <Button
        height="$2"
        icon={open ? ChevronDown : List}
        circular
        onPress={() => setOpen((x) => !x)}
      />

      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
          {/* Toggle Controls */}
          <YStack zi={0} t={30} l={10} gap="$4" position="absolute">
            <Button
              onPress={() => setShowFavorites(false)}
              variant={!showFavorites ? 'primary' : 'outlined'}
            >
              All Pokémon
            </Button>

            <Button
              onPress={() => setShowFavorites(true)}
              variant={showFavorites ? 'primary' : 'outlined'}
            >
              Favorites
            </Button>
          </YStack>

          {/* Conditionally Render Lists */}
          {showFavorites ? (
            /* Render Favorites List */
            favorites.length > 0 ? (
              <YStack animation="lazy" width={200} gap="$2">
                {favorites.map((pkmn: Pokemon) => (
                  <Card
                    hoverTheme
                    key={pkmn.name}
                    flexGrow={1}
                    onPress={() => {
                      setSearchInput(pkmn.name)
                      setOpen(false)
                    }}
                    cursor="pointer"
                  >
                    <Card.Header
                      display="flex"
                      ac="center"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Text>{pkmn.name}&nbsp;</Text>
                      {pkmn.name === searchInput ? <Check /> : null}
                    </Card.Header>
                  </Card>
                ))}
              </YStack>
            ) : (
              <Text>You have no favorite Pokémon yet.</Text>
            )
          ) : (
            /* Render Usual Listing */
            listing && (
              <YStack animation="lazy" width={200} gap="$2">
                {/* Pagination Up */}
                {_page > 1 && (
                  <Card
                    hoverTheme
                    cursor="pointer"
                    onPress={() => setPage((prev) => (prev - 10 >= 1 ? prev - 10 : 1))}
                  >
                    <Card.Header>
                      <ChevronUp />
                    </Card.Header>
                  </Card>
                )}

                {/* Pokémon List */}
                {listing.map((pkmn: Pokemon) => (
                  <Card
                    hoverTheme
                    key={pkmn.name}
                    flexGrow={1}
                    onPress={() => {
                      setSearchInput(pkmn.name)
                      setOpen(false)
                    }}
                    cursor="pointer"
                  >
                    <Card.Header
                      display="flex"
                      ac="center"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Text>{pkmn.name}&nbsp;</Text>
                      {pkmn.name === searchInput ? <Check /> : null}
                    </Card.Header>
                  </Card>
                ))}

                {/* Pagination Down */}
                <Card hoverTheme cursor="pointer" onPress={() => setPage((prev) => prev + 10)}>
                  <Card.Header>
                    <ChevronDown />
                  </Card.Header>
                </Card>
              </YStack>
            )
          )}
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
