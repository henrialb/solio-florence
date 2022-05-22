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
import { Navigate } from 'react-router-dom'
import { deleteAuthToken } from 'src/utils/auth'

const DeleteReceivableModal = ({ receivableId, setUpdateReceivables }) => {
  const [error, setError] = useState(null) // TODO: handle errors
  const [visible, setVisible] = useState(false)

  const handleSubmit = (id) => {
    api
      .delete(`/patient_receivables/${id}`)
      .then(() => {
        setUpdateReceivables(id)
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
          <CModalTitle>Eliminar conta</CModalTitle>
        </CModalHeader>
        <CModalBody>Confirma?</CModalBody>
        <CModalFooter className="d-flex justify-content-end mt-3">
          <CButton color="secondary" size="sm" variant="ghost" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton
            color="danger"
            className="text-white"
            size="sm"
            onClick={() => handleSubmit(receivableId)}
          >
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

DeleteReceivableModal.propTypes = { receivableId: PropTypes.number }
DeleteReceivableModal.propTypes = { setUpdateReceivables: PropTypes.func }

export default DeleteReceivableModal
