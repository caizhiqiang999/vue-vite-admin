import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://123.207.32.32:8000/',
  timeout: 10000
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, err => {
  console.log(err)
})

instance.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)
})

export default instance
