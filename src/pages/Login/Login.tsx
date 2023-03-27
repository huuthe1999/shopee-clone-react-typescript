import { Link } from 'react-router-dom'

interface LoginProps {}

const Login = (props: LoginProps) => {
  console.log('🚀 ~ Login ~ Login:')

  return (
    <>
      <div>Login</div>
      <Link to="/register">Register</Link>
    </>
  )
}

export default Login
