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
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CPopover,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEuro, cilNotes } from '@coreui/icons'
import { api } from 'src/Api'
import ExpensesTableHead from '../expenses/ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/utils/functions'

const MakeReceivableModal = ({ withoutOpenExpenses, expenses, setUpdateExpenses }) => {
  const { id } = useParams()
  const [visible, setVisible] = useState(false)
  const receivableAmount = expenses.reduce((a, b) => a + (Number(b['amount']) || 0), 0)

  const monthName = () => {
    var date = new Date()
    date.getDate() < 20 && date.setMonth(date.getMonth() - 1, 15)
    const month = date.toLocaleString('pt', { month: 'long' })

    return month.charAt(0).toUpperCase() + month.slice(1)
  }

  const description = 'Despesas ' + monthName()

  const [receivable, setReceivable] = useState({
    patientId: Number(id),
    description: description,
    amount: receivableAmount,
  })

  const handleChange = (event) => {
    setReceivable((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = () => {
    api.post('/patient_receivables/create_from_expenses', receivable).then((response) => {
      setUpdateExpenses(Date.now())
      setVisible(false)
    })
  }

  var expensesSum = 0

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
        <CIcon icon={cilEuro} size="sm" /> &thinsp;Fazer conta
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Fazer conta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" className="bg-white" hover>
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
                  {currencyFormat(expensesSum)}
                </CTableDataCell>
                <CTableDataCell></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CForm className="row g-3 mt-3 mb-4">
            <CCol xs={8} s={9}>
              <CFormLabel htmlFor="inputDescription" className="fw-bold">
                Descrição
              </CFormLabel>
              <CFormInput id="inputDescription" name="description" defaultValue={description} onChange={handleChange} />
            </CCol>
            <CCol xs={4} s={3}>
              <CFormLabel htmlFor="inputAmount" className="fw-bold text-end">Valor</CFormLabel>
              <CFormInput id="inputAmount" name="amount" defaultValue={currencyFormat(expensesSum) + ' €'} className="text-end font-monospace" disabled />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea id="inputNote" name="note" onChange={handleChange} />
            </CCol>
          </CForm>
          Criar conta de despesas com o valor <span className="font-monospace fw-bold">{currencyFormat(expensesSum)}</span>?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-end mt-2">
          <CButton color="primary" size="sm" onClick={handleSubmit}>
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
MakeReceivableModal.propTypes = { receivableAmount: PropTypes.number }

export default MakeReceivableModal
