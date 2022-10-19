import React, { useState, useEffect, Children } from 'react'
import { connect, useSelector } from 'react-redux'
import {
    CWidgetStatsF, CRow, CCol, CSpinner, CAccordionHeader, CAccordionItem, CAccordion, CAccordionBody, CForm, CFormInput, CFormSelect, CButton, CFormLabel, CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,


} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilChartPie, cilLockLocked, cilHistory, cilCheck, cilWallet, cilPlus, cilCloudDownload, cilPaperclip } from '@coreui/icons';
import { getPendingAmounts } from '../store/finance'
import { getCashAccount, getAccountsHandler } from 'src/store/bankAccount';
import { getWithdrawalsHandler, addWithdrawalHandler } from 'src/store/withdrawal'
import Paginator from './Paginator';
import AccountModal from './AccountModal';

export const Summary = ({ getPendingAmounts, getCashAccount, getAccountsHandler, getWithdrawalsHandler, addWithdrawalHandler }) => {
    const { pending, released, refunded, withdrawn, canceledWithdrawn } = useSelector(state => state.finance)
    const { account, cashAccount } = useSelector(state => state.bankAccount)
    const { withdrawals: { data: withdrawals, count }, msg } = useSelector(state => state.withdrawals)
    const [params, setParams] = useState({ limit: 10, offset: 10 })
    const [loading, setLoading] = useState(true)
    const [releasedFinal, setReleasedFinal] = useState(0)
    const [active, setActive] = useState(0)
    const [add, setAdd] = useState(false)
    const [progressLoading,setProgressLoading] = useState(false)
    useEffect(() => {
        Promise.all([getPendingAmounts(), getCashAccount(), getAccountsHandler(), getWithdrawalsHandler()]).then(() => setLoading(false))
    }, [])

    useEffect(() => {
        setReleasedFinal((released - withdrawn + canceledWithdrawn).toFixed(2))
        console.log("🚀 ~ file: Summary.jsx ~ line 36 ~ useEffect ~ released", released)

    }, [released, withdrawn, canceledWithdrawn])

    const submitHandler = (e) => {
        e.preventDefault()
        setProgressLoading(true)
        let obj = { account_id: e.target.account.value, amount: e.target.amount.value }
        Promise.all([addWithdrawalHandler(obj)]).then(() => {
            e.target.reset()
            setProgressLoading(false)
        })

    }
    useEffect(() => {
        setActive(!withdrawals.find(w => w.status === 'requested'))
    }, [withdrawals])

    return (
        loading ? <CSpinner /> :
            <>
                <AccountModal account={{}} add={add} onClose={() => setAdd(false)} />
                <CRow>
                    <CCol lg={4} md={4} xs={12} sm={4}>
                        <CWidgetStatsF
                            className="mb-3"
                            color="warning"
                            icon={<CIcon icon={cilLockLocked} height={24} />}
                            padding={false}
                            title="pending"
                            value={pending} />


                    </CCol>
                    <CCol lg={4} md={4} xs={12} sm={4}>
                        <CWidgetStatsF
                            className="mb-3"
                            color="success"
                            icon={<CIcon icon={cilCheck} height={24} />}
                            padding={false}
                            title="released"
                            value={releasedFinal} />


                    </CCol>
                    <CCol lg={4} md={4} xs={12} sm={4}>
                        <CWidgetStatsF
                            className="mb-3"
                            color="danger"
                            icon={<CIcon icon={cilHistory} height={24} />}
                            padding={false}
                            title="refunded"
                            value={refunded} />


                    </CCol>
                </CRow>
                <CRow className="justify-content-md-center">
                    <CCol xs={12}>
                        {progressLoading ?
                            <CSpinner color="primary"/> :
                            active && releasedFinal > 0 && <CAccordion activeItemKey={0} >
                                <CAccordionItem itemKey={1}>
                                    <CAccordionHeader>
                                        <CRow>
                                            <CCol xs='auto'>
                                                <CIcon icon={cilWallet} size='lg' />

                                            </CCol>
                                            <CCol>
                                                <strong>you have {releasedFinal} withdrawal amount</strong>

                                            </CCol>
                                        </CRow>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <CForm onSubmit={submitHandler}>
                                            <CRow className="justify-content-md-center align-items-end ">
                                                <CCol xs={3}>
                                                    <CFormLabel>requested amount</CFormLabel>
                                                    <CFormInput type="number" step="any" max={releasedFinal} defaultValue={releasedFinal} id="amount" />
                                                </CCol>
                                                <CCol xs={3}>
                                                    <CFormLabel>Transfer To</CFormLabel>
                                                    <CFormSelect id='account'>

                                                        <option value={cashAccount.id}>{cashAccount.title}</option>
                                                        {account.id && <option value={account.id}>{account.title}</option>}

                                                    </CFormSelect>

                                                </CCol>
                                                {!account.id && <CCol xs='auto'>
                                                    <CButton color='secondary' title='add account' onClick={() => setAdd(true)} type='button'>
                                                        <CIcon icon={cilPlus} size='lg' />
                                                    </CButton>
                                                </CCol>}
                                                <CCol xs='auto'>
                                                    <CButton type='submit' >submit</CButton>
                                                </CCol>

                                            </CRow>
                                        </CForm>
                                    </CAccordionBody>
                                </CAccordionItem>

                            </CAccordion>}
                    </CCol>
                </CRow>
                <CRow className="justify-content-md-center mgn-top50">
                    <CCol xs={8}>
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>transfer to</CTableHeaderCell>
                                    <CTableHeaderCell>amount</CTableHeaderCell>
                                    <CTableHeaderCell>status</CTableHeaderCell>
                                    <CTableHeaderCell>created date</CTableHeaderCell>
                                    <CTableHeaderCell>updated date</CTableHeaderCell>
                                    <CTableHeaderCell>attachment</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {Children.toArray(withdrawals.map(withdrawal =>
                                    <CTableRow>
                                        <CTableDataCell>{withdrawal.title}</CTableDataCell>
                                        <CTableDataCell>{withdrawal.amount}</CTableDataCell>
                                        <CTableDataCell>{withdrawal.status}</CTableDataCell>
                                        <CTableDataCell>{new Date(withdrawal.created_at).toLocaleDateString()}</CTableDataCell>
                                        <CTableDataCell>{withdrawal.updated ? new Date(withdrawal.updated).toLocaleDateString() : '-'}</CTableDataCell>
                                        <CTableDataCell >
                                            {withdrawal.document ? <a href={withdrawal.document} target="_blank">

                                                <CIcon icon={cilPaperclip} />
                                            </a> : '-'}
                                           
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                        <Paginator params={params} count={count} changeData={getWithdrawalsHandler} cookieName='withdrawal' />
                    </CCol>
                </CRow>
            </>

    )
}

const mapStateToProps = (state) => ({
    pending: state.finance.pending
})

const mapDispatchToProps = { getPendingAmounts, getCashAccount, getAccountsHandler, getWithdrawalsHandler, addWithdrawalHandler }

export default connect(mapStateToProps, mapDispatchToProps)(Summary)