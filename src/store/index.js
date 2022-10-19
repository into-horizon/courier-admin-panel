// import { createStore } from 'redux'
import thunk from 'redux-thunk';
import {combineReducers ,configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import login from './auth'
import category from './category'
import products from './product'
import address from './address'
import orders from './orders'
import finance from './finance'
import bankAccount from './bankAccount';
import withdrawals from './withdrawal'
const initialState = {
  sidebarShow: true,
}
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const reducers = combineReducers({changeState, login:login, category: category, products:products,address:address, orders:orders, finance:finance,bankAccount:bankAccount,withdrawals:withdrawals })

const store = configureStore({reducer: reducers, middleware: (getDefaultMiddleware) => getDefaultMiddleware(),}, applyMiddleware(thunk))
export default store