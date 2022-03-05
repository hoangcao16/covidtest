// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import {testFormService} from "../services/testFormService"


export const uploadCSV = createAsyncThunk('testForm/upload-csv', async data => {
    console.log('testForm:uploadCSV:response:', data)
    const response = await testFormService.upload(data)
    console.log('testForm:uploadCSV:response:', response)
    return {}
})


export const getData = createAsyncThunk('testForm/getData', async params => {
    const response = await testFormService.list()
    console.log('testForm:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
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
        console.log('testForm:extraReducers')
        builder.addCase(getData.fulfilled, (state, action) => {
            console.log('testForm:response:action:', action)
            state.data = action.payload.data
            state.params = action.payload.params
            state.allData = action.payload.allData
            state.total = action.payload.totalPages
        })
    }
})


export default datatablesSlice.reducer
