import { createSlice } from "@reduxjs/toolkit";

import Finance from "src/services/Finance";

const finance = createSlice({
    name: 'finance',
    initialState: {transactions: {data:[], count: 0},message:'' ,pending: 0, refunded:0, released:0, transferred: 0, withdrawn: 0, canceledWithdrawn: 0},
    reducers: {
        addData(state, action){
            return {...state, ...action.payload}
        },
        errorMessage(state, action) {
            return {...state, message: action.payload}
        },
        updateWithdrawn (state, action) {
            return {...state, withdrawn: state.withdrawn + action.payload}
        }
    }
})


export const getTransactions = payload => async (dispatch, state) => {
    try {
        let {status, result, message, count} = await Finance.getTransactions(payload)
        if(status === 200){
            dispatch(addData({transactions: {data:result, count:count}}))
        } else dispatch(errorMessage(message))
    } catch (error) {
        dispatch(errorMessage(error))
    }
}

export const getPendingAmounts = () => async (dispatch) => {
    try {
        let {status:s1, amount:pending} = await Finance.pendingAmounts()
        let {status:s2, amount:released} = await Finance.releasedAmounts()
        let {status:s3, amount:refunded} = await Finance.refundedAmounts()
        let {status:s4, amount:canceled} = await Finance.canceledWithdrawnAmount()
        let {status:s5, amount: transferred} = await Finance.transferredAmount()
        let {status:s6, amount: withdrawn} = await Finance.withdrawnAmount()
        if (s1 === 200 && s2 === 200 && s3 === 200 && s4 === 200 && s5 === 200 && s6 === 200) {
            dispatch(addData({pending: pending, released: released, refunded: refunded, transferred: transferred, canceledWithdrawn:canceled, withdrawn: withdrawn}))
        }
    } catch (error) {
        dispatch(errorMessage(error))
    }
}

export const {addData, errorMessage,updateWithdrawn } = finance.actions

export default finance.reducer