import { createSlice } from "@reduxjs/toolkit";
import BankAccount from '../services/BankAccount'

const bankAccount = createSlice({
    name: 'Bank Account',
    initialState: {msg: '', account: {}, cashAccount:{}},
    reducers: {
        addAccount(state, action){
            return {...state, account: action.payload}
        }, 
        addMsg(state, action){
            return {...state, msg: action.payload}
        }, 
        addCashAccount(state, action){
            return {...state, cashAccount: action.payload}
        }
    }

})


export const addAccountHandler = (payload) => async (dispatch) =>{
    try {
       let {status, result, message} = await BankAccount.addBankAccount(payload)
        if(status === 200){
            dispatch(addAccount(result))
        } else {
            dispatch(addMsg(message))
        }
    } catch (error) {
        dispatch(addMsg(error))
    }
}

export const updateAccountHandler = (payload) =>  async (dispatch)=>{
    
    try {
        let { result, message, status} = await BankAccount.updateBankAccount(payload)
        if(status === 200){
            dispatch(addAccount(result))
        } else {
            dispatch(addMsg(message))
        }
    } catch (error) {
        dispatch(addMsg(error))
    }
}

export const deleteAccountHandler = payload => async (dispatch) => {
    try {
        let {  message, status} = await BankAccount.deleteBankAccount(payload)
        if(status === 200){
            dispatch(addAccount({}))
        } else {
            throw dispatch(addMsg(message))
        }
    } catch (error) {
        throw  dispatch(addMsg(error))
        
       
    }
}
export const getAccountHandler = payload => async (dispatch) => {
    try {
        let { result, message, status} = await BankAccount.getBankAccount(payload)
        if(status === 200){
            dispatch(addAccount(result))
        } else {
            dispatch(addMsg(message))
        }
    } catch (error) {
        dispatch(addMsg(error))
    }
}

export const getAccountsHandler = () => async (dispatch) => {
    try {
        let { result, message, status} = await BankAccount.getBankAccounts()
        if(status === 200){
            dispatch(addAccount(result[0]?? {}))
        } else {
            dispatch(addMsg(message))
        }
    } catch (error) {
        dispatch(addMsg(error))
    }
}

export const getCashAccount = () => async (dispatch) => {
    try {
        let { data, message, status} = await BankAccount.cashAccount()
        if(status === 200) {
            dispatch(addCashAccount(data))
        } else {
            dispatch(addMsg(message))
        }
    } catch (error) {
        dispatch(addMsg(error))
    }
}

export default bankAccount.reducer
export const {addAccount, addMsg,addCashAccount} = bankAccount.actions