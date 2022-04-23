/* eslint-disable prettier/prettier */
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
  CButton,
  CCardFooter
} from '@coreui/react'
import { api } from 'src/Api'

const NewPatient = () => {
  const date = new Date()
  // eslint-disable-next-line prettier/prettier
  const today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
  const [patient, setPatient] = useState({admissionDate: today, sex: 0, covenant: 0, profilePhoto: null})

  const handleChange = (event) => {
    setPatient((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value,
      }
    })
  }

  const onImageChange = event => {
    setPatient((prevalue) => {
      return {
        ...prevalue,
        profilePhoto: event.target.files[0]
      }
    })
  }

  const handleSubmit = () => {
    api.post('/patients', patient).then((response) => {
      // setPayment(response.data)
      // setUpdateReceivables(Date.now())
      // setVisible(false)
    })
  }

  console.log(patient)

  return (
    <>
      <CRow>
        <CCol md={8}>
          <CCard>
            <CCardBody>
              <CForm className="row g-3">
                <CCol sm={6} md={8}>
                  <CFormLabel htmlFor="inputFullName" className="fw-bold">
                    Nome completo
                  </CFormLabel>
                  <CFormInput id="inputFullName" name="fullName" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputFullName" className="fw-bold">
                    Nome de tratamento
                  </CFormLabel>
                  <CFormInput id="inputName" name="name" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputDob" className="fw-bold">
                    Data de nascimento
                  </CFormLabel>
                  <CFormInput type="date" id="inputDob" name="dob" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputSex" className="fw-bold">
                    Sexo
                  </CFormLabel>
                  <CFormSelect id="inputSex" name="sex" onChange={handleChange}>
                    <option key={0} value={0}>Feminino</option>
                    <option key={1} value={1}>Masculino</option>
                  </CFormSelect>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputName" className="fw-bold">
                    Marcação de roupa
                  </CFormLabel>
                  <CFormInput id="inputFullName" name="fullName" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputCitizenNo" className="fw-bold">
                    Nº CC
                  </CFormLabel>
                  <CFormInput id="inputCitizenNo" name="citizenNo" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputNifNo" className="fw-bold">
                    NIF
                  </CFormLabel>
                  <CFormInput id="inputNifNo" name="nifNo" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputHealthNo" className="fw-bold">
                    Nº Utente de Saúde
                  </CFormLabel>
                  <CFormInput id="inputHealthNo" name="healthNo" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputSocialSecurityNo" className="fw-bold">
                    Nº Seg. Social
                  </CFormLabel>
                  <CFormInput id="inputSocialSecurityNo" name="socialSecurityNo" onChange={handleChange} />
                </CCol>
                <CRow className="mt-3">
                  <CCol sm={6} md={4}>
                    <CFormLabel htmlFor="inputCovenant" className="fw-bold">
                      Acordo
                    </CFormLabel>
                    <CFormSelect id="inputCovenant" name="covenant" onChange={handleChange}>
                      <option key={0} value={0}>Privado</option>
                      <option key={1} value={1}>SCML</option>
                    </CFormSelect>
                  </CCol>
                  <CCol sm={6} md={4}>
                    <CFormLabel htmlFor="inputAdmissionDate" className="fw-bold">
                      Data de admissão
                    </CFormLabel>
                    <CFormInput type="date" id="inputAdmissionDate" name="admissionDate" defaultValue={today} onChange={handleChange} />
                  </CCol>
                  <CCol sm={6} md={2}>
                    <CFormLabel htmlFor="inputFacility" className="fw-bold">
                      Casa
                    </CFormLabel>
                    <CFormSelect id="inputFacility" name="facility" onChange={handleChange}>
                      <option key={36} value={0}>36</option>
                      <option key={21} value={1}>21</option>
                    </CFormSelect>
                  </CCol>
                  <CCol sm={6} md={2}>
                    <CFormLabel htmlFor="inputMonthlyFee" className="fw-bold">
                      Mensalidade
                    </CFormLabel>
                    <CFormInput id="inputMonthlyFee" name="monthlyFee" className="font-monospace" onChange={handleChange} />
                  </CCol>
                </CRow>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputNote" className="fw-bold">
                    Observações
                  </CFormLabel>
                  <CFormTextarea id="inputNote" name="note" onChange={handleChange} />
                </CCol>
              </CForm>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-end p-3">
              <CButton color="primary" size="sm" onClick={handleSubmit}>
                Confirmar
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol md={4} className="mt-3 mt-md-0">
          <CCard>
            <CCardBody>
              <CFormLabel htmlFor="photo-upload" className="profile-photo">
                Custom Upload
              </CFormLabel>
              <input id="photo-upload" type="file" accept="image/*" multiple={false} onChange={onImageChange} />
              {patient.name}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default NewPatient
