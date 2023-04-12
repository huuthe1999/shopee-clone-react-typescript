import { Outlet } from 'react-router-dom'

import { AUTH } from '@/constants'
import { useLocalStorage } from '@/hooks'

const Home = () => {
  const [state] = useLocalStorage(AUTH.ACCESS_TOKEN)
  return (
    <>
      <div>Home Page</div>
      <Outlet />
    </>
  )
}

export default Home
