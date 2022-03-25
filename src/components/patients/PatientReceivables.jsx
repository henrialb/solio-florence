import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCardTitle,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilShortText, cilMoney, cilPlus } from '@coreui/icons'
import { organiseReceivables, organiseReceivablesScml, currencyFormat } from 'src/functions'

const PatientReceivables = ({ patientId, patientScml }) => {
  const [receivables, setReceivables] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors

  useEffect(() => {
    if (patientId) {
      api
        .get(`/patient_receivables/patient/${patientId}`)
        .then((response) => {
          setReceivables(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [patientId])

  const [expensesReceivables, monthlyFeeReceivables] = organiseReceivables(receivables)
  const [personalReceivables, scmlReceivables] = organiseReceivablesScml(receivables)

  const Buttons = () => (
    <CRow className="mb-2">
      <CCol sm="auto" className="ms-auto">
        <CButton size="sm" variant="outline" color="primary" className="me-2">
          <CIcon icon={cilPlus} /> &thinsp;Adicionar conta
        </CButton>
        <CButton size="sm" color="primary">
          <CIcon icon={cilMoney} /> &thinsp;Registar pagamennto
        </CButton>
      </CCol>
    </CRow>
  )

  const TableHead = () => (
    <CTableHead color="light">
      <CTableRow>
        <CTableHeaderCell></CTableHeaderCell>
        <CTableHeaderCell>Descrição</CTableHeaderCell>
        <CTableHeaderCell className="text-end">Valor</CTableHeaderCell>
        <CTableHeaderCell></CTableHeaderCell>
      </CTableRow>
    </CTableHead>
  )

  if (!patientScml) {
    return (
      <>
        <CRow>
          <CCard>
            <CCardBody>
              <Buttons />
              <CRow>
                <CCol>
                  <CCardTitle>Despesas</CCardTitle>
                  <CTable align="middle" className="mb-2 border bg-white" hover responsive>
                    <TableHead />
                    <CTableBody>
                      {expensesReceivables.map((receivable) => (
                        <CTableRow className="pointer" key={receivable.id}>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell className="fw-semibold">
                            {receivable.description}
                          </CTableDataCell>
                          <CTableDataCell className="text-end font-monospace">
                            {currencyFormat(receivable.amount)}
                          </CTableDataCell>
                          <CTableDataCell className="text-end pe-4 text-secondary">
                            {receivable.status}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol>
                  <CCardTitle>Mensalidades</CCardTitle>
                  <CTable align="middle" className="mb-2 border bg-white" hover responsive>
                    <TableHead />
                    <CTableBody>
                      {monthlyFeeReceivables.map((receivable) => (
                        <CTableRow className="pointer" key={receivable.id}>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell className="fw-semibold">
                            {receivable.description}
                          </CTableDataCell>
                          <CTableDataCell className="text-end font-monospace">
                            {currencyFormat(receivable.amount, 0)}
                          </CTableDataCell>
                          <CTableDataCell className="text-end pe-4 text-secondary">
                            {receivable.status}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CRow>
      </>
    )
  } else {
    return (
      <>
        <CRow>
          <CCard>
            <CCardBody>
              <Buttons />
              <CRow>
                <CCol>
                  <CCardTitle>Mensalidades utente</CCardTitle>
                  <CTable align="middle" className="mb-2 border bg-white" hover responsive>
                    <TableHead />
                    <CTableBody>
                      {personalReceivables.map((receivable) => (
                        <CTableRow className="pointer" key={receivable.id}>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell className="fw-semibold">
                            {receivable.description}
                          </CTableDataCell>
                          <CTableDataCell className="text-end font-monospace">
                            {currencyFormat(receivable.amount)}
                          </CTableDataCell>
                          <CTableDataCell className="text-end pe-4 text-secondary">
                            {receivable.status}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol>
                  <CCardTitle>Mensalidades SCML</CCardTitle>
                  <CTable align="middle" className="mb-2 border bg-white" hover responsive>
                    <TableHead />
                    <CTableBody>
                      {scmlReceivables.map((receivable) => (
                        <CTableRow className="pointer" key={receivable.id}>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell className="fw-semibold">
                            {receivable.description}
                          </CTableDataCell>
                          <CTableDataCell className="text-end font-monospace">
                            {currencyFormat(receivable.amount)}
                          </CTableDataCell>
                          <CTableDataCell className="text-end pe-4 text-secondary">
                            {receivable.status}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CRow>
      </>
    )
  }
}

PatientReceivables.propTypes = { patientId: PropTypes.number }
PatientReceivables.propTypes = { patientScml: PropTypes.bool }

export default PatientReceivables
