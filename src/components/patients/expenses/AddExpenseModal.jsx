import React, { useState } from 'react'
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

const AddExpenseModal = () => {
  const [visible, setVisible] = useState(false)

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
              <CFormSelect id="inputPatient">
                <option>Escolher...</option>
                <option>...</option>
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
          <CButton
            color="secondary"
            size="sm"
            className="text-white"
            onClick={() => setVisible(false)}
          >
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

export default AddExpenseModal
