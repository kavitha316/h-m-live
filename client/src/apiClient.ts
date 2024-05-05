import axios from 'axios'

export const restApiUrl = 'http://localhost:4000/'
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? restApiUrl : '/',
  headers: {
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('userInfo'))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')!).token
      }`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default apiClient