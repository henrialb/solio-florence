import React, { useState, useEffect } from 'react'
import { api } from '../../Api'
import { CButton, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

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

  const patients36 = patients.filter(function (patient) {
    return patient.facility === '36'
  })

  const patients21 = patients.filter(function (patient) {
    return patient.facility === '21'
  })

  return (
    <>
      <CRow>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
          <CButton size="sm" color="primary" href="utentes/novo">
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
