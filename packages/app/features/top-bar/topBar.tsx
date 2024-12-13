import { Avatar, XStack, H3, Dialog, Form, Input, Button } from '@my/ui'
import { User, XCircle } from '@tamagui/lucide-icons'
import { useState } from 'react'

export function Topbar() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [avatarImage, setAvatarImage] = useState<string | null>(null)

  const handleLogin = async () => {
    // Dummy API call
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      })
      const result = await response.json()
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user))
        setIsDialogOpen(false)
        setErrorMessage('')
        setAvatarImage(
          'https://play-lh.googleusercontent.com/raxAKUizgKdpP251_wVHSpaFWuJA5hicSnhGI-yxtAAuLD1auue_DzCf3qmlsGPKVA=s48-rw'
        ) // Mocked avatar etc.
      } else {
        setErrorMessage(result.message || 'Invalid credentials')
        // Show error message
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later')
    }
  }

  return (
    <>
      <XStack
        backgroundColor={'$color.black2'}
        jc="space-between"
        ai="center"
        display="flex"
        p="$2"
      >
        <H3>Pokédex</H3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <Avatar circular size="$3" cursor="pointer">
              {avatarImage ? (
                <Avatar.Image src={avatarImage} />
              ) : (
                <Avatar.Fallback p="$2">
                  <User />
                </Avatar.Fallback>
              )}
            </Avatar>
          </Dialog.Trigger>
          <Dialog.Portal aria-modal>
            <Dialog.Overlay />
            <Dialog.Content aria-modal gap="$7">
              <Dialog.Close cursor="pointer">
                <XCircle marginLeft="auto" />
              </Dialog.Close>
              <Dialog.Title position="absolute" zi={1}>
                Sign Up
              </Dialog.Title>
              <Dialog.Description>Create an account and collect them'all</Dialog.Description>
              <Form onSubmit={handleLogin} gap="$3" id="Signin">
                <Input
                  placeholder="test@rainapp.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <Input
                  placeholder="rainapp"
                  value={password}
                  onChangeText={setPassword}
                  keyboardType="visible-password"
                  secureTextEntry
                />
                <Form.Trigger>
                  <Button>Sign In/Up</Button>
                </Form.Trigger>
              </Form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </XStack>
    </>
  )
}
