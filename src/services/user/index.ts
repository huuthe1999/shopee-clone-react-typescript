import { AxiosResponse } from 'axios'

import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { IDataResponse, TUserUpdate, UserResponse } from '@/types'

export const getProfile = () =>
  authAxios.get<IDataResponse<UserResponse>>(ENDPOINTS.USER_PROFILE_END_POINT)

export const updateProfile = async (updateData: Partial<TUserUpdate>) => {
  const { data } = await authAxios.patch<
    IDataResponse<UserResponse>,
    AxiosResponse<IDataResponse<UserResponse>>,
    Partial<TUserUpdate>
  >(ENDPOINTS.USER_PROFILE_END_POINT, updateData)
  return data
}
