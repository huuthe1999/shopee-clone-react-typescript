import { useEffect } from 'react'

import { EyeSlashIcon } from '@heroicons/react/24/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useMatch } from 'react-router-dom'

import { TCredentialForm, credentialFormSchema } from '@/components/form/validate'
import { PATHS } from '@/constants'

const CredentialForm = () => {
  const matchLogin = useMatch(PATHS.LOGIN_PATH)

  const {
    register,
    reset,
    unregister,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields }
  } = useForm<TCredentialForm>({
    resolver: yupResolver(credentialFormSchema),
    mode: 'all',
    shouldUnregister: true,
    resetOptions: {
      keepDefaultValues: true
    }
  })

  console.log('🚀 ~ CredentialForm ~ isValid:', isValid)

  useEffect(() => {
    console.log('CredentialForm')
    if (matchLogin) {
      console.log('🚀 ~ useEffect ~ unregister:')
      unregister('confirmPassword')
    }
    reset()
  }, [matchLogin, reset, unregister])

  const handleSubmitForm: SubmitHandler<TCredentialForm> = (data, e) => {
    console.log('🚀 ~ CredentialForm ~ data:', data)
  }

  const handleErrorSubmitForm: SubmitErrorHandler<TCredentialForm> = (errors, e) => {
    console.log('🚀 ~ CredentialForm ~ errors:', errors)
  }

  const renderError = (name: keyof TCredentialForm) => {
    return (
      <span className="text-red-500 text-sm block min-h-[1.2rem]">{errors[name]?.message}</span>
    )
  }

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
      onSubmit={handleSubmit(handleSubmitForm, handleErrorSubmitForm)}>
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
            type="password"
            placeholder="Mật khẩu"
            className={styleInput('password')}
            {...register('password')}
          />
          <EyeSlashIcon className="absolute w-6 h-6 right-2 top-1/2 -translate-x-2 -translate-y-1/2 cursor-pointer" />
        </div>
        {renderError('password')}
      </div>
      {!matchLogin && (
        <div>
          <div className="relative">
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className={styleInput('confirmPassword')}
              {...register('confirmPassword')}
            />
            <EyeSlashIcon className="absolute w-6 h-6 right-2 top-1/2 -translate-x-2 -translate-y-1/2 cursor-pointer" />
          </div>
          {renderError('confirmPassword')}
        </div>
      )}

      {/* Button */}
      <button
        disabled={!isValid || isSubmitting}
        className={classNames('bg-primary uppercase py-3 text-white rounded-sm', {
          'cursor-not-allowed opacity-80': !isValid,
          'cursor-pointer hover:opacity-90': isValid
        })}>
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
