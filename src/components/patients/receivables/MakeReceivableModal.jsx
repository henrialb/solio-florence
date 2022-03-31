/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CPopover,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilNotes } from '@coreui/icons'
import { api } from 'src/Api'
import ExpensesTableHead from '../expenses/ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/functions'

const MakeReceivableModal = ({ withoutOpenExpenses, expenses, setUpdateExpenses }) => {
  const [visible, setVisible] = useState(false)

  const handleSubmit = (id) => {
    api.post('/patient_receivables').then(() => {
      setUpdateExpenses(id)
      // setVisible(false) TODO: Unmounted component? The modal closes anyway because of a bug with the Dropdown auto close
    })
  }

  let expensesSum = 0

  return (
    <>
      <CButton
        size="sm"
        variant="outline"
        color="primary"
        className="me-2"
        disabled={withoutOpenExpenses}
        onClick={() => setVisible(true)}
      >
        <CIcon icon={cilMoney} /> &thinsp;Fazer conta
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Fazer conta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" className="mb-4 bg-white" hover>
            <ExpensesTableHead />
            <CTableBody>
              {expenses.map((expense) => {
                expensesSum += Number(expense.amount)
                return (
                  <CTableRow key={expense.id}>
                    <CTableDataCell className="font-monospace small text-dark">
                      {dateFormat(expense.date)}
                    </CTableDataCell>
                    <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
                    <CTableDataCell className="text-end font-monospace">
                      {currencyFormat(expense.amount)}
                    </CTableDataCell>
                    <CTableDataCell className="text-end pe-2 text-secondary">
                      {expense.note && (
                        <CPopover content={expense.note} trigger="hover">
                          <CIcon icon={cilNotes} />
                        </CPopover>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
              <CTableRow className="bg-light">
                <CTableDataCell colSpan="2" className="fw-bold">
                  Total
                </CTableDataCell>
                <CTableDataCell className="fw-bold text-end font-monospace">
                  {expensesSum}
                </CTableDataCell>
                <CTableDataCell></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          Criar conta de despesas com o valor <span className="font-monospace fw-bold">{expensesSum}</span>?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-3">
          <CButton color="secondary" size="sm" variant="outline" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary" size="sm" onClick={() => handleSubmit}>
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

MakeReceivableModal.propTypes = { withoutOpenExpenses: PropTypes.bool }
MakeReceivableModal.propTypes = { expenses: PropTypes.array }
MakeReceivableModal.propTypes = { setUpdateExpenses: PropTypes.func }

export default MakeReceivableModal
