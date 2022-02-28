// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {accountService} from "../services/accountService"

export const getList = createAsyncThunk('account/getList', async params => {
    const response = await accountService.list(params)
    console.log('account:getList:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const getData = createAsyncThunk('account/getData', async params => {
    const response = await accountService.list(params)
    console.log('account:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})


export const createData = createAsyncThunk('account/createData', async params => {
    const response = await accountService.create(params)
    console.log('account:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const getItem = createAsyncThunk('account/getItem', async uuid => {
    const response = await accountService.get(uuid)
    console.log('account:getItem:response:', response)
    return {}
})

export const updateData = createAsyncThunk('account/updateData', async uuid => {
    const response = await accountService.delete(uuid)
    console.log('account:updateData:response:', response)
    return {}
})

export const deleteData = createAsyncThunk('account/deleteData', async uuid => {
    const response = await accountService.delete(uuid)
    console.log('account:deleteData:response:', response)
    return {}
})

export const newSlice = createSlice({
    name: 'account',
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
