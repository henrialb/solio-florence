/* eslint-disable no-redeclare */
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  const [patient, setPatient] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  var [activeTab, setActiveTab] = useState(1)

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

  switch (tab) {
    case 'despesas':
      var tabContent = <PatientExpenses patientId={patient.id} />
      activeTab = 2
      break
    case 'contas':
      var tabContent = <PatientReceivables />
      activeTab = 3
      break
    // case 'contactos':
    //   var tabContent = <PatientContacts />
    //   activeTab = 4
    //   break
    default:
      var tabContent = <PatientData patient={patient} />
  }

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
        <CCol className="ms-md-4">
          <CNav className="justify-content-start">
            <CNavItem className="tab-item">
              <CNavLink
                href={`#/utentes/${id}`}
                active={activeTab === 1}
                onClick={() => setActiveTab(1)}
              >
                <CIcon icon={cilUser} className="me-1" /> Dados
              </CNavLink>
            </CNavItem>
            <CNavItem className="tab-item">
              <CNavLink
                href={`#/utentes/${id}/despesas`}
                active={activeTab === 2}
                onClick={() => setActiveTab(2)}
              >
                <CIcon icon={cilDescription} className="me-1" /> Despesas
              </CNavLink>
            </CNavItem>
            <CNavItem className="tab-item">
              <CNavLink
                href={`#/utentes/${id}/contas`}
                active={activeTab === 3}
                onClick={() => setActiveTab(3)}
              >
                <CIcon icon={cilEuro} className="me-1" /> Contas
              </CNavLink>
            </CNavItem>
            <CNavItem className="tab-item">
              <CNavLink
                href={`#/utentes/${id}/contactos`}
                active={activeTab === 4}
                onClick={() => setActiveTab(4)}
                disabled
              >
                <CIcon icon={cilAddressBook} className="me-1" /> Contactos
              </CNavLink>
            </CNavItem>
          </CNav>
        </CCol>
        <CCol sm="auto" className="ms-auto">
          <CButton size="sm" variant="ghost" color="primary" className="me-2" disabled>
            <CIcon icon={cilPencil} /> &thinsp;Alterar dados
          </CButton>
          <CButton size="sm" color="primary">
            <CIcon icon={cilPlus} /> &thinsp;Adicionar despesa
          </CButton>
        </CCol>
      </CRow>
      {tabContent}
    </>
  )
}

export default PatientsDashboard
