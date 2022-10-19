import React, { useState, useEffect } from 'react';
import { getPendingOrdersHandler } from 'src/store/orders';
import { connect } from 'react-redux'
import OrdersModel from './OrdersModel'
import { CSpinner } from '@coreui/react-pro';
import Paginator from './Paginator';



const PendingOrders = ({ orders, getPendingOrdersHandler, count }) => {
    const [params, setParams] = useState({ limit:10, offset: 10})
    useEffect(() => {
        getPendingOrdersHandler()
    }, [])
    return (
        <>  
            <h2>pending orders</h2>
            {orders ? <OrdersModel data={orders} /> : <CSpinner />}
            <Paginator params={params} count={Number(count)} changeData={getPendingOrdersHandler} cookieName='pendingOrder'/>
        </>
    )
}
const mapStateToProps = (state) => ({
    orders: state.orders.pendingOrders.orders,
    count: state.orders.pendingOrders.count,
})
const mapDispatchToProps = { getPendingOrdersHandler }

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders)