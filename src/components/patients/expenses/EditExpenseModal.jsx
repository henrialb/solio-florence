/* eslint-disable prettier/prettier */
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
import { cilNotes, cilPencil, cilTrash } from '@coreui/icons'
import { dateFormat, currencyFormat } from 'src/utils/functions'
import PropTypes from 'prop-types'
import ExpenseOptions from './ExpenseOptions'
import { api } from 'src/Api'
import DeleteExpenseModal from './DeleteExpenseModal'

const EditExpenseModal = ({ expense, setUpdateExpenses }) => {
  const [visible, setVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [expenseDetails, setExpenseDetails] = useState(expense)

  const handleChange = (event) => {
    setExpenseDetails((prevalue) => {
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
    if (expenseDetails.id) {
      api.put(`/patient_expenses/${expenseDetails.id}`, expenseDetails).then((response) => {
        setUpdateExpenses(Date.now())
        setVisible(false)
      })
    }
  }

  return (
    <>
      <CTableRow className="pointer" key={expense.id} onClick={() => setVisible(!visible)}>
        <CTableDataCell className="font-monospace small text-dark">
          {dateFormat(expense.date)}
        </CTableDataCell>
        <CTableDataCell className="fw-semibold">{expense.description}</CTableDataCell>
        <CTableDataCell className="text-end font-monospace">
          {currencyFormat(expense.amount)}
        </CTableDataCell>
        <CTableDataCell className="text-end pe-2 text-secondary">
          {expense.note && (
            <CPopover content={expense.note} trigger="hover">
              <CIcon icon={cilNotes} />
            </CPopover>
          )}
          <ExpenseOptions expense={expense} setUpdateExpenses={setUpdateExpenses} />
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
          <CModalTitle>Despesa</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <CFormLabel htmlFor="inputDescription" className="fw-bold">
                Descri????o
              </CFormLabel>
              <CFormInput
                id="inputDescription"
                name="description"
                onChange={handleChange}
                defaultValue={expenseDetails.description}
                disabled={!editMode}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputAmount" className="fw-bold">
                Valor
              </CFormLabel>
              <CFormInput
                id="inputAmount"
                name="amount"
                className="font-monospace"
                onChange={handleChange}
                defaultValue={currencyFormat(expenseDetails.amount)}
                disabled={!editMode}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputDate" className="fw-bold">
                Data
              </CFormLabel>
              <CFormInput
                type="date"
                id="inputDate"
                name="date"
                onChange={handleChange}
                defaultValue={expenseDetails.date}
                disabled={!editMode}
              />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="inputNote" className="fw-bold">
                Nota
              </CFormLabel>
              <CFormTextarea
                id="inputNote"
                name="note"
                onChange={handleChange}
                defaultValue={expenseDetails.note}
                disabled={!editMode}
              />
            </CCol>
          </CForm>
        </CModalBody>
        {!editMode ? (
          <CModalFooter className="d-flex justify-content-between mt-3">
            <CButton
              color="danger"
              variant="ghost"
              size="sm"
              onClick={() => setOpenDeleteModal(true)}
            >
              <CIcon icon={cilTrash} size="sm" /> &thinsp;Eliminar
            </CButton>
            <CButton
              color="primary"
              variant="ghost"
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              <CIcon icon={cilPencil} size="sm" /> &thinsp;Alterar
            </CButton>
          </CModalFooter>
        ) : (
          <CModalFooter className="d-flex justify-content-end mt-3">
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
          </CModalFooter>
        )}
      </CModal>
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

EditExpenseModal.propTypes = { expense: PropTypes.object }
EditExpenseModal.propTypes = { setUpdateExpenses: PropTypes.func }

export default EditExpenseModal
