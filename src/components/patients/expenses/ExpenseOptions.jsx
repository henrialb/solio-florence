import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilTrash, cilPencil } from '@coreui/icons'
import DeleteExpenseModal from './DeleteExpenseModal'

const ExpenseOptions = ({ expense, setUpdateExpenses }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  return (
    <>
      <CDropdown alignment="end" onClick={(e) => e.stopPropagation()}>
        <CDropdownToggle color="transparent" caret={false} className="p-0">
          <CIcon icon={cilOptions} className="ms-3" />
        </CDropdownToggle>
        <CDropdownMenu className="py-2" placement="bottom-end">
          <CDropdownItem href="#">
            <CIcon icon={cilPencil} className="me-2" />
            Alterar despesa
          </CDropdownItem>
          <CDropdownItem onClick={() => setOpenDeleteModal(true)}>
            <CIcon icon={cilTrash} className="me-2" />
            Eliminar
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      {openDeleteModal && (
        <DeleteExpenseModal
          expense={expense}
          setUpdateExpenses={setUpdateExpenses}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </>
  )
}

ExpenseOptions.propTypes = { expense: PropTypes.object }
ExpenseOptions.propTypes = { setUpdateExpenses: PropTypes.func }

export default ExpenseOptions
