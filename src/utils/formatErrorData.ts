import { HttpStatusCode, isAxiosError } from 'axios'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { BaseErrorResponse } from '@/types'

export const formatErrorData = <T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>
) => {
  if (isAxiosError<BaseErrorResponse<T>>(error)) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      toast.error(error.response?.data.message)
    }

    // If there are any validation errors, loop through them and set them using setError
    if (error.response?.data.errors && setError) {
      error.response.data.errors.forEach((error) => {
        const errorEntries = Object.entries(error)
        setError(
          errorEntries[0][0] as Path<T>,
          { message: errorEntries[0][1] },
          {
            shouldFocus: true
          }
        )
      })
    }
  }
}
