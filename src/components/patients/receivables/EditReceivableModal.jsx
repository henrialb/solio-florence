import React, { useState } from 'react'
import {
  CTableRow,
  CTableDataCell,
  CPopover,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilPencil } from '@coreui/icons'
import { currencyFormat } from 'src/functions'
import PropTypes from 'prop-types'
import { api } from 'src/Api'
import ReceivableOptions from './ReceivableOptions'
import AddPaymentModal from '../payments/AddPaymentModal'

const EditReceivableModal = ({ receivable, table, setUpdateReceivables, patientScml }) => {
  const [visible, setVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [receivableDetails, setReceivableDetails] = useState(receivable)
  const disableAmountChange = () => (receivable.source === 'expenses' ? true : false)

  const handleChange = (event) => {
    setReceivableDetails((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]:
          event.target.name !== 'amount'
            ? event.target.value
            : event.target.value.replace(/,/g, '.'),
      }
    })
  }

  const handleSubmit = () => {
    if (receivableDetails.id) {
      api.put(`/patient_receivables/${receivableDetails.id}`, receivableDetails).then(() => {
        setUpdateReceivables(Date.now())
        setVisible(false)
      })
    }
  }

  return (
    <>
      <CTableRow key={receivable.id} onClick={() => setVisible(!visible)}>
        <CTableDataCell onClick={(e) => e.stopPropagation()}>
          <AddPaymentModal
            modalTriggerIsButton={false}
            amount={receivable.amount}
            setUpdateReceivables={setUpdateReceivables}
            receivablePaid={receivable.status === 'paid'}
          />
        </CTableDataCell>
        <CTableDataCell className="fw-semibold pointer">{receivable.description}</CTableDataCell>
        <CTableDataCell className="text-end font-monospace pointer">
          {currencyFormat(receivable.amount, table === 'Mensalidades' ? 0 : 2)}
        </CTableDataCell>
        <CTableDataCell className="text-end text-secondary" onClick={(e) => e.stopPropagation()}>
          {receivable.note && (
            <CPopover content={receivable.note} trigger="hover">
              <CIcon icon={cilNotes} />
            </CPopover>
          )}
          <ReceivableOptions
            receivableId={receivable.id}
            hasNote={typeof receivable.note !== 'undefined'}
            setUpdateReceivables={setUpdateReceivables}
            setVisible={setVisible}
          />
        </CTableDataCell>
      </CTableRow>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setEditMode(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Conta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol xs={8} s={9}>
              <CFormLabel htmlFor="inputDescription" className="fw-bold">
                Descrição
              </CFormLabel>
              <CFormInput
                id="inputDescription"
                name="description"
                defaultValue={receivable.description}
                onChange={handleChange}
                disabled={!editMode}
              />
            </CCol>
            <CCol xs={4} s={3}>
              <CFormLabel htmlFor="inputAmount" className="fw-bold text-end">
                Valor
              </CFormLabel>
              <CFormInput
                id="inputAmount"
                name="amount"
                defaultValue={currencyFormat(receivable.amount) + ' €'}
                className="text-end font-monospace"
                disabled={disableAmountChange() || !editMode}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea
                id="inputNote"
                name="note"
                defaultValue={receivable.note}
                onChange={handleChange}
                disabled={!editMode}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between mt-3">
          {!editMode ? (
            <>
              <CButton
                color="secondary"
                size="sm"
                variant="ghost"
                onClick={() => setVisible(false)}
              >
                Fechar
              </CButton>
              <CButton
                color="primary"
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                <CIcon icon={cilPencil} size="sm" /> &thinsp;Alterar
              </CButton>
            </>
          ) : (
            <>
              <CButton
                color="secondary"
                size="sm"
                variant="ghost"
                onClick={() => setEditMode(!editMode)}
              >
                Cancelar
              </CButton>
              <CButton color="primary" size="sm" onClick={handleSubmit}>
                Guardar
              </CButton>
            </>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

EditReceivableModal.propTypes = { receivable: PropTypes.object }
EditReceivableModal.propTypes = { table: PropTypes.string }
EditReceivableModal.propTypes = { setUpdateReceivables: PropTypes.func }
EditReceivableModal.propTypes = { patientScml: PropTypes.bool }

export default EditReceivableModal
