import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const httpService = new Http().instance
const authService = new Http().instance

authService.defaults.withCredentials = true

authService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof error.response === 'undefined') {
      toast.error(
        'Đã có lỗi xảy ra tại authService. Điều này có thể là vấn đề CORS hoặc mất kết nối internet.',
        {
          theme: 'colored'
        }
      )
    }
    return Promise.reject(error)
  }
)

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
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
export { authService }
export default httpService
