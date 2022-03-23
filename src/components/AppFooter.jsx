import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <strong>
          <small>Florence</small>
        </strong>
        <span className="ms-1 small">&copy; Sólio Lar Lda.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1 small">
          <a href="mailto:someone@companyname.com?&subject=Reportar erro (v0.1.0)">
            Reportar erro ou sugestão
          </a>
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
