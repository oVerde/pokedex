import React from 'react'
import { Image, H2, H4, Paragraph, Tooltip, Text, Separator, XStack, YStack, Button } from '@my/ui'
import type { PokemonDetails } from '@my/shared'
import { Heart } from '@tamagui/lucide-icons'

interface PokemonDetailsProps {
  pokemon: PokemonDetails
  image: string | null
  color: string | null
  isHearted: boolean
  onHeartToggle: () => void
}

export const Details: React.FC<PokemonDetailsProps> = React.memo(
  ({ pokemon, image, color, isHearted, onHeartToggle }) => {
    return (
      <>
        <Separator />
        <XStack>
          <YStack gap="$4">
            {color && (
              <Image
                zi={1}
                w={250}
                h={250}
                source={{ uri: image || '', width: 250, height: 250 }}
              />
            )}
          </YStack>
          <Separator />
          <YStack position="relative" width={200}>
            <H4 zi={1}>#{pokemon.order}</H4>
            <H2>{pokemon.name.toUpperCase()}</H2>
            <Paragraph display="flex">
              Weight:{' '}
              <Tooltip>
                <Tooltip.Trigger>
                  <Text>&nbsp;{pokemon.weight ? pokemon.weight / 10 : 0} kg</Text>
                </Tooltip.Trigger>
                <Tooltip.Content>kilograms</Tooltip.Content>
              </Tooltip>
            </Paragraph>
            <Paragraph display="flex">
              Height:{' '}
              <Tooltip>
                <Tooltip.Trigger>&nbsp;{pokemon.height}0 cm</Tooltip.Trigger>
                <Tooltip.Content>centimeters</Tooltip.Content>
              </Tooltip>
            </Paragraph>
            <Paragraph position="absolute" rotate="270deg" t={70} r={450} w={200} $sm={{ r: 340 }}>
              Region: {pokemon.region}
            </Paragraph>
            <Paragraph
              position="absolute"
              t={0}
              r={95}
              zi={0}
              opacity={0.5}
              fontSize={80}
              fontWeight={900}
              color="$color.black025"
              display="inline-flex"
              width={450}
              textWrap="nowrap"
              ov="visible"
              $sm={{ t: 220, r: 30, w: 400 }}
            >
              {pokemon.japaneseName}
            </Paragraph>
            <Paragraph>Type: {pokemon.types}</Paragraph>
          </YStack>
          <Button unstyled onPress={onHeartToggle}>
            <Heart zi={4} display="block" cursor="pointer" fill={isHearted ? 'white' : undefined} />
          </Button>
        </XStack>
      </>
    )
  }
)
