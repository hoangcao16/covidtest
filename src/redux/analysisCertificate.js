/* eslint-disable comma-dangle */
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  refetch: false,
  isAddNew: false,
  isEdit: false,
  selectedUuid: '',
}
export const AnalysisCertificateSlice = createSlice({
  name: 'analysisCertificate',
  initialState,
  reducers: {
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
  },
})
export const { refetchList, addNewCertificate, editCertificate, selectUuid } =
  AnalysisCertificateSlice.actions
export const selectAnalysisCertificate = (state) => state.task
export default AnalysisCertificateSlice.reducer
