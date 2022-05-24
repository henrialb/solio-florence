import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Utentes',
    to: '/utentes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
