import axios from 'axios'

const instance = axios.create({ baseURL: '/api' })

const api = {
  setToken(token) {
    if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete instance.defaults.headers.common['Authorization']
  },
  get(path) { return instance.get(path).then(r => r.data) },
  post(path, body) { return instance.post(path, body).then(r => r.data) },
  put(path, body) { return instance.put(path, body).then(r => r.data) },
  delete(path) { return instance.delete(path).then(r => r.data) },
  raw: instance
}

export default api
