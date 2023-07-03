import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, LogoIcon } from '@/components'
import { AUTH, PATHS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { authServices } from '@/services'
import { authUtils, formatErrorData } from '@/utils'

import {
  TCredentialForm,
  TCredentialFormSchema,
  credentialFormSchema,
  loginFormSchema
} from './validate'

const CredentialForm = () => {
  const { handleSetAccessToken } = useAuthContext()
  const matchLogin = useMatch(PATHS.LOGIN_PATH)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const loginMutation = useMutation({
    mutationFn: authServices.loginUser
  })
  const registerMutation = useMutation({
    mutationFn: authServices.registerUser
  })

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields }
  } = useForm<TCredentialFormSchema>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: (data, context, options) => {
      if (matchLogin) {
        return yupResolver(loginFormSchema)(data, context, options)
      }
      return yupResolver(credentialFormSchema)(data, context, options)
    },
    mode: 'all',
    shouldUnregister: true
  })

  useEffect(() => {
    reset()
    showPassword && setShowPassword(false)
    showConfirmPassword && setShowConfirmPassword(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchLogin, reset])

  const handleSubmitForm: SubmitHandler<TCredentialFormSchema> = async (data) => {
    const { email, password } = data

    try {
      matchLogin
        ? await loginMutation.mutateAsync(
            { email, password },
            {
              onSuccess({ data }) {
                // isLogging dùng để xác nhận người dùng đang logging ==> giúp lấy lại token
                authUtils.setItem(AUTH.IS_LOGGING, true)
                handleSetAccessToken(data.data.accessToken)
                toast.success(data.message)
                reset()

                // Already handle redirect into ProtectedRoute
              }
            }
          )
        : await registerMutation.mutateAsync(
            { email, password },
            {
              onSuccess(data) {
                reset()
                // Redirect to login page
                navigate(PATHS.LOGIN_PATH, { replace: true })
                toast.success(data.data.message)
              }
            }
          )
    } catch (error) {
      formatErrorData<TCredentialForm>(error, setError)
    }
  }

  const handleShowPassword = () => setShowPassword((prev) => !prev)

  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev)

  const renderError = (name: keyof TCredentialFormSchema) => {
    return (
      <span className="block min-h-[1.25rem] text-sm text-red-500">{errors[name]?.message}</span>
    )
  }

  const renderShowPassword = (flag: boolean, cb: () => void) =>
    !flag ? (
      <EyeOff
        className="absolute right-2 top-1/2 h-5 w-5 -translate-x-2 -translate-y-1/2 cursor-pointer  bg-inherit"
        onClick={cb}
      />
    ) : (
      <Eye
        className="absolute right-2 top-1/2 h-5 w-5 -translate-x-2 -translate-y-1/2 cursor-pointer"
        onClick={cb}
      />
    )

  const styleInput = (name: keyof TCredentialFormSchema) => {
    return classNames('p-3 pr-12 border rounded-sm focus:drop-shadow-md', {
      'border-neutral-400 focus:border-neutral-600': !errors[name],
      'bg-red-50 border-red-600': errors[name],
      '!border-green-500': dirtyFields[name] && !errors[name]
    })
  }

  return (
    <>
      <Helmet>
        <title>
          {matchLogin
            ? 'Đăng nhập tài khoản - Mua sắm Online | Shopee Việt Nam'
            : 'Đăng ký ngay | Shopee Việt Nam'}
        </title>
        <meta
          name="description"
          content={
            matchLogin
              ? 'Đăng nhập Tài khoản Shopee và tận hưởng ưu đãi độc quyền với giá cả hấp dẫn trên Shopee Việt Nam!'
              : 'Đăng ký tài khoản hôm nay và nhận ngay vô số deal và voucher độc quyền dành cho khách hàng mới trên Shopee Việt Nam!'
          }
          data-react-helmet="true"
        />
        <link
          rel="canonical"
          href={matchLogin ? PATHS.LOGIN_PATH : PATHS.REGISTER_PATH}
          data-react-helmet="true"
        />
      </Helmet>
      <form
        className="flex flex-col gap-3 rounded-sm bg-white p-8 shadow-md"
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate>
        <Link to={PATHS.HOME_PATH} className="sm:hidden">
          <LogoIcon className="mx-auto h-9 fill-primary" />
        </Link>
        <h1 className="py-3 text-xl font-medium max-sm:hidden">
          {matchLogin ? 'Đăng nhập' : 'Đăng ký'}
        </h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            className={styleInput('email')}
            {...register('email')}
          />
          {renderError('email')}
        </div>
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              className={styleInput('password')}
              autoComplete="on"
              {...register('password')}
            />
            {renderShowPassword(showPassword, handleShowPassword)}
          </div>
          {renderError('password')}
        </div>
        {!matchLogin && (
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                className={styleInput('confirmPassword')}
                autoComplete="on"
                {...register('confirmPassword')}
              />
              {renderShowPassword(showConfirmPassword, handleShowConfirmPassword)}
            </div>
            {renderError('confirmPassword')}
          </div>
        )}

        {/* Button */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
          className={classNames(
            'flex items-center justify-center rounded-sm bg-primary py-3 uppercase text-white',
            {
              'cursor-not-allowed opacity-80': !isValid || isSubmitting,
              'cursor-pointer hover:opacity-90': isValid && !isSubmitting
            }
          )}>
          {matchLogin ? 'Đăng nhập' : 'Đăng ký'}
        </Button>

        {/* Divide */}
        <div className="relative mt-1 h-[1px] bg-neutral-300 text-neutral-400">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1">
            Hoặc
          </span>
        </div>

        {/* Link */}
        <Link
          to={matchLogin ? PATHS.REGISTER_PATH : PATHS.LOGIN_PATH}
          className="mx-auto mt-1 text-sm text-primary hover:text-orange-400">
          {!matchLogin ? 'Đăng nhập' : 'Đăng ký'}
        </Link>
      </form>
    </>
  )
}

export default CredentialForm
