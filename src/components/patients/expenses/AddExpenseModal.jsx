/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
// import PickDate from 'src/components/PickDate'
import { api } from 'src/Api'

const AddExpenseModal = ({ setUpdateExpenses, patientFullName = null }) => {
  const [visible, setVisible] = useState(false)
  const [patients, setPatients] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  const { id } = useParams()

  const date = new Date()
  const today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()
  const [expense, setExpense] = useState({patientId: Number(id), date: today})

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

  const handleChange = (event) => {
    setExpense((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.name !== 'amount' ? event.target.value : event.target.value.replace(/,/g, '.'),
      }
    })
  }

  const handleSubmit = () => {
    api.post('/patient_expenses', expense).then((response) => {
      setExpense(response.data)
      setUpdateExpenses(response.data.id)
      setVisible(false)
    })
  }

  return (
    <>
      <CButton size="sm" color="primary" onClick={() => setVisible(true)}>
        <CIcon icon={cilPlus} /> &thinsp;Adicionar despesa
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => [
          setVisible(false),
          setExpense({ patientId: id, date: today }),
        ]}
      >
        <CModalHeader>
          <CModalTitle>Adicionar despesa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <CFormLabel htmlFor="inputPatient" className="fw-bold">
                Utente
              </CFormLabel>
              <CFormSelect id="inputPatient" defaultValue={id} disabled={id !== null}>
                {id === null ? (
                  patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.fullName}
                    </option>
                  ))
                ) : (
                  <option key={id} value={id}>
                    {patientFullName}
                  </option>
                )}
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
              <CFormInput type="decimal" id="inputAmount" name="amount" className="font-monospace" onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputDate" className="fw-bold">
                Data
              </CFormLabel>
              <CFormInput type="date" id="inputDate" name="date" defaultValue={today} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea id="inputNote" name="note" onChange={handleChange} />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-3">
          <CButton color="secondary" size="sm" variant="outline" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary" size="sm" onClick={handleSubmit}>
            Adicionar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AddExpenseModal.propTypes = { patientFullName: PropTypes.string }
AddExpenseModal.propTypes = { setUpdateExpenses: PropTypes.func }

export default AddExpenseModal
