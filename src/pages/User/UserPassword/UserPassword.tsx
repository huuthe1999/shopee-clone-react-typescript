import { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Eye, EyeOff } from 'react-feather'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { Button, FormInput, TCredentialFormSchema, credentialFormSchema } from '@/components'
import { useUpdateProfile } from '@/hooks'

type TPassword = Omit<TCredentialFormSchema, 'email'>
const schema = credentialFormSchema.omit(['email'])
const UserPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isDirty, isValid, isLoading, isSubmitSuccessful }
  } = useForm<TPassword>({
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
    mode: 'all'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const mutateUpdateProfile = useUpdateProfile()

  const handleSubmitForm = (data: TPassword) => {
    mutateUpdateProfile.mutate({ password: data.password })
  }

  const handleErrorForm: SubmitErrorHandler<TPassword> = async (errors) => {
    console.log('🚀 ~ handleSubmitForm ~ error:', errors)
  }

  const renderShowPassword = useCallback(
    (flag: boolean, cb: () => void) =>
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
      ),
    []
  )

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div className="relative px-7 pb-4">
      {/* Header */}
      <div className="border-b border-zinc-200 py-4">
        <h1 className="text-lg capitalize text-zinc-800">Thêm mật khẩu</h1>
        <p className="line-clamp-1 text-sm text-neutral-600">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <form
        className="flex flex-col gap-y-4 pt-4 md:w-3/4"
        noValidate
        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}>
        <FormInput
          {...register('password')}
          showLabel
          invalid={!!errors.password}
          label="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          errorMessage={errors.password?.message}
          autoComplete="false"
          rightIcon={renderShowPassword(showPassword, () => {
            setShowPassword(!showPassword)
          })}
        />
        <FormInput
          {...register('confirmPassword')}
          showLabel
          invalid={!!errors.confirmPassword}
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          autoComplete="false"
          rightIcon={renderShowPassword(showConfirmPassword, () => {
            setShowConfirmPassword(!showConfirmPassword)
          })}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button
          disabled={!isDirty || !isValid}
          isLoading={isLoading}
          type="submit"
          className="ml-auto w-fit overflow-hidden rounded-sm bg-primary px-6 py-2 text-white transition-colors hover:bg-secondary">
          Lưu
        </Button>
      </form>
    </div>
  )
}

export default UserPassword
