// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {patientService} from "../services/patientService"

export const getList = createAsyncThunk('patient/getList', async params => {
    const response = await patientService.list(params)
    console.log('patient:getList:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const getData = createAsyncThunk('patient/getData', async params => {
    const response = await patientService.list(params)
    console.log('patient:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})


export const createData = createAsyncThunk('patient/createData', async params => {
    const response = await patientService.create(params)
    console.log('patient:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const updateData = createAsyncThunk('patient/updateData', async uuid => {
    const response = await patientService.delete(uuid)
    console.log('account:updateData:response:', response)
    return {}
})

export const deleteData = createAsyncThunk('patient/deleteData', async uuid => {
    const response = await patientService.delete(uuid)
    console.log('patient:deleteData:response:', response)
    return {}
})

export const newSlice = createSlice({
    name: 'patient',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: [],
        lastCreateData: {},
        selectedItems: {},
        selectedUuid: ''
    },
    reducers: {
        selectItem: (state, action) => {
            state.selectedUuid = action.payload
        }
    },
    extraReducers: builder => {
        console.log('patient:extraReducers')
        builder.addCase(getList.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.params = action.payload.params
            state.allData = action.payload.allData
            state.total = action.payload.totalPages
        })
        builder.addCase(createData.fulfilled, (state, action) => {
            state.lastCreateData = action.payload.lastCreateData
        })

    }
})

export const {
    selectItem
} = newSlice.actions

export default newSlice.reducer
