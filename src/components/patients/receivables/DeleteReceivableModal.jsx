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

const DeleteReceivableModal = ({ receivableId, setUpdateReceivables }) => {
  const [visible, setVisible] = useState(false)

  const handleSubmit = (id) => {
    api.delete(`/patient_receivables/${id}`).then(() => {
      setUpdateReceivables(id)
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
          <CModalTitle>Eliminar conta</CModalTitle>
        </CModalHeader>
        <CModalBody>Confirma?</CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-3">
          <CloseModalButton setVisible={setVisible} text="Cancelar" />
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
