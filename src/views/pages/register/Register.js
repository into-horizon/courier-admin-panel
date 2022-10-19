import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormLabel
} from '@coreui/react'
import { loginHandler, deleteMessage } from '../../../store/auth'
import { Link, useNavigate } from 'react-router-dom';
import { usePopup, DialogType } from "react-custom-popup";
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilApplications, cilLocationPin, cilDescription, cilShortText, cilImagePlus } from '@coreui/icons'
import { createStoreHandler } from '../../../store/auth'
import { connect, useSelector, useDispatch } from 'react-redux'
import cookie from 'react-cookies'
import { useTranslation } from 'react-i18next';


const Register = (props) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'register' });
  const dispatch = useDispatch()
  const { showAlert } = usePopup();
  const { user, message, loggedIn } = useSelector((state) => state.login)
  const { createStoreHandler } = props
  const navigate = useNavigate()
  const submitHandler = e => {
    e.preventDefault();
    let obj = {
      store_name: e.target.storeName.value,
      email: e.target.email.value,
      city: e.target.city.value,
      mobile: e.target.mobile.value,
      caption: e.target.caption.value,
      about: e.target.about.value,
    }
    let formData = new FormData();
    console.log("🚀 ~ file: Register.js ~ line 42 ~ Register ~ e.target.formFile.files[0]", e.target.formFile.files[0])
    if (e.target.formFile.files[0]) {
      formData.append('image', e.target.formFile.files[0], e.target.formFile.files[0].name)
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null) {
        return
      } else {
        formData.append(key, value)
      }
    }
    )
    createStoreHandler(formData)
  }

  useEffect(() => {
    if (message) {
      console.log("🚀 ~ file: Register.js ~ line 61 ~ useEffect ~ message", message)
      if (message.includes('not')) {
        showAlert({
          title: t(`notTitle`),
          type: DialogType.WARNING,
          text: t(`notText`)
        });
      } else if (message.includes('exists')) {
        if (message) {
          showAlert({
            title: t(`existsTitle`),
            type: DialogType.WARNING,
            text: t(`existsText`)
          });
        }
      }
      dispatch(deleteMessage())
    }
  }, [message])

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    } else {
      cookie.save(`current_path${sessionStorage.tabID}`, window.location.pathname, { path: '/' })

    }
  }, [])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submitHandler}>
                  <h1>{t('register')}</h1>
                  <p className="text-medium-emphasis">{t('createAccount')}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder={t('storeName')} id="storeName" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder={t('yourEmail')} autoComplete="email" id='email' />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder={"City"}
                      autoComplete="home city"
                      value={t('amman')}
                      readOnly
                      id="city"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilApplications} />
                    </CInputGroupText>
                    <CFormInput
                      type="tel"
                      placeholder={t('mobileNumber')}
                      autoComplete="phone"
                      id="mobile"
                      className={`no${i18n.language}`}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilDescription} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder={t('caption')}
                      id='caption'
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder={t('about')}
                      id='about'
                    />
                  </CInputGroup>
                  <CFormLabel htmlFor="formFile">{t('choosePic')}</CFormLabel>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilImagePlus} />
                    </CInputGroupText>
                    <CFormInput type="file" id="formFile" />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">{t('createBtn')}</CButton>
                  </div>
                </CForm>
                <div style={{ margin: '1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ margin: '0 1rem' }}>

                    {t('alreadyRegistered')}
                  </span>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <strong>

                      {t('login')}
                    </strong>
                  </Link>
                </div>
                  <CRow>
                    <CButton color='link' onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}>{i18n.language === 'en' ? 'عربي' : 'English'}</CButton>

                  </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = { createStoreHandler }
export default connect(mapStateToProps, mapDispatchToProps)(Register)
