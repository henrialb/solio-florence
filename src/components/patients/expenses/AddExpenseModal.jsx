import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import PickDate from 'src/components/PickDate'
import { api } from 'src/Api'

const AddExpenseModal = ({ patientId = null, patientFullName = null }) => {
  const [visible, setVisible] = useState(false)
  const [patients, setPatients] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors

  useEffect(() => {
    if (patientFullName === null) {
      api
        .get('patients')
        .then((response) => {
          setPatients(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]) // TODO: this requests the API every time the modal visibility changes.
  // It was a make shift solution to display the patients list in the select menu.

  return (
    <>
      <CButton size="sm" color="primary" onClick={() => setVisible(true)}>
        <CIcon icon={cilPlus} /> &thinsp;Adicionar despesa
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Adicionar despesa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <CFormLabel htmlFor="inputPatient" className="fw-bold">
                Utente
              </CFormLabel>
              <CFormSelect id="inputPatient" defaultValue={patientId} disabled={patientId !== null}>
                {patientId === null ? (
                  patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.fullName}
                    </option>
                  ))
                ) : (
                  <option key={patientId} value={patientId}>
                    {patientFullName}
                  </option>
                )}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="inputDescription" className="fw-bold">
                Descrição
              </CFormLabel>
              <CFormInput id="inputDescription" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputAmount" className="fw-bold">
                Valor
              </CFormLabel>
              <CFormInput type="decimal" id="inputAmount" className="font-monospace" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputDate" className="fw-bold">
                Data
              </CFormLabel>
              <PickDate />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-3">
          <CButton color="secondary" size="sm" variant="outline" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary" size="sm">
            Adicionar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AddExpenseModal.propTypes = { patientId: PropTypes.number }
AddExpenseModal.propTypes = { patientFullName: PropTypes.string }

export default AddExpenseModal
