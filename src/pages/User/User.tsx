import React from 'react'

import { motion } from 'framer-motion'
import { Edit2, ShoppingBag, User as UserIcon } from 'react-feather'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Avatar, DropdownMenu, MenuItem, MyErrorBoundary } from '@/components'
import { PATHS } from '@/constants'
import { useProfileQuery } from '@/hooks'

const User = () => {
  const { data, isFetching, isRefetching } = useProfileQuery()
  const profile = data?.data.data
  const { pathname } = useLocation()

  const navigate = useNavigate()

  if (PATHS.USER_PATTERN.test(pathname)) {
    // Automatically redirect from relative "/user" to "/user/profile"
    return <Navigate to={PATHS.USER_PROFILE_PATH} replace />
  }

  return (
    <>
      <div className="mx-auto flex min-h-[16rem] max-w-6xl flex-col gap-4 py-4 md:flex-row">
        <div className="shrink-0 basis-full md:basis-[11.25rem]">
          {/* Edit profile */}
          <div className="flex flex-nowrap gap-x-2 py-4">
            <Link
              to={PATHS.USER_PROFILE_PATH}
              className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-primary ring-1 ring-primary ring-offset-1 ring-offset-secondary">
              <Avatar
                letter={profile?.name?.[0]}
                image={profile?.avatar}
                isLoading={isFetching || isRefetching}
                className="h-full w-full"
              />
            </Link>
            {/* Info */}
            <div className="flex flex-grow flex-col gap-y-1 text-xs">
              <p className="beak-normal line-clamp-1 whitespace-break-spaces font-extrabold text-zinc-800 md:break-all">
                {profile?.name}
              </p>
              <Link to={PATHS.USER_PROFILE_PATH} className="flex flex-nowrap items-center gap-x-1">
                <Edit2 className="fill-zinc-500 text-zinc-500" size={16} />
                <span className="text-sm capitalize text-zinc-500">Sửa hồ sơ</span>
              </Link>
            </div>
          </div>
          {/* Tabs */}
          <DropdownMenu className="!overflow-hidden border-none !bg-transparent capitalize !shadow-none">
            <MenuItem
              text="Tài khoản của tôi"
              onClick={() => {
                navigate(PATHS.USER_PROFILE_PATH)
              }}
              className="capitalize hover:bg-transparent"
              leftButtonIcon={<UserIcon className="shrink-0 text-blue-700" size={20} />}
            />
            <motion.div
              className="flex flex-col pl-7"
              animate={{ height: pathname.includes(PATHS.USER_ACCOUNT_PATH) ? 'auto' : 0 }}
              transition={{ type: 'tween' }}>
              <MenuItem
                text="Hồ sơ"
                to={PATHS.USER_PROFILE_PATH}
                className="capitalize hover:bg-transparent"
              />
              <MenuItem
                text="Địa chỉ"
                to={PATHS.USER_ADDRESS_PATH}
                className="capitalize hover:bg-transparent"
              />
              <MenuItem
                text="Đổi mật khẩu"
                to={PATHS.USER_PASSWORD_PATH}
                className="capitalize hover:bg-transparent"
              />
            </motion.div>
          </DropdownMenu>
          <DropdownMenu className="border-none !bg-transparent capitalize !shadow-none">
            <MenuItem
              text="Đơn mua"
              to={PATHS.USER_PURCHASE_PATH}
              className="capitalize hover:bg-transparent"
              leftButtonIcon={<ShoppingBag className="mr-2 shrink-0 text-blue-700" size={20} />}
            />
          </DropdownMenu>
        </div>
        <div className="basis-full bg-white shadow-md">
          <MyErrorBoundary>
            <React.Suspense
              fallback={
                <div className="flex h-full items-center">
                  <div className="dots m-auto h-full animate-[dots_1s_linear_infinite] text-center" />
                </div>
              }>
              <Outlet />
            </React.Suspense>
          </MyErrorBoundary>
        </div>
      </div>
    </>
  )
}

export default User
