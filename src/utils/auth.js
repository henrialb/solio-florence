import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

const TOKEN_KEY = '__solio_session_token'
const domain = process.env.REACT_APP_DOMAIN

// Stores the jwt token (i.e. "Bearer eyJhbGciOiJIUzI1N...") in cookie
export const saveAuthToken = (header) => {
  const options = {}
  const token = header.split(' ')[1].trim()

  if (process.env.NODE_ENV === 'production') {
    options['domain'] = domain
  }

  Cookies.set(TOKEN_KEY, token, options)
}

export const readAuthToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const deleteAuthToken = (reason = 'Removed token') => {
  const options = {}

  console.log(`~ ${reason}`)

  if (process.env.NODE_ENV === 'production') {
    options['domain'] = domain
  }

  Cookies.remove(TOKEN_KEY, options)
}

export const readAuthPayload = () => {
  const token = readAuthToken()

  if (!token) {
    return {}
  }

  return jwt_decode(token)
}
