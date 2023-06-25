import classNames from 'classnames'
import { ArrowLeft } from 'react-feather'
import { useMatch, useNavigate } from 'react-router-dom'

import { PATHS } from '@/constants'

const Header = () => {
  const matchHomePath = useMatch(PATHS.HOME_PATH)
  const navigate = useNavigate()

  return (
    <header
      className={classNames(
        'sticky top-0 z-[100] hidden flex-nowrap items-center gap-x-2 bg-white p-2 shadow-sm',
        {
          'max-sm:flex': !matchHomePath
        }
      )}>
      <ArrowLeft
        className="mx-2 my-1 h-7 w-7 shrink-0 text-primary"
        onClick={() => {
          navigate(-1)
        }}
      />
      <p className="line-clamp-1 break-all">ddddddd</p>
    </header>
  )
}

export default Header
