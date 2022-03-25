import React from 'react'
import {
  CRow,
  CCol,
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CCardTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { organiseReceivables, currencyFormat } from 'src/functions'
import ReceivableStatusBadge from './ReceivableStatusBadge'
import ReceivablesTableHead from './ReceivablesTableHead'
import ReceivableOptions from './ReceivableOptions'

const ReceivablesTables = ({ receivables, patientScml }) => {
  const [receivables1, receivables2] = organiseReceivables(receivables, patientScml)

  const ReceivablesTable = ({ title, receivables }) => (
    <CCol>
      <CCardTitle>{title}</CCardTitle>
      <CTable align="middle" className="mb-2 border bg-white" hover responsive>
        <ReceivablesTableHead />
        <CTableBody>
          {receivables.map((receivable) => (
            <CTableRow className="pointer" key={receivable.id}>
              <CTableDataCell>
                <ReceivableStatusBadge paid={receivable.status === 'paid'} />
              </CTableDataCell>
              <CTableDataCell className="fw-semibold">{receivable.description}</CTableDataCell>
              <CTableDataCell className="text-end font-monospace">
                {currencyFormat(receivable.amount, title === 'Mensalidades' ? 0 : 2)}
              </CTableDataCell>
              <CTableDataCell className="text-end text-secondary">
                <ReceivableOptions />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCol>
  )

  return (
    <CRow>
      <ReceivablesTable title={!patientScml ? 'Despesas' : 'Utente'} receivables={receivables1} />
      <ReceivablesTable title={!patientScml ? 'Mensalidades' : 'SCML'} receivables={receivables2} />
    </CRow>
  )
}

ReceivablesTables.propTypes = { receivables: PropTypes.array }
ReceivablesTables.propTypes = { title: PropTypes.string }
ReceivablesTables.propTypes = { patientScml: PropTypes.bool }

export default ReceivablesTables
