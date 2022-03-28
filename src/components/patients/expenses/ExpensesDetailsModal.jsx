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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'
import { dateFormat, currencyFormat } from 'src/functions'
import PropTypes from 'prop-types'

const ExpensesDetailsModal = ({ expense }) => {
  const [visible, setVisible] = useState(false)

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
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>O Título da despesa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Data: {expense.date} <br></br>
          Descrição: {expense.description} <br></br>
          Valor: {expense.amount} <br></br>
          Nota: {expense.note}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary">Editar despesa</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ExpensesDetailsModal.propTypes = { expense: PropTypes.object }

export default ExpensesDetailsModal
