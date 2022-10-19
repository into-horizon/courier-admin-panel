import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies';

import Category from '../services/CategoryService'


const category = createSlice({
    name: 'Category',
    initialState : {parentCategories: [], childCategories: [], grandChildCategories: []},
    reducers: {
        getParentCategories(state,action){
            return {...state, parentCategories: action.payload.response}
        },
        getChildCategories(state,action){
            return {...state, childCategories: action.payload.response}
        },
        getGrandChildCategories(state,action){
            return {...state, grandChildCategories: action.payload.response}
        },
    }
})

export const getParentCategoriesHandler = () => async (dispatch, state) => {
    try {
        let res = await Category.getAllParentCategoires();
        dispatch(getParentCategories(res))
    } catch (error) {
        console.error(error)
    }
}

export const getChildCategoriesHandler = () => async (dispatch, state) => {
    try {
        let res = await Category.getAllChildCategoires();
        dispatch(getChildCategories(res))
    } catch (error) {
        console.error(error)
    }
}

export const getGrandChildCategoriesHandler = () => async (dispatch, state) => {
    try {
        let res = await Category.getAllGrandChildCategoires();
        dispatch(getGrandChildCategories(res))
    } catch (error) {
        console.error(error)
    }
}


export default category.reducer
export const {getParentCategories,getChildCategories,getGrandChildCategories} = category.actions