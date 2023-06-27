import { ArrowLeft } from 'react-feather'
import { Link, useMatch, useNavigate } from 'react-router-dom'

import { LogoIcon } from '@/components'
import { PATHS } from '@/constants'

const Header = () => {
  const navigate = useNavigate()
  const match = useMatch(PATHS.LOGIN_PATH)

  return (
    <header className="bg-white px-4 py-6 max-sm:p-2">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <ArrowLeft
            className="mx-2 my-1 h-7 w-7 shrink-0 text-primary sm:hidden"
            onClick={() => {
              navigate(-1)
            }}
          />
          <Link to={PATHS.HOME_PATH} className="max-sm:hidden">
            <LogoIcon className="-mt-1 h-6 fill-primary lg:h-8" />
          </Link>
          <p className="text-xl lg:text-2xl">{match ? 'Đăng nhập' : 'Đăng ký'}</p>
        </div>
        <Link to="#" className="text-primary">
          Bạn cần giúp đỡ?
        </Link>
      </nav>
    </header>
  )
}

export default Header
