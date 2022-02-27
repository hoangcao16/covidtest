import { createSlice } from '@reduxjs/toolkit'
const initialState = { tasks: [], status: 'idle' }
export const AnalysisCertificateSlice = createSlice({
  name: 'analysisCertificate',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
  },
})
export const { addTask } = AnalysisCertificateSlice.actions
export const selectTask = (state) => state.task
export default AnalysisCertificateSlice.reducer
