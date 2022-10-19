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
import { provideReferenceHandler, deleteMessage } from '../../../store/auth'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Reference = ({provideReferenceHandler}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message } = useSelector((state) => state.login)
    const [msg, setMsg] = useState('')
    const submitHandler = e => {
        e.preventDefault();
        provideReferenceHandler(e.target.reference.value)
        e.target.reset()
    }

   

    useEffect(() => {
        if (message?.includes('successfully')) {
           setMsg('reset password link has been sent to your email')
        } else if (message?.includes('account')){
            setMsg(`${message}, please check again`)
            
        } 
        dispatch(deleteMessage())
    }, [message])

    
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={submitHandler}>
                                    <h1>Reset Password</h1>
                                    <p className="text-medium-emphasis">Reset Your Password</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="insert your email or mobile number" id="reference" required />
                                        {/* <CButton onClick={sendCode}>Resend code</CButton> */}
                                    </CInputGroup>
                                    {msg && <p style={{weight: 'bold'}}>{msg}</p>}
                                    <div className="d-grid">
                                        <CButton type="submit" color="info">Reset Password</CButton>
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

const mapDispatchToProps = { provideReferenceHandler}
export default connect(mapStateToProps, mapDispatchToProps)(Reference)
