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
      timeout: 20000,
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
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      },
      isRetryAttempt: false
    })
  }
}

const httpAxios = new Http().instance

export const authAxios = new AuthHttp().instance

let isFirstFailedRequest = true

httpAxios.interceptors.response.use(
  (response) => {
    // Reset for next request
    if (!isFirstFailedRequest) {
      isFirstFailedRequest = true
    }
    return response
  },
  (error) => {
    // Check CORS error
    if (isFirstFailedRequest && typeof error.response === 'undefined' && !isCancel(error)) {
      isFirstFailedRequest = false
      toast.error('Mất kết nối server. Vui lòng thử lại!', {
        theme: 'colored'
      })
    }

    return Promise.reject(error)
  }
)

export default httpAxios
