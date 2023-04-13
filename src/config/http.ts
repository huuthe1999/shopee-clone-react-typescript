import axios, { AxiosInstance } from 'axios'
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
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      isRetryAttempt: false
    })
  }
}

const httpService = new Http().instance
export const authService = new Http().instance

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check CORS error
    if (typeof error.response === 'undefined') {
      toast.error(
        'Đã có lỗi xảy ra tại httpService. Điều này có thể là vấn đề CORS hoặc mất kết nối internet.',
        {
          theme: 'colored'
        }
      )
    }
    return Promise.reject(error)
  }
)

export default httpService
