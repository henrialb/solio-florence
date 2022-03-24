/* eslint-disable no-redeclare */
import React, { useState, useEffect } from 'react'
import { NavLink, useParams, Routes, Route, Navigate } from 'react-router-dom'
import { api } from 'src/Api'
import { CButton, CRow, CCol, CAvatar, CNav, CNavItem, CNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilUser, cilDescription, cilEuro, cilAddressBook } from '@coreui/icons'
import { age } from 'src/functions'

import avatar3 from 'src/assets/images/avatars/3.jpg'

const PatientData = React.lazy(() => import('src/components/patients/PatientData'))
const PatientExpenses = React.lazy(() => import('src/components/patients/PatientExpenses'))
const PatientReceivables = React.lazy(() => import('src/components/patients/PatientReceivables'))
// const PatientContacts = React.lazy(() => import('src/components/patients/PatientContacts'))

const PatientsDashboard = () => {
  const { id } = useParams()
  const { tab } = useParams()
  const [patient, setPatient] = useState({})
  const [error, setError] = useState(null) // TODO: handle errors
  // var [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    if (id) {
      api
        .get(`/patients/${id}`)
        .then((response) => {
          setPatient(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [id])

  return (
    <>
      <CRow className="d-md-flex justify-content-between mb-3 align-items-center">
        <CCol sm="auto" className="d-flex align-items-center">
          <CAvatar size="xl" src={avatar3} className="p-0" />
          <CCol className="ms-3">
            <h5 className="m-0 fw-bold">{patient.name}</h5>
            <small className="text-medium-emphasis">{age(patient.dob)} anos</small>
          </CCol>
        </CCol>
        <CCol className="ms-md-5">
          <CNav className="justify-content-start">
            <CNavItem className="tab-item">
              <CNavLink to="dados" component={NavLink}>
                <CIcon icon={cilUser} className="me-1" /> Dados
              </CNavLink>
            </CNavItem>
            <CNavItem className="tab-item">
              <CNavLink to="despesas" component={NavLink} disabled={patient.covenant === 'scml'}>
                <CIcon icon={cilDescription} className="me-1" /> Despesas
              </CNavLink>
            </CNavItem>
            <CNavItem className="tab-item">
              <CNavLink to="contas" component={NavLink}>
                <CIcon icon={cilEuro} className="me-1" /> Contas
              </CNavLink>
            </CNavItem>
            <CNavItem className="tab-item">
              <CNavLink to="contactos" component={NavLink} disabled>
                <CIcon icon={cilAddressBook} className="me-1" /> Contactos
              </CNavLink>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <Routes>
        <Route path="/" element={<Navigate replace to="dados" />} />
        <Route path="dados" element={<PatientData patient={patient} />} />
        <Route path="despesas" element={<PatientExpenses patientId={patient.id} />} />
        <Route path="contas" element={<PatientReceivables />} />
      </Routes>
    </>
  )
}

export default PatientsDashboard
