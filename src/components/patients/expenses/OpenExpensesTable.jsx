import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CTableRow, CTableBody, CTableDataCell, CCardTitle, CPopover } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilMoney, cilTrash } from '@coreui/icons'
import ExpensesTableHead from './ExpensesTableHead'
import { dateFormat, currencyFormat } from 'src/functions'

const OpenExpensesTable = ({ expenses }) => {
  return (
    <>
      <CCardTitle>Em aberto</CCardTitle>
      <CTable align="middle" className="mb-2 bg-white" hover responsive>
        <ExpensesTableHead />
        <CTableBody>
          {expenses.map((expense) => (
            <CTableRow className="pointer" key={expense.id}>
              <CTableDataCell>{dateFormat(expense.date)}</CTableDataCell>
              <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
              <CTableDataCell className="text-end font-monospace">
                {currencyFormat(expense.amount)}
              </CTableDataCell>
              <CTableDataCell className="text-end pe-2 text-secondary">
                {expense.note && <CIcon icon={cilNotes} />}
                {expense.patientReceivableId && (
                  <CIcon
                    icon={cilMoney}
                    className={`ms-2 ${expense.receivableStatus === 'paid' && 'text-success'}`}
                  />
                )}
                {!expense.patientReceivableId && <CIcon icon={cilTrash} className="ms-3" />}
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
