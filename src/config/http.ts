import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const httpService = new Http().instance

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof error.response === 'undefined') {
      toast.error('Đã có lỗi xảy ra. Điều này có thể là vấn đề CORS hoặc mất kết nối internet.', {
        theme: 'colored'
      })
    }
    return Promise.reject(error)
  }
)
export default httpService
