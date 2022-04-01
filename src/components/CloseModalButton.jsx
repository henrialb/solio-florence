import React from 'react'
import { CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const CloseModalButton = ({ setVisible, text = 'Fechar' }) => (
  <CButton color="secondary" size="sm" variant="ghost" onClick={() => setVisible(false)}>
    {text}
  </CButton>
)

CloseModalButton.propTypes = { setVisible: PropTypes.func }
CloseModalButton.propTypes = { text: PropTypes.string }

export default CloseModalButton
