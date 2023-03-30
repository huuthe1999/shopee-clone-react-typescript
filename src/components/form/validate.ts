import * as yup from 'yup'

export const credentialFormSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Email không được rỗng')
      .trim('Email không được chứa kí tự rỗng')
      .default('')
      .email('Email phải hợp lệ')
      .typeError('Loại email phải hợp lệ'),
    password: yup
      .string()
      .required('Password không được rỗng')
      .trim('Password không được chứa kí tự rỗng')
      .min(8, 'Mật khẩu phải ít nhất 8 kí tự')
      .max(160, 'Mật khẩu nhiều nhất 160 kí tự')
      .default('')
      .typeError('Loại password phải hợp lệ')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải có ít nhất 1 ký tự viết thường, 1 ký tự viết hoa và 1 chữ số'
      ),
    confirmPassword: yup
      .string()
      // .required('Vui lòng nhập lại mật khẩu')
      .default('')
      .test({
        name: 'isRegisterForm',
        test: (value, context) => {
          if (!value) {
            return context.createError({
              message: 'Vui lòng nhập lại mật khẩu'
            })
          }

          if (value !== context.parent.password) {
            return context.createError({
              message: 'Mật khẩu không trùng khớp'
            })
          }
          return true
        }
      })
  })
  .required('Form không được rỗng')
  .strict(true)

export const loginFormSchema = credentialFormSchema.omit(['confirmPassword'])
export type TCredentialForm = yup.InferType<typeof credentialFormSchema>
export type TCredentialFormRequest = yup.InferType<typeof loginFormSchema>
