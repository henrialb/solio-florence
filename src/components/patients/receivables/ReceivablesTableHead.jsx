import React from 'react'
import { CTableHead, CTableRow, CTableHeaderCell } from '@coreui/react'

const ReceivablesTableHead = () => (
  <CTableHead color="light">
    <CTableRow>
      <CTableHeaderCell></CTableHeaderCell>
      <CTableHeaderCell>Descrição</CTableHeaderCell>
      <CTableHeaderCell className="text-end">Valor</CTableHeaderCell>
      <CTableHeaderCell></CTableHeaderCell>
    </CTableRow>
  </CTableHead>
)

export default ReceivablesTableHead
