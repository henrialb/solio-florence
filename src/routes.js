import React from 'react'

// Patients
const PatientsDashboard = React.lazy(() => import('./views/patients/PatientsDashboard'))

const routes = [
  { path: '/utentes', name: 'Utentes', element: PatientsDashboard },

  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: PatientsDashboard },
]

export default routes
