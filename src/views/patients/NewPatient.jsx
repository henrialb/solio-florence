/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/Api'
import {
  CRow,
  CCol,
  CCard,
  CCardTitle,
  CCardBody,
  CCardFooter,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCamera } from '@coreui/icons'
import { age, dateFormat } from 'src/functions'

const NewPatient = () => {
  const date = new Date()
  const today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
  const [patient, setPatient] = useState({admissionDate: today, covenant: 'personal', profilePhoto: null})
  const [photo, setPhoto] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setPatient((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.name !== 'profilePhoto' ? event.target.value : event.target.files[0],
      }
    })

    if (event.target.name === 'profilePhoto') { setPhoto(URL.createObjectURL(event.target.files[0])) }
  }

  const handleSubmit = () => {
    const formData = new FormData()
    const config = {headers: { 'content-type': 'multipart/form-data' }}
    const fields = {
      fullName: patient.fullName,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      sex: patient.sex,
      clothesTag: patient.clothesTag,
      citizenNo: patient.citizenNo,
      nifNo: patient.nifNo,
      healthNo: patient.healthNo,
      socialSecurityNo: patient.socialSecurityNo,
      covenant: patient.covenant,
      openDate: patient.admissionDate,
      facility: patient.facility,
      monthlyFee: patient.monthlyFee,
      note: patient.notes
    }

    for (var property in fields) {
      formData.append(property, fields[property])
    }
    patient.profilePhoto && formData.append('profile_photo', patient.profilePhoto)

    api.post('/patients', formData, config)
    .then((response) => {
      console.log(response)
      navigate('/utentes')
    })
  }

  return (
    <>
      <CRow>
        <CCol md={8}>
          <CCard>
            <CCardBody>
              <CCardTitle className="mb-3">Abrir processo</CCardTitle>
              <CForm className="row g-3">
                <CCol sm={6} md={8}>
                  <CFormLabel htmlFor="inputFullName" className="fw-bold">Nome completo</CFormLabel>
                  <CFormInput id="inputFullName" name="fullName" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputFullName" className="fw-bold">Nome de tratamento</CFormLabel>
                  <CFormInput id="inputName" name="name" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputDateOfBirth" className="fw-bold">Data de nascimento</CFormLabel>
                  <CFormInput type="date" id="inputDateOfBirth" name="dateOfBirth" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputSex" className="fw-bold">Sexo</CFormLabel>
                  <CFormSelect id="inputSex" name="sex" defaultValue={''} onChange={handleChange}>
                    <option key={-1} value={''}></option>
                    <option key={0} value="female">Feminino</option>
                    <option key={1} value="male">Masculino</option>
                  </CFormSelect>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputClothesTag" className="fw-bold">Marcação de roupa</CFormLabel>
                  <CFormInput id="inputClothesTag" name="clothesTag" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputCitizenNo" className="fw-bold">Nº CC</CFormLabel>
                  <CFormInput id="inputCitizenNo" name="citizenNo" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputNifNo" className="fw-bold">NIF</CFormLabel>
                  <CFormInput id="inputNifNo" name="nifNo" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputHealthNo" className="fw-bold">Nº Utente de Saúde</CFormLabel>
                  <CFormInput id="inputHealthNo" name="healthNo" onChange={handleChange} />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormLabel htmlFor="inputSocialSecurityNo" className="fw-bold">Nº Seg. Social</CFormLabel>
                  <CFormInput id="inputSocialSecurityNo" name="socialSecurityNo" onChange={handleChange} />
                </CCol>
                <CRow className="mt-3">
                  <CCol sm={6} md={4}>
                    <CFormLabel htmlFor="inputCovenant" className="fw-bold">Acordo</CFormLabel>
                    <CFormSelect id="inputCovenant" name="covenant" defaultValue={0} onChange={handleChange}>
                      <option key={0} value="personal">Privado</option>
                      <option key={1} value="scml">SCML</option>
                    </CFormSelect>
                  </CCol>
                  <CCol sm={6} md={4}>
                    <CFormLabel htmlFor="inputAdmissionDate" className="fw-bold">Data de admissão</CFormLabel>
                    <CFormInput type="date" id="inputAdmissionDate" name="admissionDate" defaultValue={today} onChange={handleChange} />
                  </CCol>
                  <CCol sm={6} md={2}>
                    <CFormLabel htmlFor="inputFacility" className="fw-bold">Casa</CFormLabel>
                    <CFormSelect id="inputFacility" name="facility" defaultValue={null} onChange={handleChange}>
                      <option key={0} value={null}></option>
                      <option key={36} value="36">36</option>
                      <option key={21} value="21">21</option>
                    </CFormSelect>
                  </CCol>
                  <CCol sm={6} md={2}>
                    <CFormLabel htmlFor="inputMonthlyFee" className="fw-bold">Mensalidade</CFormLabel>
                    <CFormInput id="inputMonthlyFee" name="monthlyFee" className="font-monospace" onChange={handleChange} />
                  </CCol>
                </CRow>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputNote" className="fw-bold">Observações</CFormLabel>
                  <CFormTextarea id="inputNote" name="notes" onChange={handleChange} />
                </CCol>
              </CForm>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-start p-3 mt-3 bg-white">
              <CButton color="secondary" size="sm" variant="ghost" href="/utentes">Cancelar</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol md={4} className="mt-3 mt-md-0">
          <CCard>
            <CCardBody>
              <CRow className="d-flex justify-content-center">
                <CFormLabel htmlFor="photo-upload" className="profile-photo-input p-0 d-flex justify-content-center align-items-center text-secondary">
                  {photo !== null ? (
                    <img src={photo} className="patient-photo" alt="Utente" />
                  ) : (
                    <CIcon icon={cilCamera} size="xl" />
                  )}
                </CFormLabel>
                <input id="photo-upload" name="profilePhoto" type="file" accept="image/*" multiple={false} onChange={handleChange} />
              </CRow>
              <CRow className="d-flex justify-content-center">
                <h5 className="mb-3 fw-bold text-center">{patient.name || 'Novo utente'}</h5>
              </CRow>
              <CRow>
                {patient.fullName !== undefined ? (<p><b>Nome:</b> {patient.fullName}</p>) : null}
                {patient.dateOfBirth !== undefined ? (
                  <p><b>Data de nascimento:</b> {dateFormat(patient.dateOfBirth)}&ensp;({age(patient.dateOfBirth)} anos)</p>
                  ) : null}
                {patient.sex !== undefined ? (
                  <p><b>Sexo:</b> {parseInt(patient.sex) === 0 ? 'Feminino' : 'Masculino'}</p>
                  ) : null}
                {patient.clothesTag !== undefined ? (<p><b>Marcação de roupa:</b> {patient.clothesTag}</p>) : null}
                {patient.citizenNo !== undefined ? (<p><b>Cartão de Cidadão:</b> {patient.citizenNo}</p>) : null}
                {patient.nifNo !== undefined ? (<p><b>NIF:</b> {patient.nifNo}</p>) : null}
                {patient.healthNo !== undefined ? (<p><b>Utente de Saúde:</b> {patient.healthNo}</p>) : null}
                {patient.socialSecurityNo !== undefined ? (<p><b>Segurança Social:</b> {patient.socialSecurityNo}</p>) : null}
                {patient.fullName !== undefined ? (<hr />) : null}
                {patient.fullName !== undefined ? (<p><b>Data de Admissão:</b> {dateFormat(patient.admissionDate)}</p>) : null}
                {patient.facility !== undefined ? (<p><b>Casa:</b> {parseInt(patient.facility) === 0 ? '36' : '21'}</p>) : null}
                {patient.monthlyFee !== undefined ? (<p><b>Mensalidade:</b> {patient.monthlyFee}€</p>) : null}
              </CRow>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-end p-3 bg-white">
              <CButton
                color="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={patient.name === undefined || patient.facility === undefined}
              >
                Confirmar
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default NewPatient
