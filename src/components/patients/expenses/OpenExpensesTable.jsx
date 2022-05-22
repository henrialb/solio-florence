import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CTableBody, CCardTitle } from '@coreui/react'
import ExpensesTableHead from './ExpensesTableHead'
import EditExpenseModal from './EditExpenseModal'

const OpenExpensesTable = ({ expenses, setUpdateExpenses }) => {
  return (
    <>
      <CCardTitle>Em aberto</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover>
        <ExpensesTableHead />
        <CTableBody>
          {expenses.map((expense) => (
            <EditExpenseModal
              expense={expense}
              key={expense.id}
              setUpdateExpenses={setUpdateExpenses}
            />
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

OpenExpensesTable.propTypes = { expenses: PropTypes.array }
OpenExpensesTable.propTypes = { setUpdateExpenses: PropTypes.func }

export default OpenExpensesTable
