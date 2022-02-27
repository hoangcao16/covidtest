// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {labResultTypeService} from "../services/labResultTypeService"

export const getList = createAsyncThunk('labResultType/getList', async params => {
    const response = await labResultTypeService.list(params)
    console.log('labResultType:getList:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const getData = createAsyncThunk('labResultType/getData', async params => {
    const response = await labResultTypeService.list(params)
    console.log('labResultType:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})


export const createData = createAsyncThunk('labResultType/createData', async params => {
    const response = await labResultTypeService.create(params)
    console.log('labResultType:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const updateData = createAsyncThunk('labResultType/updateData', async uuid => {
    const response = await labResultTypeService.delete(uuid)
    console.log('labResultType:updateData:response:', response)
    return {}
})

export const deleteData = createAsyncThunk('labResultType/deleteData', async uuid => {
    const response = await labResultTypeService.delete(uuid)
    console.log('labResultType:deleteData:response:', response)
    return {}
})

export const newSlice = createSlice({
    name: 'labResultType',
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
        console.log('labResultTypeService:extraReducers')
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
