/* eslint-disable comma-dangle */
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { staffService } from '../services/staffService'

export const getList = createAsyncThunk('staff/getList', async (params) => {
  const response = await staffService.list(params)
  return {
    allData: response.data.payload,
    data: response.data.payload,
    totalPages: response.data.metadata.total,
    params,
  }
})

export const getData = createAsyncThunk('staff/getData', async (params) => {
  const response = await staffService.list(params)
  console.log('staff:getData:response:', response)
  return {
    allData: response.data.payload,
    data: response.data.payload,
    totalPages: response.data.metadata.total,
    params,
  }
})

export const createData = createAsyncThunk(
  'staff/createData',
  async (params) => {
    const response = await staffService.create(params)
    console.log('staff:createData:response:', response)
    return {
      lastCreateData: params,
    }
  }
)

export const updateData = createAsyncThunk('staff/updateData', async (uuid) => {
  const response = await staffService.delete(uuid)
  console.log('account:updateData:response:', response)
  return {}
})

export const deleteData = createAsyncThunk('staff/deleteData', async (uuid) => {
  const response = await staffService.delete(uuid)
  console.log('staff:deleteData:response:', response)
  return {}
})

export const newSlice = createSlice({
  name: 'staff',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    lastCreateData: {},
    selectedItems: {},
    selectedUuid: '',
  },
  reducers: {
    selectItem: (state, action) => {
      state.selectedUuid = action.payload
    },
  },
  extraReducers: (builder) => {
    console.log('staff:extraReducers')
    builder.addCase(getList.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
    })
    builder.addCase(createData.fulfilled, (state, action) => {
      state.lastCreateData = action.payload.lastCreateData
    })
  },
})

export const { selectItem } = newSlice.actions

export default newSlice.reducer
