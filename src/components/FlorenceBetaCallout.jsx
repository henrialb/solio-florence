import PropTypes from 'prop-types'
import React from 'react'
import { CCallout } from '@coreui/react'

const FlorenceBetaCallout = () => {
  return (
    <CCallout color="info" className="bg-white">
      Esta é uma versão de teste da aplicação, que continua em desenvolvimento. Quaisquer erros ou
      sugestões devem ser reportados ao Henrique.
      <br />
      <small>
        <strong>Florence v0.1.0 (Beta)</strong>
      </small>
    </CCallout>
  )
}

export default React.memo(FlorenceBetaCallout)
