/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/Api'
import {
  CRow,
  CCol,
  CCard,
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
import { age, dateFormat } from 'src/utils/functions'

const NewPatient = () => {
  const date = new Date()
  const today =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')

  const [patient, setPatient] = useState({
    openDate: today,
    covenant: 'personal',
    profilePhoto: null
  })

  const [photo, setPhoto] = useState(null)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setPatient((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]:
          event.target.name !== 'profilePhoto' ? event.target.value : event.target.files[0]
      }
    })

    if (event.target.name === 'profilePhoto') {
      setPhoto(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()
    const config = { headers: { 'content-type': 'multipart/form-data' } }

    // Add patient properties to formData
    for (var property in patient) {
      formData.append(property, patient[property])
    }

    api.post('/patients', formData, config).then((response) => {
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
              <h2 className="fw-bold mb-4">Novo utente</h2>
              <CForm className="row g-3">
                <CCol sm={12}>
                  <CFormInput
                    id="inputFullName"
                    name="fullName"
                    floatingLabel="Nome completo"
                    placeholder="Nome completo"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputName"
                    name="name"
                    floatingLabel="Nome de tratamento"
                    placeholder="Nome de tratamento"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    type="date"
                    id="inputDateOfBirth"
                    name="dateOfBirth"
                    floatingLabel="Data de nascimento"
                    placeholder="Data de nascimento"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormSelect
                    id="inputSex"
                    name="sex"
                    defaultValue={''}
                    floatingLabel="Sexo"
                    placeholder="Sexo"
                    onChange={handleChange}
                  >
                    <option key={-1} value={''}></option>
                    <option key={0} value="female">
                      Feminino
                    </option>
                    <option key={1} value="male">
                      Masculino
                    </option>
                  </CFormSelect>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputCitizenNum"
                    name="citizenNum"
                    floatingLabel="Cartão de Cidadão"
                    placeholder="Cartão de Cidadão"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputNifNum"
                    name="nifNum"
                    floatingLabel="NIF"
                    placeholder="NIF"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputHealthNum"
                    name="healthNum"
                    floatingLabel="Utente de Saúde"
                    placeholder="Utente de Saúde"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputSocialSecurityNum"
                    name="socialSecurityNum"
                    floatingLabel="Segurança Social"
                    placeholder="Segurança Social"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormSelect
                    id="inputCovenant"
                    name="covenant"
                    floatingLabel="Acordo"
                    placeholder="Acordo"
                    defaultValue={0}
                    onChange={handleChange}
                  >
                    <option key={0} value="personal">
                      Privado
                    </option>
                    <option key={1} value="scml">
                      SCML
                    </option>
                  </CFormSelect>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    type="date"
                    id="inputOpenDate"
                    name="openDate"
                    floatingLabel="Data de admissão"
                    placeholder="Data de admissão"
                    defaultValue={today}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormSelect
                    id="inputFacility"
                    name="facility"
                    floatingLabel="Casa"
                    placeholder="Casa"
                    defaultValue={null}
                    onChange={handleChange}
                  >
                    <option key={0} value={null}></option>
                    <option key={36} value="36">
                      36
                    </option>
                    <option key={21} value="21">
                      21
                    </option>
                  </CFormSelect>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputClothesTag"
                    name="clothesTag"
                    floatingLabel="Marcação de roupa"
                    placeholder="Marcação de roupa"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                    id="inputMonthlyFee"
                    name="monthlyFee"
                    className="font-monospace"
                    floatingLabel="Mensalidade"
                    placeholder="Mensalidade"
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormTextarea
                    id="inputNote"
                    name="note"
                    floatingLabel="Observações"
                    placeholder="Observações"
                    onChange={handleChange}
                  />
                </CCol>
              </CForm>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-start p-3 mt-3 bg-white">
              <CButton color="secondary" size="sm" variant="ghost" href="/utentes">
                Cancelar
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol md={4} className="mt-3 mt-md-0">
          <CCard>
            <CCardBody>
              <CRow className="d-flex justify-content-center">
                <CFormLabel
                  htmlFor="photo-upload"
                  className="profile-photo-input p-0 d-flex justify-content-center align-items-center text-secondary"
                >
                  {photo !== null ? (
                    <img src={photo} className="patient-photo" alt="Utente" />
                  ) : (
                    <CIcon icon={cilCamera} size="xl" />
                  )}
                </CFormLabel>
                <input
                  id="photo-upload"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={handleChange}
                />
              </CRow>
              <CRow className="d-flex justify-content-center">
                <h5 className="mb-3 fw-bold text-center">{patient.name}</h5>
              </CRow>
              <CRow>
                {patient.fullName && (
                  <p>
                    <b>Nome:</b> {patient.fullName}
                  </p>
                )}
                {patient.dateOfBirth && (
                  <p>
                    <b>Data de nascimento:</b> {dateFormat(patient.dateOfBirth)}&ensp;(
                    {age(patient.dateOfBirth)} anos)
                  </p>
                )}
                {patient.sex && (
                  <p>
                    <b>Sexo:</b> {patient.sex === 'female' ? 'Feminino' : 'Masculino'}
                  </p>
                )}
                {patient.citizenNum && (
                  <p>
                    <b>Cartão de Cidadão:</b> {patient.citizenNum}
                  </p>
                )}
                {patient.nifNum && (
                  <p>
                    <b>NIF:</b> {patient.nifNum}
                  </p>
                )}
                {patient.healthNum && (
                  <p>
                    <b>Utente de Saúde:</b> {patient.healthNum}
                  </p>
                )}
                {patient.socialSecurityNum && (
                  <p>
                    <b>Segurança Social:</b> {patient.socialSecurityNum}
                  </p>
                )}
                {patient.fullName && (
                  <>
                    <hr />
                    <p>
                      <b>Data de Admissão:</b> {dateFormat(patient.openDate)}
                    </p>
                  </>
                )}
                {patient.facility && (
                  <p>
                    <b>Casa:</b> {patient.facility}
                  </p>
                )}
                {patient.clothesTag && (
                  <p>
                    <b>Marcação de roupa:</b> {patient.clothesTag}
                  </p>
                )}
                {patient.monthlyFee && (
                  <p>
                    <b>Mensalidade:</b> {patient.monthlyFee}€
                  </p>
                )}
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
