import { CSpinner, CTooltip, CLink, CFormSelect, CForm, CButton, CRow, CCol, CFormCheck, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormLabel, CFormInput } from '@coreui/react'
import React, { useState, useEffect, useRef } from 'react'
import { connect, useSelector } from 'react-redux'
import Table from '../../components/Table'
import { getTasksOverview, bulkReassignCourier, bulkUpdateStatus } from '../../store/tasks'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheckAlt, cilXCircle, cilUser } from '@coreui/icons'
import { Children } from 'react'
import { getCouriersHandler } from '../../store/courier'
import { CDatePicker } from '@coreui/react-pro'



export const TasksOverview = ({ getTasksOverview, getCouriersHandler, bulkReassignCourier, bulkUpdateStatus }) => {
  const { overview: { data, count } } = useSelector(state => state.tasks)
  const { couriers } = useSelector(state => state.couriers)
  const [params, setParams] = useState({ limit: 10, offset: 0 })
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState('')
  const [editCourier, setEditCourier] = useState('')
  const [selected, setSelected] = useState([])
  const [bulkReassign, setBulkReassign] = useState(false)
  const [bulkStatus, setBulkStatus] = useState(false)
  const status = useRef()
  useEffect(() => {
    Promise.all([getTasksOverview(), getCouriersHandler()]).then(() => setLoading(false))
  }, [])
  const Address = data => {
    return (
      <React.Fragment>
        <ul>
          <li>customer name: {`${data.first_name} ${data.last_name}`}</li>
          <li>city: {data.city}</li>
          {data.region && <li>region: {data.region}</li>}
          <li>street: {data.street_name}</li>
          <li>building#: {data.building_number}</li>
          <li>apartment: {data.apartment_number}</li>
          <li>mobile: {data.mobile}</li>

        </ul>
      </React.Fragment>
    )
  }
  const AddressTemplate = (data) => {
    return (
      <React.Fragment>
        <p>
          {data.city}  - {data.region}  {' '}
          <CTooltip content={<Address {...data} />} placement='bottom'>
            <CLink>
              see more
            </CLink>
          </CTooltip>

        </p>
      </React.Fragment>
    )
  }
  const StatusBody = (data) => {
    return (
      <React.Fragment>
        <CRow className="justify-content-center">
          <CCol xs='auto'>
            {edit === data.id ?
              <CForm onSubmit={e => bulkUpdateStatusHandler(e, data.id)}>
                <CRow>
                  <CCol xs='auto'>
                    <CFormSelect defaultValue={data.courier_task_status} id='status' >
                      <option value="canceled">canceled</option>
                      <option value="ready for delivery">ready for delivery</option>
                      <option value="out for delivery">out for delivery</option>
                      <option value='delivered'>delivered</option>
                    </CFormSelect>

                  </CCol>
                  <CCol xs='auto'>
                    <CTooltip content='update'>

                      <CButton color='success' size='sm' type='submit'><CIcon icon={cilCheckAlt} /></CButton>
                    </CTooltip>
                  </CCol>
                </CRow>

              </CForm>

              : <span>{data.courier_task_status}</span>}
          </CCol>
          <CCol xs='auto'>

            {edit === data.id ?
              <CTooltip content='cancel'>
                <CButton color='danger' size="sm" onClick={() => setEdit('')}><CIcon icon={cilXCircle} /></CButton>

              </CTooltip> :
              data.courier_task_status !== 'pending' && <CTooltip content='edit'>

                <CButton color='info' size="sm" onClick={() => setEdit(data.id)}><CIcon icon={cilPencil} /></CButton>
              </CTooltip>

            }
          </CCol>
        </CRow>

      </React.Fragment>
    )
  }
  const courierTemplate = data => {
    return (
      <React.Fragment>
        <CRow className="justify-content-center">
          <CCol xs='auto'>
            {editCourier === data.id ?
              <CForm onSubmit={(e) => bulkReassignHandler(e, data.id)}>
                <CRow>
                  <CCol xs='auto'>
                    <CFormSelect id='courier' required >
                      <option value={data.courier_id}>{data.courier_name}</option>
                      {Children.toArray(couriers.filter(c => c.status === 'approved' && c.id !== data.courier_id).map(c => <option value={c.id}>{c.courier_name}</option>))}
                    </CFormSelect>

                  </CCol>
                  <CCol xs='auto'>

                    <CButton color='success' size='sm' type='submit'><CIcon icon={cilCheckAlt} /></CButton>
                  </CCol>
                </CRow>
              </CForm> : <span>{data.courier_name}</span>
            }

          </CCol>
          <CCol xs='auto'>
            {editCourier === data.id ?
              <CTooltip content='cancel'>
                <CButton color='danger' size="sm" onClick={() => setEditCourier('')}><CIcon icon={cilXCircle} /></CButton>

              </CTooltip> :
              data.courier_task_status === 'pending' && <CTooltip content='edit'>

                <CButton color='secondary' size="sm" onClick={() => setEditCourier(data.id)}><CIcon icon={cilUser} /></CButton>
              </CTooltip>

            }
          </CCol>
        </CRow>

      </React.Fragment>
    )
  }
  const bulkReassignHandler = (e, id) => {
    e.preventDefault()
    setLoading(true)
    id ? bulkReassignCourier({ courier_id: e.target.courier.value, tasks: [id] }).then(() => setLoading(false)) : bulkReassignCourier({ courier_id: e.target.courier.value, tasks: selected }).then(() => setLoading(false))
    closeReassign()
    setEditCourier('')
  }
  const bulkUpdateStatusHandler = (e, id) => {
    e.preventDefault()
    setLoading(true)
    // status.current.value 
    id ? bulkUpdateStatus({ status: e.target.status.value, tasks: [id] }).then(() => setLoading(false)) : bulkUpdateStatus({ status: e.target.status.value, tasks: selected }).then(() => setLoading(false))
    closeStatus()
    setEdit('')
  }
  const searchHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    status.current.value && setParams(x => { return { ...x, status: status.current.value } })
    getTasksOverview({ ...params, status: status.current.value }).then(() => setLoading(false))

  }
  const DateBody = data => <span>{new Date(data.delivery_date).toLocaleDateString()}</span>

  const columns = [
    { header: 'customer name', field: 'customer_name' },
    { header: 'address', field: 'street_name', body: AddressTemplate },
    { header: 'delivery date', field: 'delivery_date', body: DateBody },
    { header: 'driver name', field: 'courier_name', body: courierTemplate },
    { header: 'driver task status', field: 'courier_task_status', body: StatusBody },
    // { header: 'status', field: 'status', body: StatusBody }
  ]
  const closeReassign = () => setBulkReassign(false)
  const closeStatus = () => setBulkStatus(false)
  return (
    <>
      <CModal
        backdrop={false}
        keyboard={false}
        portal={false}
        visible={bulkReassign}
        alignment='center'
        onClose={closeReassign}
      >
        <CModalHeader>
          <CModalTitle>Reassign driver</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={bulkReassignHandler}>
          <CRow className='justify-content-center mrgn50' >
            <CCol xs='auto'>
              <CFormLabel htmlFor='courier'>Select driver for the selected tasks</CFormLabel>
              <CFormSelect id='courier'>
                {Children.toArray(couriers.filter(c => c.status === 'approved').map(c => <option value={c.id}>{c.courier_name}</option>))}
              </CFormSelect>

            </CCol>
          </CRow>
          <CModalFooter>
            <CButton color="secondary" onClick={closeReassign}>Close</CButton>
            <CButton color="primary" type='submit'>Save changes</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      <CModal
        backdrop={false}
        visible={bulkStatus}
        alignment='center'
        onClose={closeStatus}
      >
        <CModalHeader>
          <CModalTitle>update status</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={bulkUpdateStatusHandler}>
          <CRow className="justify-content-center">
            <CCol xs='auto'>
              <CFormLabel htmlFor='status'>Select status for the selected tasks</CFormLabel>
              <CFormSelect defaultValue={data.status} id='status'>
                <option value="canceled">canceled</option>
                <option value="ready for delivery">ready for delivery</option>
                <option value="out for delivery">out for delivery</option>
                <option value='delivered'>delivered</option>
              </CFormSelect>

            </CCol>

          </CRow>
          <CModalFooter>
            <CButton color="secondary" onClick={closeStatus}>Close</CButton>
            <CButton color="primary" type='submit'>Save changes</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      <div className="card m-2-1rem">
        <CForm onSubmit={searchHandler}>
          <CRow className="justify-content-center align-items-end padding">
            <CCol xs='auto'>
              <CFormLabel>
                Select  driver Task status
              </CFormLabel>
              <CFormSelect ref={status} >
                <option value="pending">pending</option>
                <option value="canceled">canceled</option>
                <option value="ready for delivery">ready for delivery</option>
                <option value="out for delivery">out for delivery</option>
                <option value='delivered'>delivered</option>
              </CFormSelect>

            </CCol>
            <CCol xs='auto'>
              <CFormLabel>Delivery date</CFormLabel>
              <CRow>
                <CCol xs='auto'>

                  from: <CFormInput type='date' value={params?.from ?? ''} onChange={e => setParams(x => { return { ...x, from: e.target.value } })} />
                </CCol>
                <CCol xs='auto'>
                  to: <CFormInput type='date' value={params?.to ?? ''} onChange={e => setParams(x => { return { ...x, to: e.target.value } })} />
                </CCol>
              </CRow>
            </CCol>
            <CCol xs='auto'>
              <CButton type="submit">Search</CButton>
            </CCol>
            <CCol xs='auto'>
              <CButton color='secondary' onClick={() => setParams({ limit: 10, offset: 0 })}>Reset Filter</CButton>
            </CCol>
          </CRow>
        </CForm>
      </div>
      <CRow className="justify-content-end " xs={{ gutterY: 2 }} >
        {!(!params.status || params.status === 'pending') && <CCol xs='auto'>
          <CTooltip content='update status selected'>
            <CButton color='info' disabled={selected.length === 0}><CIcon icon={cilPencil} onClick={() => setBulkStatus(true)} /></CButton>
          </CTooltip>
        </CCol>}
        <CCol xs='auto'>
          <CTooltip content='reassign driver for selected'>
            <CButton color='secondary' disabled={selected.length === 0} onClick={() => setBulkReassign(true)}><CIcon icon={cilUser} /></CButton>

          </CTooltip>
        </CCol>
      </CRow>

      {loading ? <CSpinner color="primary" /> :
        <>

          <Table
            data={data}
            count={count}
            params={params}
            changeData={getTasksOverview}
            columns={columns}
            style={{ textAlign: 'center' }}
            emptyMessage='no tasks'
            cookieName='available'
            checkbox={true}
            onSelect={(w) => setSelected(w)}
          />
        </>
      }

    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getTasksOverview, getCouriersHandler, bulkReassignCourier, bulkUpdateStatus }

export default connect(mapStateToProps, mapDispatchToProps)(TasksOverview)