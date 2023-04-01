import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div>Home Page</div>
      <Outlet />
    </>
  )
}

export default Home
