import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated'
import { LoginIcon } from '../Icons'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

function Login() {
  const { loginWithRedirect, logout } = useAuth0()

  return (
    <>
      <IfAuthenticated>
        <FiLogOut size={30} onClick={() => logout()} />
      </IfAuthenticated>
      <IfNotAuthenticated>
        <FiLogIn size={30} onClick={() => loginWithRedirect()} />
      </IfNotAuthenticated>
    </>
  )
}

export default Login
