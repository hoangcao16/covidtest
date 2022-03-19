/* eslint-disable comma-dangle */
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  refetch: false,
  isAddNew: false,
  isEdit: false,
  selectedUuid: '',
  selectedDebtList: [],
  dataTable: [],
}
export const DebtSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {
    fetchListDebt(state, action) {
      state.dataTable = action.payload
    },
    refetchList: (state) => {
      state.refetch = !state.refetch
    },
    addNewDebt: (state, payload) => {
      state.isAddNew = payload.payload
    },
    editDebt: (state, payload) => {
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
    selectDebtList: (state, payload) => {
      state.selectedDebtList = payload.payload
    },
  },
})
export const {
  refetchList,
  addNewDebt,
  editDebt,
  selectUuid,
  closeSidebar,
  selectDebtList,
  fetchListDebt,
} = DebtSlice.actions
export const selectAnalysisCertificate = (state) => state.debt
export default DebtSlice.reducer
