import React, { useState, useEffect } from 'react'
import { api } from '../../Api'
import { CButton, CRow, CCol, CAvatar } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

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
      <CRow>
        <div className="d-sm-flex justify-content-between mb-3 align-items-center">
          <div className="row row-cols-auto d-flex align-items-center">
            <CAvatar size="xl" src={avatar5} className="p-0" />
            <div className="ms-1">
              <h5 className="m-0">Nome Utente</h5>
              <small className="m-0">Idade</small>
            </div>
          </div>
          <div className="d-grid gap-2">
            <CButton color="primary">
              <CIcon icon={cilPlus} />
              &ensp;Adicionar despesa
            </CButton>
          </div>
        </div>
      </CRow>
      <CRow>as</CRow>
    </>
  )
}

export default PatientsDashboard
