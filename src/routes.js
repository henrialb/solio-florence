import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))

// Patients
const PatientsDashboard = React.lazy(() => import('./views/patients/PatientsDashboard'))
const Patient = React.lazy(() => import('./views/patients/Patient'))
const NewPatient = React.lazy(() => import('./views/patients/NewPatient'))

const routes = [
  { path: '/utentes', name: 'Utentes', element: PatientsDashboard, exact: true },
  { path: '/utentes/:id/*', name: 'Utente', element: Patient },
  { path: '/utentes/novo', name: 'Novo Utente', element: NewPatient },

  { path: '/', exact: true, name: '' },
  { path: '/inicio', name: '', element: Dashboard },
]

export default routes
