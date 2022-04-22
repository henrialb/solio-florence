import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'

const NewPatient = () => {
  const [patient, setPatient] = useState({})
  const date = new Date()
  const today =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')

  const handleChange = (event) => {
    setPatient((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value,
      }
    })
  }

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPatient" className="fw-bold">
                    Utente
                  </CFormLabel>
                  <CFormSelect id="inputPatient">
                    <option key={1} value={1}></option>
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputDescription" className="fw-bold">
                    Descrição
                  </CFormLabel>
                  <CFormInput id="inputDescription" name="description" onChange={handleChange} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputAmount" className="fw-bold">
                    Valor
                  </CFormLabel>
                  <CFormInput
                    id="inputAmount"
                    name="amount"
                    className="font-monospace"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputDate" className="fw-bold">
                    Data
                  </CFormLabel>
                  <CFormInput
                    type="date"
                    id="inputDate"
                    name="date"
                    defaultValue={today}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputNote" className="fw-bold">
                    Nota
                  </CFormLabel>
                  <CFormTextarea id="inputNote" name="note" onChange={handleChange} />
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default NewPatient
