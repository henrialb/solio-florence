import React from 'react'
import { CRow, CCol, CCard, CCardBody, CContainer } from '@coreui/react'

const PatientReceivables = () => {
  return (
    <>
      <CRow>
        <CCol md={9}>
          <CCard>
            <CCardBody>Contas</CCardBody>
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

export default PatientReceivables
