import React from 'react'
import PropTypes from 'prop-types'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilCheckAlt, cilPencil } from '@coreui/icons'
import DeleteReceivableModal from './DeleteReceivableModal'

const ReceivableOptions = ({ receivableId, hasNote, setUpdateReceivables }) => {
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
        <DeleteReceivableModal
          receivableId={receivableId}
          setUpdateReceivables={setUpdateReceivables}
        />
      </CDropdownMenu>
    </CDropdown>
  )
}

ReceivableOptions.propTypes = { receivableId: PropTypes.number }
ReceivableOptions.propTypes = { hasNote: PropTypes.bool }
ReceivableOptions.propTypes = { setUpdateReceivables: PropTypes.func }

export default ReceivableOptions
