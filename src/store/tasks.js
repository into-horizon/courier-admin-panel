import { createSlice } from "@reduxjs/toolkit";
import Tasks from "../services/Tasks";

const tasks = createSlice({
    name: 'tasks',
    initialState: { msg: '', available: { data: [], count: 0 }, unassigned: { data: [], count: 0 }, overview: {data: [], count: 0} },
    reducers: {
        addData(state, action) {
            return { ...state, ...action.payload }
        }
    }

})

export const getAvailableTasks = payload => async (dispatch) => {
    try {
        let { status, data, count, message } = await Tasks.availableTasks(payload)
        if (status === 200) {
            dispatch(addData({ available: { data: data, count: count } }))
        } else dispatch(addData({ msg: message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}

export const takeoverHandler = payload => async (dispatch, state) => {
    try {
        let { status, message, data } = await Tasks.takeoverTask(payload)
        if (status === 200) {
            dispatch(getAvailableTasks())
        } else dispatch(addData({ msg: message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}

export const getUnassignedTasks = (payload) => async (dispatch) => {
    try {
        let { status, data, message } = await Tasks.unassignedTasks(payload)
        if (status === 200) {
            dispatch(addData({ unassigned: data }))
        } else dispatch(addData({ msg: message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}

export const assignCourierHandler = payload => async (dispatch, state) => {
    try {
        let { status, data, message } = await Tasks.assignCourier(payload)
        if (status === 200) {
            let { unassigned: { data: unassigned, count } } = state().tasks
            let newData = unassigned.map((d) => {
                if (d.id === data.id) {
                    return { ...d, ...data }
                } else return d
            })
            dispatch(addData({ unassigned: { data: newData, count: count } }))
        } else dispatch(addData({ msg: message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}

export const getTasksOverview = (payload) => async (dispatch) => {
    try {
        let { status, data, message } = await Tasks.tasksOverview(payload)
        if (status === 200) {
            dispatch(addData({ overview: data }))
        } else dispatch(addData({ msg: message }))
    } catch (error) {
        dispatch(addData({ msg: error }))
    }
}


export default tasks.reducer

export const { addData } = tasks.actions