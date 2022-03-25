import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilCheckAlt } from '@coreui/icons'

const ReceivableStatusBadge = (receivableStatus) => {
  return receivableStatus.paid ? (
    <span className="badge ms-2 p-2 rounded-circle bg-success text-white border-success-dark">
      <CIcon icon={cilCheckAlt} />
    </span>
  ) : (
    <span className="badge ms-2 p-2 rounded-circle bg-light text-secondary dashed border-secondary">
      <CIcon icon={cilMoney} />
    </span>
  )
}

export default ReceivableStatusBadge
