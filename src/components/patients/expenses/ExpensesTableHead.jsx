import React from 'react'
import { CTableHead, CTableRow, CTableHeaderCell } from '@coreui/react'

const ExpensesTableHead = () => (
  <CTableHead color="light">
    <CTableRow>
      <CTableHeaderCell>Data</CTableHeaderCell>
      <CTableHeaderCell>Descrição</CTableHeaderCell>
      <CTableHeaderCell className="text-end">Valor</CTableHeaderCell>
      <CTableHeaderCell></CTableHeaderCell>
    </CTableRow>
  </CTableHead>
)

export default ExpensesTableHead
