import React, { useState, useEffect } from 'react'
import { api } from 'src/Api'
import PropTypes from 'prop-types'
import { CRow, CCol, CCard, CCardBody, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoney } from '@coreui/icons'
import ReceivablesTables from './receivables/ReceivablesTables'

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
                <CButton size="sm" color="primary">
                  <CIcon icon={cilMoney} /> &thinsp;Registar pagamento
                </CButton>
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
