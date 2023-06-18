import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { useAxiosPrivate } from '@/hooks'
import { uploadServices } from '@/services'
import { BaseResponse, IDataResponse, ImageResponse } from '@/types'
export const useUploadImage = () => {
  useAxiosPrivate()

  return useMutation<AxiosResponse<IDataResponse<ImageResponse>>, AxiosError<BaseResponse>, string>(
    {
      mutationFn: (data) => uploadServices.uploadImage(data),
      onError(error) {
        toast.error(error.response?.data.message)
      }
    }
  )
}
