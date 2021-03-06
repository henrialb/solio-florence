/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
import { cilMoney, cilCheckAlt } from '@coreui/icons'
import { api } from 'src/Api'
import { currencyFormat } from 'src/utils/functions'
import { Navigate } from 'react-router-dom'
import { deleteAuthToken } from 'src/utils/auth'

const AddPaymentModal = ({
  amount = null,
  modalTriggerIsButton,
  patientScml,
  receivableAccountable,
  receivablePaid,
  setUpdateReceivables,
}) => {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null) // TODO: handle errors
  const { id } = useParams()

  const date = new Date()
  const today =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  const [payment, setPayment] = useState({
    patientId: Number(id),
    date: today,
    amount: amount,
    method: 0,
    accountable: receivableAccountable,
  })

  const handleChange = (event) => {
    setPayment((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]:
          event.target.name !== 'amount'
            ? event.target.value
            : event.target.value.replace(/,/g, '.'),
      }
    })
  }

  const handleChangeInt = (event) => {
    setPayment((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: +event.target.value,
      }
    })
  }

  const handleSubmit = () => {
    api
      .post('/patient_payments', payment)
      .then((response) => {
        // setPayment(response.data)
        setUpdateReceivables(Date.now())
        setVisible(false)
      })
      .catch((error) => {
        setError(error)
      })
  }

  if (error && error.message === 'Request failed with status code 500') {
    deleteAuthToken()
    return <Navigate to="/entrar" />
  }

  return (
    <>
      {modalTriggerIsButton ? (
        <CButton size="sm" color="primary" onClick={() => setVisible(true)}>
          <CIcon icon={cilMoney} size="sm" /> &thinsp;Registar pagamento
        </CButton>
      ) : receivablePaid ? (
        <span className="badge ms-2 p-2 rounded-circle bg-success text-white border-success-dark">
          <CIcon icon={cilCheckAlt} />
        </span>
      ) : (
        <span
          className="badge ms-2 p-2 rounded-circle bg-light text-secondary dashed border-secondary pointer"
          onClick={() => setVisible(true)}
        >
          <CIcon icon={cilMoney} />
        </span>
      )}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => [
          setVisible(false),
          setPayment({
            patientId: Number(id),
            date: today,
            amount: amount,
            method: 0,
            accountable: receivableAccountable,
          }),
        ]}
      >
        <CModalHeader>
          <CModalTitle>Registar pagamento</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputAmount" className="fw-bold">
                Valor recebido
              </CFormLabel>
              <CFormInput
                id="inputAmount"
                name="amount"
                placeholder="0,00"
                defaultValue={amount && currencyFormat(amount)}
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
              <CFormLabel htmlFor="inputMethod" className="fw-bold">
                M??todo
              </CFormLabel>
              <CFormSelect
                id="inputMethod"
                name="method"
                defaultValue={0}
                onChange={handleChangeInt}
              >
                <option key={0} value={0}>
                  Transfer??ncia banc??ria
                </option>
                <option key={1} value={1}>
                  Numer??rio
                </option>
                <option key={3} value={3}>
                  Vale
                </option>
                <option key={2} value={2} disabled>
                  Refer??ncia Multibanco
                </option>
                {/* <option key={4} value={4} disabled>Bitcoin</option> */}
              </CFormSelect>
            </CCol>
            {modalTriggerIsButton && patientScml && (
              <CCol md={12}>
                <CFormLabel htmlFor="inputAccountable" className="fw-bold">
                  Pagador
                </CFormLabel>
                <CFormSelect
                  id="inputAccountable"
                  name="accountable"
                  defaultValue={0}
                  onChange={handleChangeInt}
                >
                  <option key={0} value={0}>
                    Utente
                  </option>
                  <option key={1} value={1}>
                    SCML
                  </option>
                </CFormSelect>
              </CCol>
            )}
            <CCol md={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea id="inputNote" name="note" onChange={handleChange} />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-end mt-3">
          <CButton color="primary" size="sm" onClick={handleSubmit}>
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

AddPaymentModal.propTypes = { amount: PropTypes.number }
AddPaymentModal.propTypes = { modalTriggerIsButton: PropTypes.bool }
AddPaymentModal.propTypes = { patientScml: PropTypes.bool }
AddPaymentModal.propTypes = { receivableAccountable: PropTypes.bool }
AddPaymentModal.propTypes = { receivablePaid: PropTypes.bool }
AddPaymentModal.propTypes = { setUpdateReceivables: PropTypes.func }

export default AddPaymentModal
