/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import { CRow, CCard, CCardBody, CContainer, CCol } from '@coreui/react'
import { organiseExpenses } from 'src/utils/functions'
import OpenExpensesTable from './expenses/OpenExpensesTable'
import ClosedExpensesTable from './expenses/ClosedExpensesTable'
import AddExpenseModal from './expenses/AddExpenseModal'
import MakeReceivableModal from './receivables/MakeReceivableModal'
import { Navigate } from 'react-router-dom'
import { deleteAuthToken } from 'src/utils/auth'

const PatientExpenses = ({ patientId, patientFullName }) => {
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  const [closedExpenses, openExpenses] = organiseExpenses(expenses)
  const [updateExpenses, setUpdateExpenses] = useState(null)

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

  const withoutOpenExpenses = openExpenses.length === 0 ? true : false
  const withClosedExpenses = closedExpenses.length !== 0 ? true : false

  if (error && error.message === 'Request failed with status code 500') {
    deleteAuthToken()
    return <Navigate to="/entrar" />
  }

  return (
    <>
      <CRow>
        <CCol md={9}>
          <CCard>
            <CCardBody>
              <CRow className="mb-2">
                <CCol sm="auto" className="ms-auto">
                  <MakeReceivableModal
                    withoutOpenExpenses={withoutOpenExpenses}
                    expenses={openExpenses}
                    setUpdateExpenses={setUpdateExpenses}
                  />
                  <AddExpenseModal
                    patientFullName={patientFullName}
                    setUpdateExpenses={setUpdateExpenses}
                  />
                </CCol>
              </CRow>
              {withoutOpenExpenses ? (
                <p className="text-center text-secondary my-5">Sem despesas em aberto</p>
              ) : (
                <OpenExpensesTable expenses={openExpenses} setUpdateExpenses={setUpdateExpenses} />
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
