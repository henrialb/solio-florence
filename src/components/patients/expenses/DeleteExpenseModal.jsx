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
import CloseModalButton from 'src/components/CloseModalButton'
import { Navigate } from 'react-router-dom'
import { deleteAuthToken } from 'src/utils/auth'

const DeleteExpenseModal = ({ expenseId, setUpdateExpenses }) => {
  const [error, setError] = useState(null) // TODO: handle errors
  const [visible, setVisible] = useState(false)

  const handleSubmit = (id) => {
    api
      .delete(`/patient_expenses/${id}`)
      .then(() => {
        setUpdateExpenses(Date.now())
        // setVisible(false) TODO: Unmounted component? The modal closes anyway because of a bug with the Dropdown auto close
      })
      .catch((error) => {
        setError(error)
      })
  }

  if (error && error.message === 'Request failed with status code 500') {
    deleteAuthToken()
    return <Navigate to="/entrar" />
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
          <CloseModalButton setVisible={setVisible} text="Cancelar" />
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
