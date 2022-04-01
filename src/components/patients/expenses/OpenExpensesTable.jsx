import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CTableRow, CTableBody, CTableDataCell, CCardTitle, CPopover } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'
import ExpensesTableHead from './ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/functions'
import ExpenseOptions from './ExpenseOptions'
import ExpenseDetailsModal from './ExpenseDetailsModal'

const OpenExpensesTable = ({ expenses }) => {
  return (
    <>
      <CCardTitle>Em aberto</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover>
        <ExpensesTableHead />
        <CTableBody>
          {expenses.map((expense) => (
            <ExpenseDetailsModal expense={expense} key={expense.id} />
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

OpenExpensesTable.propTypes = { expenses: PropTypes.array }
OpenExpensesTable.propTypes = { setUpdateExpenses: PropTypes.func }

export default OpenExpensesTable
