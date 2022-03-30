import axios from 'axios'

import qs from 'qs'
import { currentUser } from 'application/scripts/current_user'

const api = axios.create({
  baseURL: process.env.API_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${currentUser.jwt}`

  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
