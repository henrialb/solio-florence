import React from 'react'
import { Navigate } from 'react-router-dom'
import { readAuthToken, saveAuthToken } from 'src/utils/auth'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  if (!readAuthToken()) {
    return <Navigate to="/entrar" />
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
