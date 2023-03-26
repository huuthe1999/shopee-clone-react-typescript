import { Outlet } from 'react-router-dom'

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <>
      <div>Home Page</div>
      <Outlet />
    </>
  )
}

export default Home
