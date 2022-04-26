import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilBell } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, AddDropdownMenu } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="d-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-sm-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink} className="fs-14">
              Início
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/utentes" component={NavLink} className="fs-14">
              Utentes
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/despesas" component={NavLink} className="fs-14">
              Despesas
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3 align-items-center">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} />
            </CNavLink>
          </CNavItem>
          <AddDropdownMenu />
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
        {/* TODO: use button here? */}
        {/* <CButton size="sm" variant="outline" color="danger" className="fw-normal">
          &thinsp;Emergência
        </CButton> */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
