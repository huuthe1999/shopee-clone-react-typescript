import * as yup from 'yup'

import { Sexes } from '@/types'

export const profileFormSchema = yup
  .object()
  .shape({
    name: yup.string().default('').required('Tên không được rỗng').typeError('Tên không hợp lệ'),
    phone: yup
      .string()
      .default('')
      .test({
        test: (value, context) => {
          if (value === '') return true

          if (value.length > 10) {
            return context.createError({
              message: 'Số điện thoại phải đúng 10 kí tự'
            })
          }

          if (!/^\d+$/.test(value)) {
            return context.createError({
              message: 'Số điện thoại phải chỉ chứa số'
            })
          }

          if (!/^0\d{9}$/.test(value)) {
            return context.createError({
              message: 'Số điện thoại không hợp lệ. Ví dụ : 0345123547'
            })
          }
          return true
        }
      }),
    sex: yup.mixed<Sexes>().oneOf(Object.values(Sexes)).default(Sexes.None),
    avatar: yup
      .mixed<FileList>()
      .test('fileType', 'Chỉ chấp nhận định dạng: .JPEG, .PNG', (value) => {
        if (!value || value.length === 0) {
          // No files provided, consider it valid
          return true
        }

        const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg']

        for (let i = 0; i < value.length; i++) {
          const file = value[i]
          if (!supportedTypes.includes(file.type)) {
            return false
          }
        }
        return true
      })
      .test('fileSize', 'Dung lượng file tối đa 1 MB', (value) => {
        if (!value || value.length === 0) {
          // No files provided, consider it valid
          return true
        }

        const maxSize = 1 * 1024 * 1024 // 1MB

        for (let i = 0; i < value.length; i++) {
          const file = value[i]
          if (file.size > maxSize) {
            return false
          }
        }
        return true
      }),
    day: yup.string().default('1'),
    month: yup.string().default('1'),
    year: yup.string().default('1910')
  })
  .required('Form không được rỗng')
  .strict(true)

export type TProfileFormSchema = yup.InferType<typeof profileFormSchema>
