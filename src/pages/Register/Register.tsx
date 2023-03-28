import { Link } from 'react-router-dom'

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  return (
    <>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Register
