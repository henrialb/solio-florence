import PropTypes from 'prop-types'
import React from 'react'
import { CCallout, CLink } from '@coreui/react'

import packageJson from '../../package.json'

const DocsCallout = (props) => {
  const { content, href, name } = props

  const plural = name.slice(-1) === 's' ? true : false

  const _href = `https://coreui.io/react/docs/${packageJson.config.coreui_library_short_version}/${href}`

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

DocsCallout.propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string,
}

export default React.memo(DocsCallout)
