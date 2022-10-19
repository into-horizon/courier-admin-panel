import React, { useState, useEffect } from 'react';
import { getPendingOrdersHandler ,updateOrderItemHandler} from 'src/store/orders';
import { connect, useSelector } from 'react-redux'
import Products from '../services/ProductService'
import defaultProductImg from '../assets/images/default-store-350x350.jpg'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CFormSelect, CButton, CSpinner, CCol, CRow, CModal, CModalHeader, CModalFooter, CModalTitle, CForm } from '@coreui/react'
// import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom'
import Pdf from './Pdf'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';


const OrderModel = ({ data,updateOrderItemHandler }) => {
    // const{ pendingOrders} = useSelector(state => state.orders)
    const navigate = useNavigate()
    // const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [itemAction, setItemAction] = useState('')
    const [itemId, setItemId] = useState('')
    
    const closeModel = () =>{
        setItemAction('')
        setItemId('')
    }
    useEffect(async () => {

        
        setLoading(false)
        // setOrders(data)
    }, [data])
    // const generatePDF = () => {
    //     const doc = new jsPDF('landscape', 'pt', 'a4')
    //     doc.html(document.getElementById('orders'), {
    //         callback: (pdf) => {
    //             pdf.save('mypdf.pdf')
    //         }
    //     })
    // }
    const updateItem = (e, item) =>{
        e.preventDefault();
        itemAction === 'canceled'? updateOrderItemHandler({...item, status: e.target.status.value, cancellation_reason: e.target.cancellation_reason.value})  : updateOrderItemHandler({...item, status: e.target.status.value })
        closeModel()
    } 

    // useEffect(() => {
    //       setOrders(pendingOrders)  
    // },[data])
    const OrderItemAction = ({item }) => {
        const {entitle} =item
        return (
            <React.Fragment>
                <CModalHeader>{entitle}</CModalHeader>
                
                <CForm onSubmit={e=> updateItem(e,item)}>
                    <CRow>
                        <CCol md={11} >
                            <CFormSelect id='status' onChange={e => setItemAction(e.target.value)} className="m-2-1rem" value={itemAction}>
                                <option value="accepted">approve</option>
                                <option value="canceled">reject</option>
                            </CFormSelect>
                        </CCol>
                        {itemAction === 'canceled' && <CCol md={11} className="m-2-1rem">
                            <CFormSelect id='cancellation_reason' required={itemAction === 'rejected'}>
                                <option value="incorrect item">incorrect item</option>
                                <option value="out of stock">out of stock</option>
                                <option value="defective">defective</option>
                            </CFormSelect>
                        </CCol>}
                    </CRow>
                        <CModalFooter >

                            <CButton type='submit'>submit</CButton>
                        </CModalFooter>

                </CForm>
            </React.Fragment>
        )
    }
    return (
        <>
            {loading && <CSpinner />}
            { data.map((order, idx) =>
                <div id='orders' key={idx} style={{ border: '1px solid black', backgroundColor: 'white', borderRadius: '2rem', padding: '2rem', margin: '2rem 0' }}>

                    <h5>order details</h5>
                    <CTable >
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>
                                    Order ID
                                </CTableHeaderCell>
                                <CTableHeaderCell>
                                    customer Name
                                </CTableHeaderCell>
                                <CTableHeaderCell>
                                    grand total
                                </CTableHeaderCell>
                                <CTableHeaderCell>
                                    status
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                                <CTableDataCell>
                                    {order.customer_order_id}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {`${order.first_name} ${order.last_name}`}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {order.grand_total}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {order.status}
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                    {order.items.map((item, i) =>
                        <div key={i}>
                           
                            <h6>order items</h6>
                            <CTable key={i} align='middle'>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>
                                            image
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            Title
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            price
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            quantity
                                        </CTableHeaderCell>
                                        {item.size && <CTableHeaderCell>
                                            size
                                        </CTableHeaderCell>}
                                        <CTableHeaderCell>
                                            status
                                        </CTableHeaderCell>
                                        {item.status === 'pending' && <CTableHeaderCell>
                                            action
                                        </CTableHeaderCell>}
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableDataCell>

                                            {item && <img style={{ width: '7rem' }} src={item.picture ?? defaultProductImg} alt='img' />}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {item.entitle}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {item.price}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {item.quantity}
                                        </CTableDataCell>
                                        {item.size && <CTableDataCell>
                                            {item.size}
                                        </CTableDataCell>}
                                        <CTableDataCell>
                                            {item.status}
                                            {/* <CFormSelect aria-label="Default select example">
                                            <option> {item.status}</option>
                                            <option value="approve">approve</option>
                                            <option value="reject">reject</option>
                                            
                                        </CFormSelect> */}

                                        </CTableDataCell>
                                        {item.status === 'pending' && <CTableDataCell>
                                            <CModal visible={itemId === item.id} alignment="center" onClose={closeModel}>
                                                <OrderItemAction item={item}/>
                                            </CModal>
                                            <CButton color="secondary" onClick={() => setItemId(item.id)}>action</CButton>
                                            {/* <CButton color="danger">reject</CButton> */}
                                        </CTableDataCell>}
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </div>
                  
                    )}
                
                    <CButton color="primary">
                        <PDFDownloadLink style={{ textDecoration: 'none', color: 'white' }} document={<Pdf order={order} />} fileName="somename.pdf">
                            Download PDF!

                        </PDFDownloadLink>
                    </CButton>
                </div>

            )}


        </>
    )
}

const mapStateToProps = (state) => ({
    pendingOrders: state.orders.pendingOrders
})

const mapDispatchToProps = { getPendingOrdersHandler,updateOrderItemHandler }
export default connect(mapStateToProps, mapDispatchToProps)(OrderModel)