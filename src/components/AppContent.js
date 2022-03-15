import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner, CRow, CCol } from '@coreui/react'
import { DocsCallout } from 'src/components'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <CRow>
        <CCol xs={12}>
          <DocsCallout name="Badges" href="components/badge" />
        </CCol>
      </CRow>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
