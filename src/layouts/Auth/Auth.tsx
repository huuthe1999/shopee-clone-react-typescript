import { Footer } from '@/layouts/Footer'
import { Header } from '@/layouts/Header'

interface HeaderProps {
  children?: React.ReactElement
}

const Auth = ({ children }: HeaderProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Auth
