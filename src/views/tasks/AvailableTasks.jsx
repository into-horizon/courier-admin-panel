import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { getAvailableTasks, takeoverHandler } from '../../store/tasks'
import Table from '../../components/Table'
import { CButton, CSpinner } from '@coreui/react'

export const AvailableTasks = ({ getAvailableTasks, takeoverHandler }) => {
  const { available: { data, count } } = useSelector(state => state.tasks)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([getAvailableTasks()]).then(() => setLoading(false))
  }, [])
  const [params, setParams] = useState({ limit: 10, offset: 0 })
 
  const Name = ({ city }) => {
    return (
      <React.Fragment>
        <span>{city}</span>
      </React.Fragment>
    )
  }

  const Action = data => {
    return (
      <React.Fragment>
        <CButton color='success' onClick={() => takeoverHandler(data.id)}>Take Over</CButton>
      </React.Fragment>
    )
  }
  const DateBody = data => <span>{new Date(data.delivery_date).toLocaleDateString()}</span>
  
  const columns = [
    { header: 'city', field: '', body: Name },
    { header: 'region', field: 'region' },
    { header: 'street', field: 'street_name' },
    { header: 'delivery date', field: 'delivery_date',body:DateBody },
    { header: 'action', field: '', body: Action }
  ]
  return (
    <>
      {loading ? <CSpinner color="primary" /> :
        <Table
          data={data}
          count={count}
          params={params}
          changeData={getAvailableTasks}
          columns={columns}
          style={{ textAlign: 'center' }}
          emptyMessage='no available tasks'
          cookieName='available'
        />
      }
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getAvailableTasks, takeoverHandler }

export default connect(mapStateToProps, mapDispatchToProps)(AvailableTasks)