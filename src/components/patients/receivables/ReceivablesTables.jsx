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
import { organiseReceivables, currencyFormat } from 'src/functions'
import ReceivablesTableHead from './ReceivablesTableHead'
import ReceivableOptions from './ReceivableOptions'
import EditReceivableModal from './EditReceivableModal'

const ReceivablesTables = ({ receivables, patientScml, setUpdateReceivables }) => {
  const [receivables1, receivables2] = organiseReceivables(receivables, patientScml)
  const [visible, setVisible] = useState(false)

  const ReceivablesTable = ({ title, receivables }) => (
    <CCol>
      <CCardTitle>{title}</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover>
        <ReceivablesTableHead />
        <CTableBody>
          {receivables.map((receivable) => (
            // <CTableRow className="pointer" key={receivable.id} onClick={() => setVisible(!visible)}>
            //   <CTableDataCell>
            //     <ReceivableStatusBadge paid={receivable.status === 'paid'} />
            //   </CTableDataCell>
            //   <CTableDataCell className="fw-semibold">{receivable.description}</CTableDataCell>
            //   <CTableDataCell className="text-end font-monospace">
            //     {currencyFormat(receivable.amount, title === 'Mensalidades' ? 0 : 2)}
            //   </CTableDataCell>
            //   <CTableDataCell className="text-end text-secondary">
            //     {receivable.note && (
            //       <CPopover content={receivable.note} trigger="hover">
            //         <CIcon icon={cilNotes} />
            //       </CPopover>
            //     )}
            //     <ReceivableOptions
            //       receivableId={receivable.id}
            //       hasNote={typeof receivable.note !== 'undefined'}
            //       setUpdateReceivables={setUpdateReceivables}
            //     />
            //   </CTableDataCell>
            // </CTableRow>
            <EditReceivableModal key={receivable.id} receivable={receivable} table={title} />
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
