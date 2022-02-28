// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {roleService} from "../services/roleService"

export const getList = createAsyncThunk('role/getList', async params => {
    const response = await roleService.list(params)
    console.log('role:getList:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})

export const getData = createAsyncThunk('role/getData', async params => {
    const response = await roleService.list(params)
    console.log('role:getData:response:', response)
    return {
        allData: response.data.payload,
        data: response.data.payload,
        totalPages: response.data.metadata.total,
        params
    }
})


export const createData = createAsyncThunk('role/createData', async params => {
    const response = await roleService.create(params)
    console.log('role:createData:response:', response)
    return {
        lastCreateData: params
    }
})

export const updateData = createAsyncThunk('role/updateData', async uuid => {
    const response = await roleService.delete(uuid)
    console.log('role:updateData:response:', response)
    return {}
})

export const deleteData = createAsyncThunk('role/deleteData', async uuid => {
    const response = await roleService.delete(uuid)
    console.log('role:deleteData:response:', response)
    return {}
})

export const newSlice = createSlice({
    name: 'role',
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
        console.log('role:extraReducers')
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
