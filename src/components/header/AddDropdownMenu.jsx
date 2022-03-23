import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilPlus, cilDescription, cilNotes, cilPin } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0">
        <CIcon icon={cilPlus} />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end pt-4">
        <CDropdownItem href="#" className="mt-2">
          <CIcon icon={cilDescription} className="me-2" />
          Adicionar despesa
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" disabled>
          <CIcon icon={cilPin} className="me-2" />
          Aviso enfermagem
        </CDropdownItem>
        <CDropdownItem href="#" disabled>
          <CIcon icon={cilNotes} className="me-2" />
          Resumo diário
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
