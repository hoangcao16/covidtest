// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {testTypeService} from "../services/testTypeService"

export const getData = createAsyncThunk('testType/getData', async params => {
    const response = await testTypeService.list(params)
    console.log('testType:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const createData = createAsyncThunk('testType/createData', async params => {
    const response = await testTypeService.create(params)
    console.log('testType:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const deleteData = createAsyncThunk('testType/deleteData', async uuid => {
    const response = await testTypeService.delete(uuid)
    console.log('testType:deleteData:response:', response)
    return {}
})

export const newslice = createSlice({
    name: 'testType',
    initialState: {
        data: [],
        total: 0,
        params: {},
        allData: [],
        lastCreateData: {},
        selectedItems: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getData.fulfilled, (state, action) => {
            console.log('testType:extraReducers:action')
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


export default newslice.reducer
