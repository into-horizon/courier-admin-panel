import React, { useState, useEffect } from 'react';
import AddressRender from './AddressRender'
import NewAddress from './NewAddress'
import { connect } from 'react-redux'
import { getAddress } from '../../../store/address'
import { CSpinner } from '@coreui/react'
const Address = ({ getAddress, address, message, storeName }) => {
    const [storeAddress, setAddress] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        
        getAddress()
    }, [])
    useEffect(() => {
        setAddress(address)
        setLoading(false)
    }, [address])
    return (
        <>
            {loading && <CSpinner />}
            {storeAddress.id && <AddressRender address={{ ...storeAddress, storeName: storeName }} />}
            {!storeAddress.id && !loading && <NewAddress />}
        </>
    )
}
const mapStateToProps = (state) => ({
    address: state.address.address,
    message: state.address.message,
    storeName: state.login.user.store_name
})
const mapDispatchToProps = { getAddress }
export default connect(mapStateToProps, mapDispatchToProps)(Address);