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
import { cilMoney, cilNotes } from '@coreui/icons'
import { api } from 'src/Api'
import ExpensesTableHead from '../expenses/ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/functions'

const MakeReceivableModal = ({ withoutOpenExpenses, expenses, setUpdateExpenses }) => {
  const { id } = useParams()
  const [visible, setVisible] = useState(false)

  const monthName = () => {
    var date = new Date()
    date.getDate() < 20 && date.setMonth(date.getMonth() - 1, 15)
    const month = date.toLocaleString('pt', { month: 'long' })

    return month.charAt(0).toUpperCase() + month.slice(1)
  }

  const [receivable, setReceivable] = useState({
    patientId: Number(id),
    description: `Despesas ${monthName()}`,
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
      // setReceivable(response.data)
      setUpdateExpenses(response.data.id)
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
        <CIcon icon={cilMoney} /> &thinsp;Fazer conta
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
                  {expensesSum}
                </CTableDataCell>
                <CTableDataCell></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CForm className="row g-3 mt-3 mb-4">
            <CCol md={9}>
              <CFormLabel htmlFor="inputDescription" className="fw-bold">
                Descrição
              </CFormLabel>
              <CFormInput id="inputDescription" name="description" defaultValue="Despesas Março" onChange={handleChange} />
            </CCol>
            <CCol md={3}>
              <CFormLabel htmlFor="inputAmount" className="fw-bold text-end">Valor</CFormLabel>
              <CFormInput id="inputAmount" name="amount" defaultValue={expensesSum} className="text-end font-monospace" disabled />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea id="inputNote" name="note" onChange={handleChange} />
            </CCol>
          </CForm>
          Criar conta de despesas com o valor <span className="font-monospace fw-bold">{expensesSum}</span>?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-2">
          <CButton color="secondary" size="sm" variant="outline" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
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

export default MakeReceivableModal
