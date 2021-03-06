import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CCardTitle,
  CPopover,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'
import PropTypes from 'prop-types'
import { organiseReceivables, currencyFormat } from 'src/utils/functions'
import ReceivablesTableHead from './ReceivablesTableHead'
import EditReceivableModal from './EditReceivableModal'

const ReceivablesTables = ({ receivables, patientScml, setUpdateReceivables }) => {
  const [receivables1, receivables2] = organiseReceivables(receivables, patientScml)

  const ReceivablesTable = ({ title, receivables }) => (
    <CCol>
      <CCardTitle>{title}</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover>
        <ReceivablesTableHead />
        <CTableBody>
          {receivables.map((receivable) => (
            <EditReceivableModal
              key={receivable.id}
              receivable={receivable}
              table={title}
              setUpdateReceivables={setUpdateReceivables}
              patientScml={patientScml}
            />
          ))}
        </CTableBody>
      </CTable>
    </CCol>
  )

  return (
    <CRow className="gx-5">
      <ReceivablesTable title={!patientScml ? 'Despesas' : 'Utente'} receivables={receivables1} />
      <ReceivablesTable title={!patientScml ? 'Mensalidades' : 'SCML'} receivables={receivables2} />
    </CRow>
  )
}

ReceivablesTables.propTypes = { receivables: PropTypes.array }
ReceivablesTables.propTypes = { title: PropTypes.string }
ReceivablesTables.propTypes = { patientScml: PropTypes.bool }
ReceivablesTables.propTypes = { setUpdateReceivables: PropTypes.func }

export default ReceivablesTables
