import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import { config } from './constants'
import { readAuthToken } from 'src/utils/auth'

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: config.url.API_URL,
    headers: { Authorization: `Bearer ${readAuthToken()}` },
  }),
)
