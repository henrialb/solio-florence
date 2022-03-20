import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import {
  CRow,
  CCard,
  CCardBody,
  CContainer,
  CAvatar,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilShortText } from '@coreui/icons'
import { groupBy } from 'src/functions'

const PatientExpenses = ({ patientId }) => {
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors

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

  const groupByReceivable = groupBy('patientReceivableId')
  const sortedExpenses = groupByReceivable(expenses)

  // var indexOfUndefined = sortedExpenses.indexOf(undefined)
  console.log(expenses)
  console.log(sortedExpenses[undefined])

  return (
    <>
      <CRow>
        <CCol md={9}>
          <CCard>
            <CCardBody>
              Despesas
              <CTable align="middle" className="mb-2 border bg-white" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Data</CTableHeaderCell>
                    <CTableHeaderCell>Descrição</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Valor</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {expenses.map((expense, index) => (
                    <CTableRow className="pointer" key={index}>
                      <CTableDataCell>{expense.date}</CTableDataCell>
                      <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
                      <CTableDataCell className="text-center">{expense.amount}</CTableDataCell>
                      <CTableDataCell className="text-end pe-4">
                        <CIcon icon={cilShortText} className="me-2" />
                        <CIcon icon={cilTrash} />
                      </CTableDataCell>
                    </CTableRow>
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

export default PatientExpenses
