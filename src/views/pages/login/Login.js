import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { If, Then, Else } from 'react-if'
import { loginHandler, deleteMessage } from '../../../store/auth'
import { connect, useDispatch } from 'react-redux'
import { usePopup, DialogType } from "react-custom-popup";
import cookie from 'react-cookies'
import { useTranslation } from 'react-i18next';

const Login = (props) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'login' });
  const dispatch = useDispatch()
  const [load, setLoad] = useState(true)
  const { login, loginHandler } = props
  const { showAlert } = usePopup();
  const navigate = useNavigate()
  const submitHandler = (e) => {
    setLoad(true)
    e.preventDefault()
    loginHandler({ email: e.target.email.value, password: e.target.password.value })
  }
  let currentPath = cookie.load(`current_path${sessionStorage.tabID}`)
  useEffect(() => {
    if (login.loggedIn) {
      navigate(currentPath === '/login' ? '/' : currentPath)
    }
    setLoad(false)
  }, [])
  useEffect(() => {
    if (login.loggedIn) {
      navigate(currentPath === '/login' ? '/' : currentPath)
    }
  }, [login.loggedIn])
  useEffect(() => {
    if (login.message) {
      if (login.message.includes('password')) {
        showAlert({
          title: "incorrect credentials",
          type: DialogType.WARNING,
          text: login.message
        });
        setLoad(false)
      } else if (login.message.includes('unauthorized')) {
        if (login.message) {
          showAlert({
            title: "unauthorized",
            type: DialogType.WARNING,
            text: login.message
          });
          setLoad(false)
        }
      } else if (login.message.includes('verified')) {
        showAlert({
          title: "Verified",
          type: DialogType.INFO,
          text: `${login.message}, please login now`
        });
        setLoad(false)
      }
      dispatch(deleteMessage())
    }
  }, [login.message])
  useEffect(() => {
    cookie.save(`current_path${sessionStorage.tabID}`, window.location.pathname, { path: '/' })
  }, [])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <h1>{t('login')}</h1>
                    <p className="text-medium-emphasis">{t('signin')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder={t('email')} autoComplete="email" name="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder={t('password')}
                        autoComplete="current-password"
                        name="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit"> 
                              {load? <CSpinner color="light" size="sm"/>: t('login')}
                            </CButton>
                        {/* <If condition={load}>
                          <Then>
                            <CSpinner color="primary" />
                          </Then>
                          <Else>

                          </Else>
                        </If> */}
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={() =>navigate('/reference')}> 
                          {t('forgotPassword')}
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                        <CButton color='link' onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}>{i18n.language === 'en' ? 'عربي' : 'English'}</CButton>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>{t('signup')}</h2>
                    <p>
                      {t('registerText')}
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        {t('registerNow')}
                      </CButton>
                    </Link>
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

const mapStateToProps = (state) => ({
  login: state.login

});
const mapDispatchToProps = { loginHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Login)
