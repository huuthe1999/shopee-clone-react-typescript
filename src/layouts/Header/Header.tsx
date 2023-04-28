import { Link, useMatch } from 'react-router-dom'

import { LogoIcon } from '@/components'
import { PATHS } from '@/constants'

const Header = () => {
  const match = useMatch(PATHS.LOGIN_PATH)

  return (
    <header className="bg-white py-6 px-4">
      <nav className="mx-auto max-w-6xl flex flex-row items-end justify-between">
        <div className="flex items-center gap-4">
          <Link to={PATHS.HOME_PATH}>
            <LogoIcon className="h-6 lg:h-8 fill-primary -mt-1" />
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
