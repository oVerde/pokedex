import { CustomToast } from '@my/ui'
import { HomeScreen } from 'app/features/home/HomeScreen'
import { Topbar } from 'app/features/top-bar/topBar'

export function Layout() {
  return (
    <>
      <Topbar />
      <HomeScreen />
    </>
  )
}
