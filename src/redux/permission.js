// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {permissionService} from "../services/permissionService"

export const getList = createAsyncThunk('permission/getList', async params => {
    const response = await permissionService.list(params)
    console.log('permission:getList:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const getData = createAsyncThunk('permission/getData', async params => {
    const response = await permissionService.list(params)
    console.log('permission:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})


export const createData = createAsyncThunk('permission/createData', async params => {
    const response = await permissionService.create(params)
    console.log('permission:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const updateData = createAsyncThunk('permission/updateData', async uuid => {
    const response = await permissionService.delete(uuid)
    console.log('permission:updateData:response:', response)
    return {}
})

export const deleteData = createAsyncThunk('permission/deleteData', async uuid => {
    const response = await permissionService.delete(uuid)
    console.log('permission:deleteData:response:', response)
    return {}
})

export const newSlice = createSlice({
    name: 'permission',
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
        console.log('permission:extraReducers')
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
