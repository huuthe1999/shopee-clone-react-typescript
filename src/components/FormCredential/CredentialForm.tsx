import { useEffect, useState } from 'react'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useMatch } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoadingIcon } from '@/components/Icon'
import { PATHS } from '@/constants'
import { authServices } from '@/services'
import { formatErrorData } from '@/utils'

import {
  TCredentialFormRegister as TCredentialForm,
  TCredentialFormLogin,
  credentialFormSchema,
  loginFormSchema
} from './validate'

const CredentialForm = () => {
  const matchLogin = useMatch(PATHS.LOGIN_PATH)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const loginMutation = useMutation({ mutationFn: authServices.loginUser })

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields }
  } = useForm<TCredentialForm>({
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
    shouldUnregister: true,
    resetOptions: {
      keepDefaultValues: true
    }
  })

  useEffect(() => {
    reset()
  }, [matchLogin, reset])

  const handleSubmitForm: SubmitHandler<TCredentialForm> = async (data) => {
    if (matchLogin) {
      const { confirmPassword, ...credentials } = data
      try {
        const res = await loginMutation.mutateAsync(credentials)
        toast.success(res.data.message)
      } catch (error) {
        formatErrorData<TCredentialFormLogin>(error, setError)
      }
    }
  }

  const handleErrorSubmitForm: SubmitErrorHandler<TCredentialForm> = (errors) => {
    console.log('🚀 ~ CredentialForm ~ errors:', errors)
  }

  const handleShowPassword = () => setShowPassword((prev) => !prev)

  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev)

  const renderError = (name: keyof TCredentialForm) => {
    return (
      <span className="text-red-500 text-sm block min-h-[1.25rem]">{errors[name]?.message}</span>
    )
  }

  const renderShowPassword = (flag: boolean, cb: () => void) =>
    !flag ? (
      <EyeSlashIcon
        className="absolute w-6 h-6 right-2 top-1/2 -translate-x-2 -translate-y-1/2 cursor-pointer"
        onClick={cb}
      />
    ) : (
      <EyeIcon
        className="absolute w-6 h-6 right-2 top-1/2 -translate-x-2 -translate-y-1/2 cursor-pointer"
        onClick={cb}
      />
    )

  const styleInput = (name: keyof TCredentialForm) =>
    classNames(
      'p-3 border border-neutral-400 rounded-sm focus:drop-shadow-md focus:border-neutral-600',
      {
        'bg-red-50 border-red-600': errors[name],
        'border-green-500': dirtyFields[name] && !errors[name]
      }
    )

  return (
    <form
      className="p-8 bg-white rounded-sm shadow-md flex flex-col gap-3"
      onSubmit={handleSubmit(handleSubmitForm, handleErrorSubmitForm)}
      noValidate>
      <h2 className="font-medium text-xl py-3">{matchLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
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
      <button
        disabled={!isValid || isSubmitting}
        className={classNames(
          'bg-primary uppercase py-3 text-white rounded-sm flex justify-center items-center',
          {
            'cursor-not-allowed opacity-80': !isValid || isSubmitting,
            'cursor-pointer hover:opacity-90': isValid && !isSubmitting
          }
        )}>
        {isSubmitting && <LoadingIcon />}
        {matchLogin ? 'Đăng nhập' : 'Đăng ký'}
      </button>

      {/* Divide */}
      <div className="bg-neutral-300 h-[1px] mt-1 relative text-neutral-400">
        <span className="absolute top-1/2 left-1/2 bg-white p-1 -translate-x-1/2 -translate-y-1/2">
          Hoặc
        </span>
      </div>

      {/* Link */}
      <Link
        to={matchLogin ? PATHS.REGISTER_PATH : PATHS.LOGIN_PATH}
        className="mx-auto text-primary hover:text-orange-400 text-sm mt-1">
        {!matchLogin ? 'Đăng nhập' : 'Đăng ký'}
      </Link>
    </form>
  )
}

export default CredentialForm
