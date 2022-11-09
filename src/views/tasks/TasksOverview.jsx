import { CSpinner, CTooltip, CLink, CFormSelect, CForm, CButton, CRow, CCol, CFormCheck } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import Table from '../../components/Table'
import { getTasksOverview } from '../../store/tasks'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheckAlt, cilXCircle, cilUser } from '@coreui/icons'
import { Children } from 'react'
import {getCouriersHandler} from '../../store/courier'
export const TasksOverview = ({ getTasksOverview,getCouriersHandler }) => {
  const { overview: { data, count } } = useSelector(state => state.tasks)
  const { couriers } = useSelector(state => state.couriers)
  const [params, setParams] = useState({ limit: 10, offset: 0 })
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState('')
  const [editCourier, setEditCourier] = useState('')
  const [selected, setSelected] = useState([])
  useEffect(() => {
    Promise.all([getTasksOverview(),getCouriersHandler()]).then(() => setLoading(false))
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
              <CForm>
                <CRow>
                  <CCol xs='auto'>
                    <CFormSelect defaultValue={data.status} >
                      <option value="canceled">canceled</option>
                      <option value="ready for delivery">ready for delivery</option>
                      <option value="out for delivery">out for delivery</option>
                      <option value='delivered'>delivered</option>
                    </CFormSelect>

                  </CCol>
                  <CCol xs='auto'>
                    <CTooltip content='update'>

                      <CButton color='success' size='sm'><CIcon icon={cilCheckAlt} /></CButton>
                    </CTooltip>
                  </CCol>
                </CRow>

              </CForm>

              : <span>{data.status}</span>}
          </CCol>
          <CCol xs='auto'>

            {edit === data.id ?
              <CTooltip content='cancel'>
                <CButton color='danger' size="sm" onClick={() => setEdit('')}><CIcon icon={cilXCircle} /></CButton>

              </CTooltip> :
              <CTooltip content='edit'>

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
          <CForm>
            <CRow>
              <CCol xs='auto'>
            <CFormSelect >
              {Children.toArray(couriers.filter(c => c.status === 'approved').map(c => <option value={c.id}>{c.courier_name}</option>))}
            </CFormSelect>

              </CCol>
              <CCol xs='auto'>

            <CButton color='success' size='sm'><CIcon icon={cilCheckAlt} /></CButton>
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
              <CTooltip content='edit'>

                <CButton color='info' size="sm" onClick={() => setEditCourier(data.id)}><CIcon icon={cilPencil} /></CButton>
              </CTooltip>

            }
          </CCol>
        </CRow>

      </React.Fragment>
    )
  }
  const columns = [
    { header: 'customer name', field: 'customer_name' },
    { header: 'courier name', field: 'courier_name', body:courierTemplate },
    { header: 'address', field: 'street_name', body: AddressTemplate },
    { header: 'status', field: 'status', body: StatusBody }
  ]

  return (
    <>
      <CRow className="justify-content-end" xs={{ gutterY: 2 }}>
        <CCol xs='auto'>
          <CTooltip content='update status selected'>
            <CButton color='info'><CIcon icon={cilPencil} /></CButton>
          </CTooltip>
        </CCol>
        <CCol xs='auto'>
          <CTooltip content='reassign driver for selected'>
            <CButton color='secondary'><CIcon icon={cilUser} /></CButton>

          </CTooltip>
        </CCol>
      </CRow>
      {loading ? <CSpinner color="primary" /> :
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
        />}

    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getTasksOverview,getCouriersHandler }

export default connect(mapStateToProps, mapDispatchToProps)(TasksOverview)