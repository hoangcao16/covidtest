/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
// ** Custom Components
import { StyledTestFormPreview } from './style'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import LabResultModal from '../../components/labResult'
//Service
const TestFormPreview = ({ openTestFormPreview, toggleTestFormPreview }) => {
  // ** States
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  // ** Store Vars
  const dispatch = useDispatch()
  const handleSidebarClosed = () => {}
  // ** Vars
  return (
    <StyledTestFormPreview
      size='lg'
      open={openTestFormPreview}
      title='Kết quả xét nghiệm'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleTestFormPreview}
      onClosed={handleSidebarClosed}
    >
      <LabResultModal />
    </StyledTestFormPreview>
  )
}

export default TestFormPreview
