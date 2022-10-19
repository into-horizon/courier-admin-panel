import { createSlice } from "@reduxjs/toolkit";
import Withdrawal from "src/services/Withdrawal";
import {updateWithdrawn } from './finance'
const withdrawal = createSlice({
    name: "withdrawal",
    initialState: {msg: "", withdrawals:{count: 0, data: []}},
    reducers: {
        addWithdrawals(state, action){
            return {...state, withdrawals: action.payload}
        }, 
        addMsg(state, action) {
            return {...state, msg: action.payload }
        }
    }
})

export const getWithdrawalsHandler = payload => async (dispatch) => {
    try {
        let {data, message, status} = await Withdrawal.getWithdrawals(payload)
        if (status === 200) {
            dispatch(addWithdrawals(data))
        }else {
            dispatch(addMsg(message))
        }
    } catch (error) {
        dispatch(addMsg(error));
    }
}

export const addWithdrawalHandler = payload => async (dispatch) => {
    try {
        let {status, message} = await Withdrawal.addWithdrawal(payload)
        if (status === 200) {
            dispatch(getWithdrawalsHandler())
            dispatch(updateWithdrawn (Number(payload.amount)))
        } else {
            dispatch(addMsg(message));
        }
    } catch (error) {
        dispatch(addMsg(error));
    }
}

export default withdrawal.reducer
export const {addWithdrawals, addMsg} = withdrawal.actions