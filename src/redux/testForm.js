// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('datatables/getData', async params => {
    const response = await axios.get('/api/datatables/data', params)
    return { allData: response.data.allData, data: response.data.invoices, totalPages: response.data.total, params }
})

export const datatablesSlice = createSlice({
    name: 'testForm',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: []
    },
    reducers: {},
    extraReducers: builder => {
        console.log('datatablesSlice:extraReducers')
        builder.addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.params = action.payload.params
            state.allData = action.payload.allData
            state.total = action.payload.totalPages
        })
    }
})


export default datatablesSlice.reducer
