import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <strong>Florence</strong>
        <span className="ms-1">&copy; Sólio Lar Lda.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Reportar erro ou sugestão</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
