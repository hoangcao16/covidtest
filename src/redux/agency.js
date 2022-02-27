// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {agencyService} from "../services/agencyService"

export const getData = createAsyncThunk('agency/getData', async params => {
    const response = await agencyService.list()
    console.log('agency:response:', response)
    return { allData: response.data.payload, data: response.data.payload, totalPages: response.data.metadata.total, params }
})


export const agencySlice = createSlice({
    name: 'agency',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: []
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
    }
})


export default agencySlice.reducer
