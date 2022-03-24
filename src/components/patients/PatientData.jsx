/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CContainer,
  CButton,
  CCardTitle,
  CCardSubtitle,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { dateFormatted } from 'src/functions'


const PatientData = ({ patient }) => {
  const covenant = (patient.covenant !== 'personal') ? patient.covenant : false

  return (
    <>
      <CRow>
        <CCol md={9}>
          <CCard>
            <CCardBody>
              <CRow className="mb-3">
                <CCol className="me-1">
                  <CCardTitle>{patient.fullName}</CCardTitle>
                  <CCardSubtitle className="mb-2 text-medium-emphasis small">{dateFormatted(patient.dob)}</CCardSubtitle>
                </CCol>
                {covenant && (
                  <CCol>
                    <CBadge color="light" className="text-secondary">
                      {covenant.toUpperCase()}
                    </CBadge>
                  </CCol>
                )}
                <CCol sm="auto" className="ms-auto">
                  <CButton size="sm" variant="ghost" color="primary" className="me-2" disabled>
                    <CIcon icon={cilPencil} /> &thinsp;Alterar dados
                  </CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={7}>
                  <p>Nº CC: {patient.citizenNo}</p>
                  <p>NIF: {patient.nifNo}</p>
                  <p>Nº SS: {patient.socialSecurityNo}</p>
                  <p>Mensalidade: {patient.monthlyFee}</p>
                </CCol>
                <CCol sm={5}>
                  <p>Casa: {patient.facility}</p>
                  <p>Etiqueta roupa: {patient.clothesTag}</p>
                  <p>Saldo: {patient.balance}</p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
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

PatientData.propTypes = { patient: PropTypes.object }

export default PatientData
