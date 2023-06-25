import { Link, useMatch } from 'react-router-dom'

import { LogoIcon } from '@/components'
import { PATHS } from '@/constants'

const Header = () => {
  const match = useMatch(PATHS.LOGIN_PATH)

  return (
    <header className="bg-white px-4 py-6">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={PATHS.HOME_PATH}>
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
