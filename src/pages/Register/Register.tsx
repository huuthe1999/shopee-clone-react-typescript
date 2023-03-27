import { Link } from 'react-router-dom'

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  return (
    <>
      <div>Register</div>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Register
