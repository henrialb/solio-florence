import React from 'react'
import PropTypes from 'prop-types'
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
import {
  cilMoney,
  cilOptions,
  cilDescription,
  cilEuro,
  cilPin,
  cilNotes,
  cilTrash,
  cilCheckAlt,
  cilPencil,
} from '@coreui/icons'

const ReceivableOptions = ({ hasNote }) => {
  return (
    <CDropdown alignment="end">
      <CDropdownToggle color="transparent" caret={false} className="p-1">
        <CIcon icon={cilOptions} className="text-high-emphasis ms-2" />
      </CDropdownToggle>
      <CDropdownMenu className="py-2" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilCheckAlt} className="me-2" />
          Marcar pago
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilPencil} className="me-2" />
          {hasNote ? 'Alterar nota' : 'Escrever nota'}
        </CDropdownItem>
        <CDropdownItem href="#" className="">
          <CIcon icon={cilTrash} className="me-2" />
          Eliminar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

ReceivableOptions.propTypes = { hasNote: PropTypes.bool }

export default ReceivableOptions
