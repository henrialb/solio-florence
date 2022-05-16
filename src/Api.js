import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import { readAuthToken } from 'src/utils/auth'

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3000',
    headers: { Authorization: `Bearer ${readAuthToken()}` },
  }),
)
