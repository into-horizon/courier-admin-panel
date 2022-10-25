import { createSlice } from "@reduxjs/toolkit";
import Courier from '../services/Courier'
import {loginAction} from './auth'

const courier = createSlice({
    name: 'courier',
    initialState: { msg: '', couriers: [], count: 0 },
    reducers: {
        addData(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export default courier.reducer

export const { addData } = courier.actions


export const addCourierHandler = payload => async (dispatch) => {
    try {
        let { status, message } = await Courier.addCourier(payload)
        if (status === 200) {
            dispatch(getCouriersHandler())
            dispatch(addData({ msg: message }))
        } else {
            dispatch(addData({ msg: message }))
        }
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}

export const getCouriersHandler = (payload) => async (dispatch) => {
    try {
        let { status, message, data,count } = await Courier.getCouriers(payload)
        if (status === 200) {
            dispatch(addData({ couriers: data, count: count })) 
        } else {
            dispatch(addData({ msg: message }))
        }
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}

export const removeCourier = payload => async (dispatch) => {
    try {
        let { status, message, data } = await Courier.removeCourier(payload)
        if(status === 200) {
            dispatch(getCouriersHandler())
        } else dispatch(addData({ msg:message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}


export const updateCourierStatus = payload => async (dispatch,state) => {
    try {
        let {status, data, message} = await Courier.updateStatus(payload)
        if(status === 200) {
            let {user} = state().login
            dispatch(loginAction({user: {...user,...data}}))
        } else dispatch(addData({ msg:message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}
