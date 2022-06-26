import React, { useState, useEffect } from 'react'
import { api } from '../../Api'
import { CButton, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { Navigate } from 'react-router-dom'
import { deleteAuthToken } from 'src/utils/auth'

import PatientsTable from 'src/components/patients/PatientsTable'

const PatientsDashboard = () => {
  const [patients, setPatients] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors

  useEffect(() => {
    api
      .get('/patients')
      .then((response) => {
        setPatients(response.data)
      })
      .catch((error) => {
        setError(error)
      })
  }, [])

  // Sort patients by name
  patients.sort((a, b) => {
    let nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase()

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  // Separate patients by facility: 36 -> Sólio Lar; 21 -> Sólio XXI
  const patients36 = patients.filter(function (patient) {
    return patient.facility === '36'
  })

  const patients21 = patients.filter(function (patient) {
    return patient.facility === '21'
  })

  if (error && error.message === 'Request failed with status code 500') {
    deleteAuthToken()
    return <Navigate to="/entrar" />
  }

  return (
    <>
      <CRow>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
          <CButton size="sm" color="primary" href="/utentes/novo" variant="outline">
            <CIcon icon={cilPlus} size="sm" />
            &ensp;Novo utente
          </CButton>
        </div>
      </CRow>
      <CRow>
        <PatientsTable patients={patients36} />
        <PatientsTable patients={patients21} />
      </CRow>
    </>
  )
}

export default PatientsDashboard
