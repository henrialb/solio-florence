/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CTableRow, CTableBody, CTableDataCell, CCardTitle, CPopover } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilMoney, cilTrash } from '@coreui/icons'
import ExpensesTableHead from './ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/functions'

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
                <th colSpan="4">
                  Conta <span className="small fw-normal text-muted ms-1">#{receivableId} {receivableStatus}</span>
                </th>
              </CTableRow>
              {expenses.map((expense) => (
                <CTableRow className="pointer" key={expense.id}>
                  <CTableDataCell>{dateFormat(expense.date)}</CTableDataCell>
                  <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
                  <CTableDataCell className="text-end font-monospace">{currencyFormat(expense.amount)}</CTableDataCell>
                  <CTableDataCell className="text-end pe-2 text-secondary">
                    {expense.note && (
                      <CPopover content={expense.note}>
                        <CIcon icon={cilNotes} />
                      </CPopover>
                    )}
                    <CIcon
                      icon={cilMoney}
                      className={`ms-3 ${expense.receivableStatus === 'paid' && 'text-success'}`}
                    />
                  </CTableDataCell>
                </CTableRow>
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
