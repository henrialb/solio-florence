import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { api } from 'src/Api'

const DeleteExpenseModal = ({ expenseId, setUpdateExpenses }) => {
  const [visible, setVisible] = useState(false)

  const handleSubmit = (id) => {
    api.delete(`/patient_expenses/${id}`).then(() => {
      setUpdateExpenses(id + 200)
      // setVisible(false) TODO: Unmounted component? The modal closes anyway because of a bug with the Dropdown auto close
    })
  }

  return (
    <>
      <CDropdownItem onClick={() => setVisible(true)}>
        <CIcon icon={cilTrash} className="me-2" />
        Eliminar
      </CDropdownItem>
      <CModal alignment="center" size="sm" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Eliminar despesa</CModalTitle>
        </CModalHeader>
        <CModalBody>Confirma?</CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-3">
          <CButton color="secondary" size="sm" variant="outline" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton
            color="danger"
            className="text-white"
            size="sm"
            onClick={() => handleSubmit(expenseId)}
          >
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

DeleteExpenseModal.propTypes = { expenseId: PropTypes.number }
DeleteExpenseModal.propTypes = { setUpdateExpenses: PropTypes.func }

export default DeleteExpenseModal
