import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'
import ReceivablesTables from './receivables/ReceivablesTables'
import AddPaymentModal from './payments/AddPaymentModal'

const PatientReceivables = ({ patientId, patientScml }) => {
  const [receivables, setReceivables] = useState([])
  const [error, setError] = useState(null) // TODO: handle errors
  const [updateReceivables, setUpdateReceivables] = useState(0)

  useEffect(() => {
    if (patientId || updateReceivables) {
      api
        .get(`/patient_receivables/patient/${patientId}`)
        .then((response) => {
          setReceivables(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [patientId, updateReceivables])

  return (
    <>
      <CRow>
        <CCard>
          <CCardBody>
            <CRow className="mb-2">
              <CCol sm="auto" className="ms-auto">
                <AddPaymentModal
                  modalTriggerIsButton={true}
                  setUpdateReceivables={setUpdateReceivables}
                  patientScml={patientScml}
                />
              </CCol>
            </CRow>
            <ReceivablesTables
              setUpdateReceivables={setUpdateReceivables}
              receivables={receivables}
              patientScml={patientScml}
            />
          </CCardBody>
        </CCard>
      </CRow>
    </>
  )
}

PatientReceivables.propTypes = { patientId: PropTypes.number }
PatientReceivables.propTypes = { patientScml: PropTypes.bool }

export default PatientReceivables
