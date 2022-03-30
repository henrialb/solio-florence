import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CTableRow, CTableBody, CTableDataCell, CCardTitle, CPopover } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'
import ExpensesTableHead from './ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/functions'
import ExpenseOptions from './ExpenseOptions'

const OpenExpensesTable = ({ expenses }) => {
  return (
    <>
      <CCardTitle>Em aberto</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover>
        <ExpensesTableHead />
        <CTableBody>
          {expenses.map((expense) => (
            <CTableRow className="pointer" key={expense.id}>
              <CTableDataCell className="font-monospace small text-dark">
                {dateFormat(expense.date)}
              </CTableDataCell>
              <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
              <CTableDataCell className="text-end font-monospace">
                {currencyFormat(expense.amount)}
              </CTableDataCell>
              <CTableDataCell className="text-end pe-2 text-secondary">
                {expense.note && (
                  <CPopover content={expense.note} trigger={['hover', 'click']}>
                    <CIcon icon={cilNotes} />
                  </CPopover>
                )}
                <ExpenseOptions />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

OpenExpensesTable.propTypes = { expenses: PropTypes.array }

export default OpenExpensesTable
