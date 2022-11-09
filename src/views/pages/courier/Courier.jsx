import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow, CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableBody,
    CTableDataCell,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CSpinner,
    CTooltip ,
    CModal
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { addCourierHandler, getCouriersHandler, removeCourier } from '../../../store/courier'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { cilUserX } from '@coreui/icons'
import Paginator from '../../../components/Paginator'

const Courier = ({ addCourierHandler, getCouriersHandler, removeCourier }) => {
    const { msg, couriers, count } = useSelector(state => state.couriers)
    const { user: { company_name } } = useSelector(state => state.login)
    const [message, setMessage] = useState('')
    const [progressLoading, setProgressLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [params, setParams] = useState({ limit: 10, offset: 10 })
    const [modal, setModal] = useState({ visible: false, id: '' })
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'courier' })
    const { t: g } = useTranslation('translation', { keyPrefix: 'globals' })
    const submitHandler = e => {
        setProgressLoading(true)
        e.preventDefault()
        addCourierHandler({ email: e.target.email.value, companyName: company_name }).then(() => setProgressLoading(false))
        e.target.reset()
    }
    useEffect(() => {
        setMessage(messageHandler(msg))
    }, [msg])

    useEffect(() => {
        Promise.all([getCouriersHandler()]).then(() => setLoading(false))
    }, [])
    const messageHandler = msg => {
        if (typeof msg === 'string') {
            if (msg?.includes('duplicate')) {
                return t('duplicate')
            } else if (msg?.includes('no account')) return t('noAccount')
            else if (msg?.includes('successfully')) return t('successSend')
            else return msg

        }
    }
    const onHide = () => setModal({ visible: false, id: '' })

    const removeHandler = () => {
        setLoading(true)
        Promise.all([removeCourier(modal.id)]).then(() => setLoading(false))
        onHide()
    }
    return (
        <>
            <CModal alignment="center" visible={modal.visible} onClose={onHide} >
                <CModalHeader>
                    <CModalTitle>
                        remove courier
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure you want to remove courier?
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={onHide}>{g('close')}</CButton>
                    <CButton onClick={removeHandler} >{g('confirm')}</CButton>
                </CModalFooter>
            </CModal>
            <CRow xs={{ gutter: 5 }} className='justify-content-center'>
                <CCol xs={12}>
                    <CForm onSubmit={submitHandler}>
                        <CRow className="justify-content-center" xs={{ gutterY: 3 }}>
                            <CCol xs={3}>
                                {/* <CFormLabel>insert the email of the driver to add </CFormLabel> */}
                                <CFormInput placeholder={t('insertEmail')} id='email' required />
                            </CCol>
                            <CCol xs={4}>

                                <CButton type="submit" disabled={progressLoading}>{progressLoading ? <CSpinner size="sm" variant="grow" /> : t('sendInvitation')}</CButton>
                            </CCol>
                            <CCol xs={8}>

                                <strong>{message}</strong>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCol>
                <CCol xs={8}>
                    <CRow className="justify-content-center">
                        <CCol xs={12}>
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>
                                            name
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            invitation status
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            Action
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {!loading && React.Children.toArray(couriers.map(courier =>
                                        <CTableRow>
                                            <CTableDataCell data-html={true} data-place='top' data-tip="hello world">
                                                {courier.courier_name}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {courier.status}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CTooltip content='remove courier' >
                                                <CButton color="secondary" data-tip='remove courier' onClick={() => setModal({ visible: true, id: courier.id })}>
                                                    <CIcon icon={cilUserX} />
                                                </CButton>

                                                </CTooltip>
                                            </CTableDataCell>
                                        </CTableRow>

                                    ))

                                    }
                                </CTableBody>
                            </CTable>
                            {loading && <CSpinner color="primary" />}
                            <Paginator params={params} count={count} cookieName='courier' changeData={getCouriersHandler} />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
         

        </>

    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { addCourierHandler, getCouriersHandler, removeCourier }

export default connect(mapStateToProps, mapDispatchToProps)(Courier)