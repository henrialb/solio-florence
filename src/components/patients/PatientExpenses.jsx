/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import { CRow, CCard, CCardBody, CContainer, CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMoney } from '@coreui/icons'
import { organiseExpenses } from 'src/functions'
import OpenExpensesTable from './expenses/OpenExpensesTable'
import ClosedExpensesTable from './expenses/ClosedExpensesTable'
import AddExpenseModal from './expenses/AddExpenseModal'

const PatientExpenses = ({ patientId }) => {
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  const [addExpenseVisible, setAddExpenseVisible] = useState(false)
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

  if (expenses.length === 0) {
    return null
  }

  const withoutOpenExpenses = openExpenses.length === 0 ? true : false
  const withClosedExpenses = closedExpenses.length !== 0 ? true : false

  return (
    <>
      <CRow>
        <CCol md={9}>
          <CCard>
            <CCardBody>
              <CRow className="mb-2">
                <CCol sm="auto" className="ms-auto">
                  <CButton size="sm" variant="outline" color="primary" className="me-2" disabled={withoutOpenExpenses}>
                    <CIcon icon={cilMoney} /> &thinsp;Fazer conta
                  </CButton>
                  <AddExpenseModal />
                </CCol>
              </CRow>
              {withoutOpenExpenses ? (
                <p className="text-center text-secondary my-5">Sem despesas em aberto</p>
              ) : (
                <OpenExpensesTable expenses={openExpenses} />
              )}
              {withClosedExpenses && (
                <ClosedExpensesTable expenses={closedExpenses} includeTableHeader={withoutOpenExpenses} />
              )}
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
