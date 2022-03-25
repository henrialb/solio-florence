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
import CIcon from '@coreui/icons-react'
import { cilMoney, cilOptions, cilDescription, cilEuro, cilPin, cilNotes } from '@coreui/icons'

const ReceivableOptions = () => {
  return (
    <CDropdown alignment="end">
      <CDropdownToggle color="transparent" caret={false} className="p-0">
        <CIcon icon={cilOptions} className="text-high-emphasis" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end pt-4">
        <CDropdownItem href="#" className="mt-2">
          <CIcon icon={cilDescription} className="me-2" />
          Adicionar despesa
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEuro} className="me-2" />
          Adicionar conta
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilMoney} className="me-2" />
          Registar pagamento
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

export default ReceivableOptions
