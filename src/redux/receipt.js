/* eslint-disable comma-dangle */
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  refetch: false,
  isAddNew: false,
  isEdit: false,
  selectedUuid: '',
  selectedReceiptList: [],
  dataTable: [],
}
export const ReceiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    fetchListReceipt(state, action) {
      state.dataTable = action.payload
    },
    refetchList: (state) => {
      state.refetch = !state.refetch
    },
    addNewReceipt: (state, payload) => {
      state.isAddNew = payload.payload
    },
    editReceipt: (state, payload) => {
      state.isEdit = payload.payload
    },
    selectUuid: (state, payload) => {
      state.selectedUuid = payload.payload
    },
    closeSidebar: (state) => {
      state.isAddNew = false
      state.isEdit = false
      state.selectedUuid = ''
    },
    selectReceiptList: (state, payload) => {
      state.selectedReceiptList = payload.payload
    },
  },
})
export const {
  refetchList,
  addNewReceipt,
  editReceipt,
  selectUuid,
  closeSidebar,
  selectReceiptList,
  fetchListReceipt,
} = ReceiptSlice.actions
export const selectReceipt = (state) => state.receipt
export default ReceiptSlice.reducer
