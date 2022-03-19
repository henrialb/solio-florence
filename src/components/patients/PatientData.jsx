import React from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CCard, CCardBody, CContainer } from '@coreui/react'

const PatientData = ({ patient }) => {
  return (
    <>
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

PatientData.propTypes = { patient: PropTypes.array }

export default PatientData
