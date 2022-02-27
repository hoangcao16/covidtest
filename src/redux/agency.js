// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {agencyService} from "../services/agencyService"

export const getData = createAsyncThunk('agency/getData', async params => {
    const response = await agencyService.list(params)
    console.log('agency:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const createData = createAsyncThunk('agency/createData', async params => {
    const response = await agencyService.create(params)
    console.log('agency:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const deleteData = createAsyncThunk('agency/deleteData', async uuid => {
    const response = await agencyService.delete(uuid)
    console.log('agency:deleteData:response:', response)
    return {}
})

export const agencySlice = createSlice({
    name: 'agency',
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
        console.log('agency:extraReducers')
        builder.addCase(getData.fulfilled, (state, action) => {
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


export default agencySlice.reducer
