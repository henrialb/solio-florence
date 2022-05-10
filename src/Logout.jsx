import React from 'react'
import { Navigate } from 'react-router-dom'
import { readAuthToken, deleteAuthToken } from 'src/utils/auth'
import { api } from './Api'

const Logout = () => {
  const token = readAuthToken()

  deleteAuthToken()

  api.delete('users/sign_out', { headers: { Authorization: `Bearer ${token}` } })

  return <Navigate to="/entrar" />
}

export default Logout
