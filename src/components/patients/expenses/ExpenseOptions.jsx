import React from 'react'
import PropTypes from 'prop-types'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilTrash, cilPencil } from '@coreui/icons'

const ExpenseOptions = () => {
  return (
    <CDropdown alignment="end">
      <CDropdownToggle color="transparent" caret={false} className="p-0">
        <CIcon icon={cilOptions} className="ms-3" />
      </CDropdownToggle>
      <CDropdownMenu className="py-2" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilPencil} className="me-2" />
          Alterar despesa
        </CDropdownItem>
        <CDropdownItem href="#" className="">
          <CIcon icon={cilTrash} className="me-2" />
          Eliminar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

ExpenseOptions.propTypes = { hasNote: PropTypes.bool }

export default ExpenseOptions
