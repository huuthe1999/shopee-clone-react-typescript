import * as yup from 'yup'

import { IAddress } from '@/types'

export const addressFormSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .default('')
      .required('Tên không được rỗng')
      .min(2, 'Tên quá ngắn. Yêu cầu tối thiểu 2 ký tự.')
      .test({
        test: (value, context) => {
          if (value.trim().length === 0) {
            return context.createError({
              message: 'Vui lòng điền Họ & Tên'
            })
          }

          if (value.trim().length === 1) {
            return context.createError({
              message: 'Vui lòng điền Tên'
            })
          }

          return true
        }
      })
      .typeError('Tên không hợp lệ'),
    phone: yup
      .string()
      .default('')
      .required('Số điện thoại không được rỗng')
      .trim('Số điện thoại không chứa kí tự rỗng')
      .length(10, 'Số điện thoại phải đúng 10 kí tự')
      .typeError('Số điện thoại không hợp lệ')
      .matches(/^0\d{9}$/, 'Số điện thoại phải bắt đầu bằng 0'),
    province: yup.string().default('').required('Vui lòng chọn tỉnh thành'),
    district: yup.string().default('').required('Vui lòng chọn quận/huyện'),
    ward: yup.string().default('').required('Vui lòng chọn phường xã'),
    fillAddress: yup
      .boolean()
      .default(false)
      .test({
        test: (value, context) => {
          if (!value) {
            return context.createError({
              message: 'Vui lòng điền thông tin địa chỉ'
            })
          }
          return true
        }
      }),
    address: yup.string().default('').required('Vui lòng điền địa chỉ cụ thể')
  })
  .required('Form không được rỗng')
  .strict(true)

export type TAddressFormSchema = yup.InferType<typeof addressFormSchema>

export const addressField = addressFormSchema.pick(['province', 'district', 'ward'])
export type TAddressField = Pick<TAddressFormSchema, 'province' | 'district' | 'ward'>

export type TAddressForm = Pick<TAddressFormSchema, 'name' | 'phone' | 'address' | 'fillAddress'> &
  Pick<IAddress, 'province' | 'district' | 'ward'>
