/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { readAuthToken, saveAuthToken } from 'src/utils/auth'
import { config } from 'src/constants'

const Login = () => {
  const [loginDetails, setLoginDetails] = useState([])
  const navigate = useNavigate()

  const handleChange = (event) => {
    setLoginDetails((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleKeypress = e => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    axios.create({ baseURL: config.url.API_URL })
    .post('users/sign_in', { user: loginDetails })
    .then((response) => {
      saveAuthToken(response.headers['authorization'])
      window.location.pathname = '/utentes'
      // navigate('/utentes') // TODO: change to /inicio
    })
  }

  if (readAuthToken()) {
    return <Navigate to="/inicio" />
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Florence</h1>
                    <p className="text-medium-emphasis">
                      Entre na sua conta com os dados de acesso
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Nome de utilizador"
                        autoComplete="username"
                        onChange={handleChange}
                        onKeyDown={handleKeypress}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Palavra-passe"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onKeyDown={handleKeypress}
                      />
                    </CInputGroup>
                    <CRow className="justify-content-end">
                      <CCol xs={6} className="d-flex justify-content-end">
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Entrar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="d-flex align-items-center text-center">
                  <div>
                    <h2>Precisa de ajuda?</h2>
                    <p>
                      Se não se sabe os seus dados de acesso ou não consegue entrar na sua conta,
                      por favor contacte a gestão através do Slack.
                    </p>
                    {/* <Link to="/register">
                      <CButton color="light" className="mt-3" variant="outline">
                        Abrir Slack
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
