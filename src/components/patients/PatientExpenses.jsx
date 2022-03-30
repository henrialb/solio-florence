/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import { CRow, CCard, CCardBody, CContainer, CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoney } from '@coreui/icons'
import { organiseExpenses } from 'src/functions'
import OpenExpensesTable from './expenses/OpenExpensesTable'
import ClosedExpensesTable from './expenses/ClosedExpensesTable'
// import AddExpenseModal from './expenses/AddExpenseModal'
const AddExpenseModal = React.lazy(() => import('./expenses/AddExpenseModal'))

const PatientExpenses = ({ patientId, patientFiles, patientFullName }) => {
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  const [closedExpenses, openExpenses] = organiseExpenses(expenses)
  const [updateExpenses, setUpdateExpenses] = useState(0)

  useEffect(() => {
    if (patientId || updateExpenses) {
      api
        .get(`/patient_expenses/patient/${patientId}`)
        .then((response) => {
          setExpenses(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [patientId, updateExpenses])

  if (expenses.length === 0) {
    return null
  }

  const withoutOpenExpenses = openExpenses.length === 0 ? true : false
  const withClosedExpenses = closedExpenses.length !== 0 ? true : false

  console.log(patientFiles)

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
                  <AddExpenseModal patientId={patientId} patientFileId={patientFiles.pop()} patientFullName={patientFullName} setUpdateExpenses={setUpdateExpenses} />
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
PatientExpenses.propTypes = { patientFiles: PropTypes.array }
PatientExpenses.propTypes = { patientFullName: PropTypes.string }

export default PatientExpenses
