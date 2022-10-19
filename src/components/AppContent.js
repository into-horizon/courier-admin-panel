import React, { useEffect,Suspense } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import cookie from 'react-cookies'
// routes config
import routes from '../routes'
import { useTranslation } from 'react-i18next';
import {useSelector} from 'react-redux'

const AppContent = () => {
  const {status} = useSelector((state) => state.login.user)
const navigate = useNavigate()
const { t } = useTranslation('translation', { keyPrefix: 'routes' });
t('addProduct')
useEffect(()=>{
    let currentPath = cookie.load(`current_path${sessionStorage.tabID}`)
    navigate(currentPath)
    if(window.location.pathname === '/'){
      navigate('/dashboard')

    }
  
},[])
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            const Item = route.component
            const name = t(route.name) || route.name
            return (
              route.component && (route.approved? route.approved && status ==='approved': true) && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={ <Item/> }
                />
              )
            )
          })}
        </Routes>
          {/* <Navigate from="/" to="/dashboard" /> */}
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
