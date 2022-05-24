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
          {process.env.REACT_APP_FLORENCE_VERSION} &ensp;
          <a
            href={`mailto:henrique@solio.pt?&subject=Reportar erro ${process.env.REACT_APP_FLORENCE_VERSION}`}
          >
            Reportar erro ou sugestão
          </a>
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
