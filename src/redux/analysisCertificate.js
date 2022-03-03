/* eslint-disable comma-dangle */
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  refetch: false,
  isAddNew: false,
  isEdit: false,
  selectedUuid: '',
  selectedTestFormList: [],
  dataTable: [],
}
export const AnalysisCertificateSlice = createSlice({
  name: 'analysisCertificate',
  initialState,
  reducers: {
    fetchListTestForm(state, action) {
      state.dataTable = action.payload
    },
    refetchList: (state) => {
      state.refetch = !state.refetch
    },
    addNewCertificate: (state, payload) => {
      state.isAddNew = payload.payload
    },
    editCertificate: (state, payload) => {
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
    selectTestFormList: (state, payload) => {
      state.selectedTestFormList = payload.payload
    },
  },
})
export const {
  refetchList,
  addNewCertificate,
  editCertificate,
  selectUuid,
  closeSidebar,
  selectTestFormList,
  fetchListTestForm,
} = AnalysisCertificateSlice.actions
export const selectAnalysisCertificate = (state) => state.task
export default AnalysisCertificateSlice.reducer
