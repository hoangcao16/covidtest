// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {sampleTypeService} from "../services/sampleTypeService"

export const getData = createAsyncThunk('sampleType/getData', async params => {
    const response = await sampleTypeService.list(params)
    console.log('sampleType:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const createData = createAsyncThunk('sampleType/createData', async params => {
    const response = await sampleTypeService.create(params)
    console.log('sampleType:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const deleteData = createAsyncThunk('sampleType/deleteData', async uuid => {
    const response = await sampleTypeService.delete(uuid)
    console.log('sampleType:deleteData:response:', response)
    return {}
})

export const sampleTypeSlice = createSlice({
    name: 'sampleTypeSlice',
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
            console.log('sampleTypeSlice:extraReducers:action')
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


export default sampleTypeSlice.reducer
