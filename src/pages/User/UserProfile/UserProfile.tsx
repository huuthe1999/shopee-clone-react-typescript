import { useEffect, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

import { Avatar, Button, FormInput } from '@/components'
import { useProfileQuery, useUpdateProfile, useUploadImage } from '@/hooks'
import { TProfileFormSchema, profileFormSchema } from '@/pages/User/validate'
import { Sexes } from '@/types'
import { generateYearArray } from '@/utils'

const UserProfile = () => {
  const { data, isFetching, isRefetching } = useProfileQuery()

  const profile = data?.data.data

  const [image, setImage] = useState<string>()
  const fileInput = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<TProfileFormSchema>({
    resolver: yupResolver(profileFormSchema),
    mode: 'all'
  })

  const isDirty = !(Object.keys(dirtyFields).length === 0 && dirtyFields.constructor === Object)

  const mutateUploadImage = useUploadImage()
  const mutateUpdateProfile = useUpdateProfile()

  const handleSubmitForm = async (formData: TProfileFormSchema) => {
    const { avatar, day, month, year, ...restFormData } = formData

    if (isDirty) {
      const imageUpload =
        avatar?.[0] && image && (await mutateUploadImage.mutateAsync(image)).data.data

      await mutateUpdateProfile.mutateAsync({
        ...restFormData,
        avatar: imageUpload ? imageUpload.secure_url : undefined,
        avatarId: imageUpload ? imageUpload.public_id : undefined,
        date_of_birth: new Date(+year, +month, +day).getTime()
      })
    }
  }

  const handleClick = () => {
    fileInput.current?.click()
  }

  const handleReset = () => {
    reset()
    setImage(profile?.avatar)
  }

  const { ref, onChange, ...rest } = register('avatar')

  useEffect(() => {
    if (profile) {
      const date = new Date(profile.date_of_birth)
      reset({
        name: profile.name,
        phone: profile.phone,
        sex: profile.sex.toString() as Sexes,
        day: date.getDate().toString(),
        month: date.getMonth().toString(),
        year: date.getFullYear().toString()
      })
      setImage(profile?.avatar)
    }
  }, [profile, reset])

  return (
    <div className="px-7 pb-4">
      {/* Header */}
      <div className="border-b border-zinc-200 py-4">
        <h1 className="text-lg capitalize text-zinc-800">Hồ sơ của tôi</h1>
        <p className="line-clamp-1 text-sm text-neutral-600">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>
      {/* Body */}
      <form
        className="flex flex-col-reverse gap-x-6 gap-y-4 pb-6 pt-4 md:flex-row"
        onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex basis-full flex-col gap-y-4 md:basis-2/3">
          <FormInput
            showLabel
            readOnly
            defaultValue={profile?.email}
            invalid={false}
            label="Email"
            disabled
          />

          <FormInput
            {...register('name')}
            showLabel
            invalid={!!errors.name}
            label="Tên hiển thị"
            errorMessage={errors.name?.message}
          />

          <FormInput
            {...register('phone')}
            showLabel
            invalid={!!errors.phone}
            label="Số điện thoại"
            errorMessage={errors.phone?.message}
          />

          {/* Sex radio */}
          <div className={classNames('relative z-0 flex w-full items-center gap-x-4')}>
            <span className="shrink-0 basis-1/5 text-right text-sm text-neutral-600 md:basis-1/4">
              Giới tính
            </span>
            <div className="flex basis-auto flex-wrap gap-3 text-sm">
              <div className="flex flex-nowrap items-center gap-x-2">
                <input
                  {...register('sex')}
                  type="radio"
                  value={Sexes.Male}
                  id={Object.keys(Sexes)[0]}
                  className="h-4 w-4 accent-primary"
                />
                <label htmlFor={Object.keys(Sexes)[0]} className="shrink-0">
                  Nam
                </label>
              </div>
              <div className="flex flex-nowrap items-center gap-x-2">
                <input
                  {...register('sex')}
                  type="radio"
                  value={Sexes.Female}
                  id={Object.keys(Sexes)[1]}
                  className="h-4 w-4 accent-primary"
                />
                <label htmlFor={Object.keys(Sexes)[1]} className="shrink-0">
                  Nữ
                </label>
              </div>
              <div className="flex flex-nowrap items-center gap-x-2">
                <input
                  {...register('sex')}
                  type="radio"
                  value={Sexes.Other}
                  id={Object.keys(Sexes)[2]}
                  className="h-4 w-4 accent-primary"
                />
                <label htmlFor={Object.keys(Sexes)[2]} className="shrink-0">
                  Khác
                </label>
              </div>
            </div>
          </div>
          {/* Date of birth */}
          <div className={classNames('relative z-0 flex w-full items-center gap-x-4')}>
            <span className="shrink-0 basis-1/5 text-right text-sm text-neutral-600 md:basis-1/4">
              Ngày sinh
            </span>
            <div className="flex basis-full flex-col flex-wrap gap-3 text-sm md:flex-row">
              <select
                {...register('day')}
                className="relative flex-1 cursor-pointer appearance-none border border-gray-300 px-2 py-2 outline-none focus:border-primary focus:ring-primary">
                {Array(31)
                  .fill(null)
                  .map((_, index) => (
                    <option value={index + 1} key={index} className=" bg-white hover:text-primary">
                      {index + 1}
                    </option>
                  ))}
              </select>
              <select
                {...register('month')}
                className="flex-1 cursor-pointer appearance-none border border-gray-300 px-2 py-2 outline-none focus:border-primary focus:ring-primary">
                {Array(12)
                  .fill(null)
                  .map((_, index) => (
                    <option value={index + 1} key={index} className=" bg-white hover:text-primary">
                      Tháng {index + 1}
                    </option>
                  ))}
              </select>
              <select
                {...register('year')}
                className="flex-1 cursor-pointer appearance-none border border-gray-300 px-2 py-2 outline-none focus:border-primary focus:ring-primary">
                {generateYearArray(1910).map((year) => (
                  <option value={year} key={year} className=" bg-white hover:text-primary">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <Button
              disabled={!isDirty || mutateUpdateProfile.isLoading || mutateUploadImage.isLoading}
              onClick={handleReset}
              className="w-fit overflow-hidden rounded-sm bg-primary px-6 py-2 text-white transition-colors hover:bg-secondary">
              Reset
            </Button>
            <Button
              disabled={!isDirty || mutateUpdateProfile.isLoading || mutateUploadImage.isLoading}
              isLoading={mutateUpdateProfile.isLoading || mutateUploadImage.isLoading}
              type="submit"
              className="w-fit overflow-hidden rounded-sm bg-primary px-6 py-2 text-white transition-colors hover:bg-secondary">
              Lưu
            </Button>
          </div>
        </div>
        <div className="flex basis-full flex-col md:basis-1/3">
          <div className="flex flex-col flex-nowrap items-center gap-y-3 border-l border-zinc-200 px-6 max-sm:border-none">
            <label
              htmlFor="file"
              className={classNames('cursor-pointer', {
                'pointer-events-none': mutateUploadImage.isLoading
              })}>
              {image ? (
                <img
                  src={image}
                  alt="avatar"
                  className="aspect-square w-24 overflow-hidden rounded-full border border-primary object-cover ring-1 ring-primary ring-offset-1 ring-offset-secondary"
                />
              ) : (
                <Avatar
                  isLoading={isFetching || isRefetching}
                  className="aspect-square w-24 border border-primary ring-1 ring-primary ring-offset-1 ring-offset-secondary"
                />
              )}
            </label>
            <input
              type="file"
              {...rest}
              ref={(e) => {
                ref(e)
                fileInput.current = e // you can still assign to ref
              }}
              onChange={(e) => {
                onChange(e)
                if (e.target.files) {
                  const reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  reader.onloadend = () => {
                    reader.result && setImage(reader.result.toString())
                  }
                }
              }}
              accept=".jpg,.jpeg,.png"
              className="hidden"
            />
            <AnimatePresence>
              {errors.avatar?.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '1.25rem' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'tween', duration: 0.1 }}
                  className={classNames('mt-1 text-xs text-red-500')}>
                  {errors.avatar?.message}
                </motion.p>
              )}
            </AnimatePresence>
            <Button
              disabled={mutateUploadImage.isLoading}
              name="file"
              id="file"
              type="button"
              className="text-md rounded-sm border border-black/[0.09] bg-white p-2 capitalize text-neutral-600 shadow-sm outline-none transition-colors hover:bg-black/[0.02]"
              onClick={handleClick}>
              Chọn ảnh
            </Button>
            <div className="text-sm text-neutral-400">
              <p className="line-clamp-1 break-all">Dung lượng file tối đa 1 MB</p>
              <p className="line-clamp-1 break-all">Định dạng:.JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserProfile
