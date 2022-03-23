/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import {
  CRow,
  CCard,
  CCardBody,
  CContainer,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardTitle,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash, cilShortText, cilMoney } from '@coreui/icons'
import { organiseExpenses } from 'src/functions'


const ExpensesTableHead = () => {
  return (
    <CTableHead color="light">
      <CTableRow>
        <CTableHeaderCell>Data</CTableHeaderCell>
        <CTableHeaderCell>Descrição</CTableHeaderCell>
        <CTableHeaderCell className="text-center">Valor</CTableHeaderCell>
        <CTableHeaderCell></CTableHeaderCell>
      </CTableRow>
    </CTableHead>
  )
}

const OpenExpensesTable = ({ expenses }) => {
  return (
    <>
      <CCardTitle>Em aberto</CCardTitle>
      <CTable align="middle" className="mb-2 border bg-white" hover responsive>
        <ExpensesTableHead />
        <CTableBody>
          {expenses.map((expense) => (
            <CTableRow className="pointer" key={expense.id}>
              <CTableDataCell>{expense.date}</CTableDataCell>
              <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
              <CTableDataCell className="text-center">{expense.amount}</CTableDataCell>
              <CTableDataCell className="text-end pe-4 text-secondary">
                {expense.note && <CIcon icon={cilShortText} />}
                {expense.patientReceivableId && (
                  <CIcon
                    icon={cilMoney}
                    className={`ms-2 ${expense.receivableStatus === 'paid' && 'text-success'}`}
                  />
                )}
                {!expense.patientReceivableId && <CIcon icon={cilTrash} className="ms-2" />}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

const PatientExpenses = ({ patientId }) => {
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  const [closedExpenses, openExpenses] = organiseExpenses(expenses)

  useEffect(() => {
    if (patientId) {
      api
        .get(`/patient_expenses/patient/${patientId}`)
        .then((response) => {
          setExpenses(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [patientId])

  console.log(closedExpenses)

  if (expenses.length === 0) {
    return null
  }

  const withoutOpenExpenses = (openExpenses.length === 0) ? true : false
  return (
    <>
      <CRow>
        <CCol md={9}>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="auto" className="ms-auto">
                  <CButton size="sm" variant="outline" color="primary" className="me-2"  disabled={withoutOpenExpenses}>
                    <CIcon icon={cilMoney} /> &thinsp;Fazer conta
                  </CButton>
                  <CButton size="sm" color="primary">
                    <CIcon icon={cilPlus} /> &thinsp;Adicionar despesa
                  </CButton>
                </CCol>
              </CRow>
              {withoutOpenExpenses ? (
                <p className="text-center text-secondary my-5">Sem despesas em aberto</p>
              ) : (
                <OpenExpensesTable expenses={openExpenses} />
              )}
              <CCardTitle className="mt-4">Em contas</CCardTitle>
              <CTable align="middle" className="mb-2 border bg-white" hover responsive>
                {withoutOpenExpenses && <ExpensesTableHead />}
                <CTableBody>
                  {closedExpenses.map(({ id, expenses }) => (
                    <>
                      <CTableRow className="bg-light">
                        <th colSpan="4">
                          Conta <span className="small fw-normal text-muted ms-1">#{id}</span>
                        </th>
                      </CTableRow>
                      {expenses.map((expense) => (
                        <CTableRow className="pointer" key={expense.id}>
                          <CTableDataCell>{expense.date}</CTableDataCell>
                          <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
                          <CTableDataCell className="text-center">{expense.amount}</CTableDataCell>
                          <CTableDataCell className="text-end pe-4 text-secondary">
                            {expense.note && <CIcon icon={cilShortText} />}
                            <CIcon
                              icon={cilMoney}
                              className={`ms-2 ${
                                expense.receivableStatus === 'paid' && 'text-success'
                              }`}
                            />
                            {!expense.patientReceivableId && <CIcon icon={cilTrash} className="ms-2" />}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={3}>
          <CContainer>
            <CRow></CRow>
            <CRow></CRow>
          </CContainer>
        </CCol>
      </CRow>
    </>
  )
}

PatientExpenses.propTypes = { patientId: PropTypes.number }
OpenExpensesTable.propTypes = { expenses: PropTypes.array }

export default PatientExpenses
