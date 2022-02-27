// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {technicalTypeService} from "../services/technicalTypeService"

export const getData = createAsyncThunk('technicalType/getData', async params => {
    const response = await technicalTypeService.list(params)
    console.log('technicalType:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const createData = createAsyncThunk('technicalType/createData', async params => {
    const response = await technicalTypeService.create(params)
    console.log('technicalType:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const deleteData = createAsyncThunk('technicalType/deleteData', async uuid => {
    const response = await technicalTypeService.delete(uuid)
    console.log('technicalType:deleteData:response:', response)
    return {}
})

export const technicalTypeSlice = createSlice({
    name: 'technicalType',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: [],
        lastCreateData: {},
        selectedItems: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getData.fulfilled, (state, action) => {
            console.log('technicalType:extraReducers:action', action)
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


export default technicalTypeSlice.reducer
