import React, { useState } from 'react'
import {
  CTableRow,
  CTableDataCell,
  CPopover,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'
import { dateFormat, currencyFormat } from 'src/functions'
import PropTypes from 'prop-types'

const ExpensesDetailsModal = ({ expense }) => {
  const [visible, setVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)

  if (expense.length === 0) {
    return null
  }

  return (
    <>
      <CTableRow className="pointer" key={expense.id} onClick={() => setVisible(!visible)}>
        <CTableDataCell className="font-monospace small text-dark">
          {dateFormat(expense.date)}
        </CTableDataCell>
        <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
        <CTableDataCell className="text-end font-monospace">
          {currencyFormat(expense.amount)}
        </CTableDataCell>
        <CTableDataCell className="text-end pe-2 text-secondary">
          {expense.note && (
            <CPopover content={expense.note}>
              <CIcon icon={cilNotes} className="me-1" />
            </CPopover>
          )}
        </CTableDataCell>
      </CTableRow>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setEditMode(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Despesa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <CFormLabel htmlFor="inputDescription">Descrição</CFormLabel>
              <CFormInput
                id="inputDescription"
                defaultValue={expense.description}
                disabled={!editMode}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputDate">Data</CFormLabel>
              <CFormInput id="inputDate" defaultValue={expense.date} disabled={!editMode} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputAmount">Valor</CFormLabel>
              <CFormInput
                type="decimal"
                id="inputAmount"
                defaultValue={expense.amount}
                disabled={!editMode}
              />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="inputNote">Nota</CFormLabel>
              <CFormTextarea id="inputNote" defaultValue={expense.note} disabled={!editMode} />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between">
          <CButton
            color="secondary"
            size="sm"
            className="text-white"
            onClick={() => setVisible(false)}
          >
            Fechar
          </CButton>
          {!editMode ? (
            <CButton color="primary" size="sm" onClick={() => setEditMode(!editMode)}>
              Editar despesa
            </CButton>
          ) : (
            <CButton color="primary" size="sm" onClick={() => setEditMode(!editMode)}>
              Guardar
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

ExpensesDetailsModal.propTypes = { expense: PropTypes.object }

export default ExpensesDetailsModal
