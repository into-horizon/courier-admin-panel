import { createSlice } from "@reduxjs/toolkit";
import Address from "src/services/Address";

const address = createSlice({
    name: 'address',
    initialState: { address: {}, message: '' },
    reducers: {
        addressState(state, action) {
            return { ...action.payload }
        },
        errorMessage(state, action) {
            return { ...state, message: action.payload }
        }
    }
})

export const addAddress = payload => async (dispatch, state) => {
    try {
        let { data, status, message } = await Address.addAddress(payload)
        if (status === 200) {
            dispatch(addressState({ address: data, message: message }))

        } else {
            dispatch(errorMessage({ data, status, message }))
        }
    } catch (error) {
        dispatch(errorMessage(error.message))
    }
}

export const getAddress = () => async (dispatch, state) => {
    try {
        let { status, result } = await Address.getAddress()
        if (status === 200) {
            dispatch(addressState({ address: result, message: 'got' }))
        } else {
            dispatch(errorMessage('something went wrong'))
        }
    } catch (error) {
        dispatch(errorMessage(error.message))
    }
}

export const updateAddress = payload => async (dispatch, state) => {
    try {
        const {data,status} = await Address.updateAddress(payload)
        if(status === 200){
            dispatch(addressState({ address: data, message: 'updated' }))
        }
    } catch (error) {
        dispatch(errorMessage(error.message))
    }
}

export const removeAddress = payload => async (dispatch, state) => {
console.log("🚀 ~ file: address.js ~ line 56 ~ removeAddress ~ payload", payload)
    try {
        const {data,status,message} = await Address.deleteAddress(payload)
        if(status === 200){
            dispatch(addressState({ address: {}, message: 'deleted' }))
        } else {
            dispatch(errorMessage(message))
        }
    } catch (error) {
        dispatch(errorMessage(error.message))
    }
}

export default address.reducer
export const { addressState, errorMessage } = address.actions