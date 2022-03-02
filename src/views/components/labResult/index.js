/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { useRef } from 'react'

import { useReactToPrint } from 'react-to-print'
const labResultModal = () => {
  const componentRef = useRef()
  const handlePrintTestForm = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <div id='printMe'>
      <div ref={componentRef} style={{ width: '100%' }}>
        <table>
          <tbody>
            <tr>Phiếu trả kết quả xét nghiệm</tr>
            <tr>TESTING RESULT REPORT</tr>
            <tr>Mã phiếu:</tr>
            <tr>I. THÔNG TIN BỆNH NHÂN(PATIENT INFORMATION)</tr>
            <table></table>
          </tbody>
        </table>
      </div>
      <button onClick={() => handlePrintTestForm()}>In kết quả</button>
    </div>
  )
}
export default labResultModal
