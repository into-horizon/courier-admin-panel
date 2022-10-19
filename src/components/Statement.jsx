import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { getTransactions } from '../store/finance'
import { CTableRow, CTableHead, CTable, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import Paginator from './Paginator'
export const Statement = ({ getTransactions }) => {
    const { transactions: { data, count } } = useSelector(state => state.finance)
    const [params, setParams] = useState({ limit: 20, offset: 20 })
    useEffect(() => {
        getTransactions({})
    }, [])
    return (
        <>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>id</CTableHeaderCell>
                        <CTableHeaderCell>order number</CTableHeaderCell>
                        <CTableHeaderCell>product</CTableHeaderCell>
                        <CTableHeaderCell>amount</CTableHeaderCell>
                        <CTableHeaderCell>status</CTableHeaderCell>
                        <CTableHeaderCell>type</CTableHeaderCell>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {React.Children.toArray(data.map(transaction =>
                        <CTableRow>
                            <CTableDataCell>
                                {transaction.id.substring(24)}

                            </CTableDataCell>
                            <CTableDataCell>
                                {transaction.customer_order_id}
                            </CTableDataCell>
                            <CTableDataCell>{transaction.entitle}</CTableDataCell>
                            <CTableDataCell>{transaction.amount}</CTableDataCell>
                            <CTableDataCell>{transaction.status}</CTableDataCell>
                            <CTableDataCell>{transaction.type}</CTableDataCell>
                            <CTableDataCell>{new Date(transaction.created_at).toLocaleDateString()}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <Paginator count={count} changeData={getTransactions} cookieName='statement' params={params} />
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getTransactions }

export default connect(mapStateToProps, mapDispatchToProps)(Statement)