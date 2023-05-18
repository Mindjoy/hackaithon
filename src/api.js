import axios from 'axios'

const baseURL = 'https://hackaithon-backend.onrender.com'

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  crossDomain: true
})
