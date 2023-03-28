interface Props {}
import { EyeSlashIcon } from '@heroicons/react/24/solid'
import { Link, useMatch } from 'react-router-dom'

import { PATHS } from '@/constants'

const CredentialForm = (props: Props) => {
  const matchLogin = useMatch(PATHS.LOGIN_PATH)
  return (
    <form className="p-8 bg-white rounded-sm shadow-md flex flex-col gap-4">
      <h2 className="font-medium text-xl py-3">{matchLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
      <div>
        <input
          type="text"
          placeholder="Email"
          className="p-3 border border-neutral-400 rounded-sm focus:drop-shadow-md focus:border-neutral-600"
        />
        <span className="text-red-500 mt-1 text-sm inline-block">Vui lòng điền vào mục này.</span>
      </div>
      <div className="relative">
        <input
          type="password"
          placeholder="Mật khẩu"
          className="p-3 border border-neutral-400 rounded-sm focus:drop-shadow-md focus:border-neutral-600"
        />
        <EyeSlashIcon className="absolute w-6 h-6 right-2 top-1/2 -translate-x-2 -translate-y-full cursor-pointer" />
        <span className="text-red-500 mt-1 text-sm inline-block">Vui lòng điền vào mục này.</span>
      </div>
      {!matchLogin && (
        <div className="relative">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="p-3 border border-neutral-400 rounded-sm focus:drop-shadow-md focus:border-neutral-600"
          />
          <EyeSlashIcon className="absolute w-6 h-6 right-2 top-1/2 -translate-x-2 -translate-y-full cursor-pointer" />
          <span className="text-red-500 mt-1 text-sm inline-block">Vui lòng điền vào mục này.</span>
        </div>
      )}

      {/* Button */}
      <button className="bg-primary uppercase py-3 text-white rounded-sm hover:opacity-90">
        {matchLogin ? 'Đăng nhập' : 'Đăng ký'}
      </button>

      {/* Divide */}
      <div className="bg-neutral-300 h-[1px] mt-1 relative text-neutral-400">
        <span className="absolute top-1/2 left-1/2 bg-white p-2 -translate-x-1/2 -translate-y-1/2">
          Hoặc
        </span>
      </div>

      {/* Link */}
      <Link
        to={matchLogin ? PATHS.REGISTER_PATH : PATHS.LOGIN_PATH}
        className="mx-auto text-primary hover:text-orange-400 text-sm">
        {!matchLogin ? 'Đăng nhập' : 'Đăng ký'}
      </Link>
    </form>
  )
}

export default CredentialForm
