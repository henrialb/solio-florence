import React, { useState, useEffect } from 'react'
import { api } from '../../Api'
import { CButton, CRow, CCol, CAvatar } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil } from '@coreui/icons'

import avatar5 from 'src/assets/images/avatars/5.jpg'

const PatientsDashboard = () => {
  // const [patients, setPatients] = useState([])
  // const [error, setError] = useState(null) // TODO: handle errors

  // useEffect(() => {
  //   api
  //     .get('/patients')
  //     .then((response) => {
  //       setPatients(response.data)
  //     })
  //     .catch((error) => {
  //       setError(error)
  //     })
  // }, [])

  // const patients36 = patients.filter(function (patient) {
  //   return patient.facility === '36'
  // })

  // const patients21 = patients.filter(function (patient) {
  //   return patient.facility === '21'
  // })

  return (
    <>
      <CRow className="d-sm-flex justify-content-between mb-3 align-items-center">
        <CCol sm="auto" className="d-flex align-items-center">
          <CAvatar size="xl" src={avatar5} className="p-0" />
          <CCol className="ms-3">
            <h5 className="m-0">Nome Utente</h5>
            <small className="m-0">Idade</small>
          </CCol>
        </CCol>
        <CCol sm="auto" className="ms-auto">
          <CButton size="sm" variant="outline" color="primary" className="me-2">
            <CIcon icon={cilPencil} /> &thinsp;Alterar dados
          </CButton>
          <CButton size="sm" color="primary">
            <CIcon icon={cilPlus} /> &thinsp;Adicionar despesa
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol></CCol>
      </CRow>
    </>
  )
}

export default PatientsDashboard
