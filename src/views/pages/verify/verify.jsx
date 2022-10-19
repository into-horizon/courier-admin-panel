import React, { useState, useEffect } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilApplications, cilLocationPin, cilDescription, cilShortText, cilImagePlus } from '@coreui/icons'
import { verifiedEmailHandler, updateVerficationCodeHandler, deleteMessage } from '../../../store/auth'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Verify = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, message, loggedIn } = useSelector((state) => state.login)
    const { verifiedEmailHandler, updateVerficationCodeHandler } = props
    const submitHandler = e => {
        e.preventDefault();
        let obj = {
            code: e.target.code.value,
            id: user.id
        }

        verifiedEmailHandler(obj)

    }

    const sendCode = () => {
        updateVerficationCodeHandler({ id: user.id })
    }

    useEffect(() => {
        if (user.verified_email && !loggedIn) {
            navigate('/login')
        }
    }, [user.verified_email])

    useEffect(() => {
        if (loggedIn) {
            updateVerficationCodeHandler({ id: user.id })

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
                                    <h1>Email Verification</h1>
                                    <p className="text-medium-emphasis">Verify Your Account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="insert your code" id="code" required />
                                        <CButton onClick={sendCode}>Resend code</CButton>
                                    </CInputGroup>
                                    {message && <p>{message.response || message}</p>}
                                    <div className="d-grid">
                                        <CButton type="submit" color="info">Verify Account</CButton>
                                    </div>
                                </CForm>
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

const mapDispatchToProps = { verifiedEmailHandler, updateVerficationCodeHandler }
export default connect(mapStateToProps, mapDispatchToProps)(Verify)
