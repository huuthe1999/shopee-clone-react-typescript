import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { IDataResponse, ImageResponse } from '@/types'

export const uploadImage = (base64Image: string) =>
  authAxios.post<IDataResponse<ImageResponse>>(ENDPOINTS.UPLOAD_END_POINT, {
    image: base64Image
  })
