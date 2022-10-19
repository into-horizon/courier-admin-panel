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
    CFormLabel,
    CSpinner
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilApplications, cilLocationPin, cilDescription, cilShortText, cilImagePlus } from '@coreui/icons'
import { validateTokenHandler, deleteMessage,resetPasswordHandler } from '../../../store/auth'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cookie from 'react-cookies'


const ResetPassword = ({ validateTokenHandler, load,resetPasswordHandler }) => {
    const token = useParams().token
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message, loggedIn } = useSelector((state) => state.login)
    const [msg, setMsg] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [validToken, setValidToken] = useState(false)

    const submitHandler = e => {
        e.preventDefault();
        if (e.target.password.value !== e.target.rPassword.value) {

            setMsg('passwords don`t match, please check again')
            return
        }

        resetPasswordHandler(token,e.target.password.value)
        e.target.reset()
    }

    const messageHandler = e => {
        if (password === e.target.value) {
            setMsg('')
        } else {
            setMsg('password does not match')
        }
    }

    useEffect(() => {
        if (message === 'valid') {
            setMsg('')
            setValidToken(true)
        } 
        else if (message?.title){
            setMsg(message)
        }else if (message?.includes('invalid')) {
            setMsg(`expired has link`)
        }  else if (message?.includes('expired')){
            setMsg(message)
        }
        else if (message?.includes('reset')){
            setMsg(message)
        }
        dispatch(deleteMessage())
        setLoading(false)
    }, [message])

    useEffect(() => {
        load(true)
        if (loggedIn) {
            cookie.save(`current_path${sessionStorage.tabID}`, '/')
            navigate('/')
        }
        load(false)

        validateTokenHandler(token)
    }, [])

    const ErrorHandler = ({ title, details }) => {
        return (
            <React.Fragment>
                <h5>{title}</h5>
                <ol>
                    {details.map((value,idx) => <li key={`li${idx}`}>{value}</li>)}
                </ol>
            </React.Fragment>
        )
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            {loggedIn ? <CSpinner color="primary" /> :
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={9} lg={7} xl={6}>
                            {loading ? <CSpinner color="primary" /> : <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm onSubmit={submitHandler}>
                                        <h1>{ !validToken  ? msg : 'Reset Password'}</h1>
                                        {validToken && <>

                                            <p className="text-medium-emphasis">Reset Your Password</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" required />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput placeholder="Repeat your password" id="rPassword" type="password" required onChange={messageHandler} />
                                                {/* <CButton onClick={sendCode}>Resend code</CButton> */}
                                            </CInputGroup>
                                            {msg && msg.title ? <ErrorHandler title={msg.title} details={msg.details} /> :  <p style={{ fontWeight: 'bold' }}>{msg}</p>}
                                            <div className="d-grid">
                                                <CButton type="submit" color="info">Reset Password</CButton>
                                            </div></>}
                                    </CForm>
                                    <div className="d-grid">
                                        <CButton color="link" onClick={() => navigate('/login')}>Login</CButton>
                                    </div>
                                </CCardBody>
                            </CCard>}
                        </CCol>
                    </CRow>
                </CContainer>}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = { validateTokenHandler,resetPasswordHandler }
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
