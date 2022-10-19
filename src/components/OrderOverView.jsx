import React, { useState, useEffect } from 'react';
import { getOverviewOrdersHandler, getStatuesHandler } from '../store/orders'
import OrdersModel from './OrdersModel'
import { connect } from 'react-redux'
import Paginator from './Paginator';
import { CForm, CFormSelect, CButton, CRow, CCol, CSpinner, CFormCheck, CFormInput } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
const OrdersOverview = ({ getOverviewOrdersHandler, orders, count, getStatuesHandler, statuses }) => {
    useEffect(() => {
        Promise.all([getOverviewOrdersHandler(), getStatuesHandler()]).then(() => setLoading(false))
    }, [])
    
    const [params, setParams] = useState({ limit: 5, offset: 5 })
    const [orderStatus, setOrderStatus] = useState('')
    const [searchType, setSearchType] = useState('status')
    const [orderId, setOrder] = useState('')
    const [loading, setLoading] = useState(true)
    const submitHandler = e => {
        setLoading(true)
        setOrder(e.target.order?.value)
        setOrderStatus(e.target.status?.value)
        setParams(x=>{return{...x,order_id: e.target.order?.value, status: e.target.status?.value}})
        e.preventDefault();
        Promise.all([getOverviewOrdersHandler({ status: e.target.status?.value, order_id: e.target.order?.value })]).then(() => setLoading(false))

    }
    return (
        <>
            <h2>orders overview</h2>
            <CRow className='background'>
                <CCol md={2}>
                    <strong>search by</strong>
                </CCol>
                <CCol md={2}>

                    <CFormCheck type='radio' name='search' value="status" label="order status" defaultChecked onChange={e => setSearchType(e.target.value)} />
                </CCol>
                <CCol md={2}>

                    <CFormCheck type='radio' name='search' value="number" label="order number" onChange={e => setSearchType(e.target.value)} />
                </CCol>

                {searchType === 'status' && <CForm onSubmit={submitHandler} className='mgn-top50'>
                    <CRow>
                        <CCol >
                            <CFormSelect id="status" onChange={e => setOrderStatus(e.target.value)}>
                                <option value='' >All</option>
                                {React.Children.toArray(statuses.map(status => <option value={status}>{status}</option>))}
                                {/* <option value='canceled'>canceled</option>
                                <option value='accepted'>accepted</option>
                                <option value='pending'>pending</option> */}
                            </CFormSelect>

                        </CCol>
                        <CCol>

                            <CButton type="submit" ><CIcon icon={cilSearch} />search</CButton>
                        </CCol>
                    </CRow>

                </CForm>}
                {searchType === 'number' && <CForm className='mgn-top50' onSubmit={submitHandler}>
                    <CRow>
                        <CCol>

                            <CFormInput type="text" placeholder="order number" aria-label="default input example" id='order' />
                        </CCol>
                        <CCol>

                            <CButton type="submit" ><CIcon icon={cilSearch} />search</CButton>
                        </CCol>

                    </CRow>
                </CForm>}
            </CRow>

            {loading ? <CSpinner /> : <>
                <OrdersModel data={orders} />
                <Paginator count={Number(count)} params={params} changeData={getOverviewOrdersHandler} status={orderStatus} order_id={orderId} cookie='overview' cookieName='orderOverview' /></>}
        </>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders.ordersOverview.orders,
    count: state.orders.ordersOverview?.count,
    statuses: state.orders.statuses
})

const mapDispatchToProps = { getOverviewOrdersHandler, getStatuesHandler }

export default connect(mapStateToProps, mapDispatchToProps)(OrdersOverview)