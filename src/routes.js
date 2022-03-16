import React from 'react'

// Patients
const PatientsDashboard = React.lazy(() => import('./views/patients/PatientsDashboard'))
const Patient = React.lazy(() => import('./views/patients/Patient'))

const routes = [
  { path: '/utentes', name: 'Utentes', element: PatientsDashboard },
  { path: '/utentes/:id', name: 'Utente', element: Patient },

  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: PatientsDashboard },
]

export default routes
