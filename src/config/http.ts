import {} from '@tanstack/react-query'
import axios, { AxiosInstance, isCancel } from 'axios'
import { toast } from 'react-toastify'

declare module 'axios' {
  export interface AxiosRequestConfig {
    isRetryAttempt?: boolean
  }
}

// export interface MyAxiosRequestConfig extends AxiosRequestConfig {
//   customData?: any
// }

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      isRetryAttempt: false
    })
  }
}

class AuthHttp {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      isRetryAttempt: false
    })
  }
}

const httpAxios = new Http().instance

export const authAxios = new AuthHttp().instance

httpAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check CORS error
    if (typeof error.response === 'undefined' && !isCancel(error)) {
      toast.error('Đã có lỗi về CORS hoặc mất kết nối internet.', {
        theme: 'colored'
      })
    }
    return Promise.reject(error)
  }
)

export default httpAxios
