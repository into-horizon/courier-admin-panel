import { CButton, CForm, CFormSelect, CLink, CRow, CSpinner, CTooltip } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import Table from '../../components/Table'
import { getUnassignedTasks, assignCourierHandler } from '../../store/tasks'
import { getCouriersHandler } from '../../store/courier'
import { CCol } from '@coreui/react-pro'

export const UnassignedTasks = ({ getUnassignedTasks, getCouriersHandler, assignCourierHandler }) => {
  const { unassigned: { data, count } } = useSelector(state => state.tasks)
  const { couriers } = useSelector(state => state.couriers)
  const [loading, setLoading] = useState(true)
  const [progressLoading, setProgressLoading] = useState('')
  useEffect(() => {
    Promise.all([getUnassignedTasks(), getCouriersHandler()]).then(() => setLoading(false))
  }, [])
  const [params, setParams] = useState({ limit: 10, offset: 0 })

  // useEffect(() => {

  //   console.log("🚀 ~ file: UnassignedTasks.jsx ~ line 15 ~ UnassignedTasks ~ unassigned", data)
  // }, [data])
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
          {data.city}  - {data.region}
          <CTooltip content={<Address {...data} />} placement='bottom'>
            <CLink>
              see all
            </CLink>
          </CTooltip>

        </p>
      </React.Fragment>
    )
  }
  const submitHandler = (e, id) => {
    e.preventDefault();
    setProgressLoading(id)
    assignCourierHandler({ id: id, courier_id: e.target.courier.value }).then(() => setProgressLoading(false))
  }
  const ActionTemplate = data => {
    return (
      <React.Fragment>
        {progressLoading === data.id ? <CSpinner color="primary" /> :
          <>
            {data.courier_id ? <span>{couriers.find(c => c.id === data.courier_id)?.courier_name}</span> :
              <CForm onSubmit={(e) => submitHandler(e, data.id)}>
                <CRow>
                  <CCol xs='auto'>
                    <CFormSelect id='courier'>
                      {
                        React.Children.toArray(couriers.filter(val => val.status === 'approved').map(val => <option value={val.id}>{val.courier_name}</option>))
                      }
                    </CFormSelect>

                  </CCol>
                  <CCol xs='auto'>

                    <CButton type="submit"color="secondary">assign</CButton>
                  </CCol>
                </CRow>
              </CForm>

            }

          </>

        }
      </React.Fragment>
    )
  }
  const columns = [{ header: 'address', field: '', body: AddressTemplate }, { header: 'action', field: '', body: ActionTemplate }]
  return (
    <>
      {loading ? <CSpinner /> :
        <Table
          data={data}
          count={count}
          changeData={getUnassignedTasks}
          columns={columns}
          cookieName='unassigned'
          emptyMessage='no available tasks'
          params={params}
        />
      }
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getUnassignedTasks, getCouriersHandler, assignCourierHandler }

export default connect(mapStateToProps, mapDispatchToProps)(UnassignedTasks)