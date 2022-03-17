import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../Api'
import { CButton, CRow, CCol, CAvatar, CCard, CCardBody, CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil } from '@coreui/icons'
import { age } from 'src/functions'

import avatar3 from 'src/assets/images/avatars/3.jpg'

const PatientsDashboard = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors

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
      <CRow className="d-sm-flex justify-content-between mb-3 align-items-center">
        <CCol sm="auto" className="d-flex align-items-center">
          <CAvatar size="xl" src={avatar3} className="p-0" />
          <CCol className="ms-3">
            <h5 className="m-0 fw-bold">{patient.name}</h5>
            <small className="text-medium-emphasis">{age(patient.dob)} anos</small>
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
        <CCol md={9}>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm={7}>
                  <p className="fw-semibold">{patient.fullName}</p>
                  <p>Nº CC: {patient.citizenNo}</p>
                  <p>NIF: {patient.nifNo}</p>
                  <p>Nº SS: {patient.socialSecurityNo}</p>
                  <p>Mensalidade: {patient.monthlyFee}</p>
                </CCol>
                <CCol sm={5}>
                  <p>Casa: {patient.facility}</p>
                  <p>Data nascimento: {patient.dob}</p>
                  <p>Etiqueta roupa: {patient.clothesTag}</p>
                  <p>Saldo: {patient.balance}</p>
                  <p>Acordo: {patient.covenant}</p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Sidebar */}
        <CCol md={3}>
          <CContainer>
            <CRow></CRow>
            <CRow></CRow>
          </CContainer>
        </CCol>
      </CRow>
    </>
  )
}

export default PatientsDashboard
