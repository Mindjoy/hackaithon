import axios from 'axios'

const baseURL = 'http://3.125.115.66:80'

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  crossDomain: true
})
