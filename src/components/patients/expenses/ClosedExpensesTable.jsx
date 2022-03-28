/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CTableRow, CTableBody, CTableDataCell, CCardTitle, CPopover } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilCheckAlt } from '@coreui/icons'
import ExpensesTableHead from './ExpensesTableHead'
import ExpensesDetailsModal from './ExpensesDetailsModal'

const ClosedExpensesTable = ({ expenses, includeTableHeader }) => {
  return (
    <>
      <CCardTitle className="mt-4">Em contas</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover responsive>
        {includeTableHeader && <ExpensesTableHead />}
        <CTableBody>
          {expenses.map(({ receivableId, receivableStatus, expenses }) => (
            <React.Fragment key={receivableId}>
              <CTableRow className="bg-light" key={receivableId}>
                <CTableDataCell colSpan="3">
                  Conta <span className="small fw-normal text-muted ms-1">#{receivableId}</span>
                </CTableDataCell>
                <CTableDataCell className="text-end">
                  {receivableStatus === 'paid' && <CIcon icon={cilCheckAlt} className="text-success me-1" />}
                </CTableDataCell>
              </CTableRow>
              {expenses.map((expense) => (
                <ExpensesDetailsModal expense={expense} key={expense.id} />
              ))}
            </React.Fragment>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

ClosedExpensesTable.propTypes = { expenses: PropTypes.array }
ClosedExpensesTable.propTypes = { includeTableHeader: PropTypes.bool }

export default ClosedExpensesTable
