import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CAlert,
  CBadge,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { api } from 'src/Api'
import { Navigate } from 'react-router-dom'
import { deleteAuthToken } from 'src/utils/auth'
import { currencyFormat } from 'src/utils/functions'

const DeleteExpenseModal = ({
  expense,
  setUpdateExpenses,
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const [error, setError] = useState(null) // TODO: handle errors
  // const [visible, setVisible] = useState(false)

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
      <CModal
        alignment="center"
        size="sm"
        visible={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <CModalHeader>
          <CModalTitle>Eliminar despesa</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column justify-content-center align-items-center">
          <CCol>
            <b>{expense.description}</b>
            &emsp;
            <CBadge color="light" className="text-dark">
              {currencyFormat(expense.amount)}€
            </CBadge>
          </CCol>
          <CIcon icon={cilTrash} size="4xl" className="text-light mt-4 mb-2" />
        </CModalBody>
        <CModalFooter className="d-flex justify-content-end">
          <CButton
            color="secondary"
            size="sm"
            variant="ghost"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancelar
          </CButton>
          <CButton
            color="danger"
            className="text-white"
            size="sm"
            onClick={() => handleSubmit(expense.id)}
          >
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

DeleteExpenseModal.propTypes = { expense: PropTypes.object }
DeleteExpenseModal.propTypes = { setUpdateExpenses: PropTypes.func }
DeleteExpenseModal.propTypes = { openDeleteModal: PropTypes.bool }
DeleteExpenseModal.propTypes = { setOpenDeleteModal: PropTypes.func }

export default DeleteExpenseModal
