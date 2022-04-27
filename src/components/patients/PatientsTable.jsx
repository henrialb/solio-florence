import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { age } from 'src/utils/functions'

import avatar from 'src/assets/images/avatars/avatar.png'

const PatientsTable = ({ patients }) => {
  const navigate = useNavigate()

  const handleRowClick = (patient) => {
    navigate(`/utentes/${patient}`)
  }

  return (
    <CCol lg={6}>
      <CTable align="middle" className="mb-2 border bg-white" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Utente</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Idade</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SCML</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {patients.map((patient, index) => (
            <CTableRow className="pointer" key={index} onClick={() => handleRowClick(patient.id)}>
              <CTableDataCell className="text-center">
                <CAvatar size="md" src={patient.profilePhoto ? patient.profilePhoto : avatar} />
              </CTableDataCell>
              <CTableDataCell className="fw-semibold">{patient.name}</CTableDataCell>
              <CTableDataCell className="text-center">{age(patient.dob)}</CTableDataCell>
              <CTableDataCell className="text-center">
                <CBadge color="light" className="text-secondary">
                  {patient.covenant !== 'personal' && patient.covenant.toUpperCase()}
                </CBadge>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCol>
  )
}

PatientsTable.propTypes = { patients: PropTypes.array }

export default PatientsTable
