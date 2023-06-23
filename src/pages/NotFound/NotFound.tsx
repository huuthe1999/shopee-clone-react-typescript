import { Link } from 'react-router-dom'

import { NotFoundIcon } from '@/components'
import { PATHS } from '@/constants'

const NotFound = () => {
  return (
    <div className="container m-auto flex h-full flex-col-reverse items-center justify-center gap-6 p-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-8 text-center text-primary md:text-left">
        <div className="text-6xl md:text-9xl">
          <span className="underline decoration-8 underline-offset-[1.125rem]">O</span>ops!
        </div>
        <p className="line-clamp-2 break-words md:text-3xl">
          Xin lỗi, trang bạn đang truy cập không tồn tại
        </p>
        <Link
          to={PATHS.HOME_PATH}
          replace
          className="mx-auto w-fit rounded-lg bg-primary px-4 py-2 text-white md:ml-0 md:px-8 md:py-4 md:text-xl">
          Trang chủ
        </Link>
      </div>
      <div className="flex flex-1 items-center">
        <NotFoundIcon className="m-auto aspect-square w-full" />
      </div>
    </div>
  )
}

export default NotFound
