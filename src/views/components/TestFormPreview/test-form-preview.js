/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useRef } from 'react'
// ** Custom Components
import { StyledTestFormPreview } from './style'
import './index.css'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'react-qr-code'
import { selectTestFormList } from '../../../redux/analysisCertificate'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
// import { analysisCertificateService } from '../../../services/analysisCertificateCervice'

//Service
const TestFormPreview = ({ openTestFormPreview, toggleTestFormPreview }) => {
  // ** States
  const dispatch = useDispatch()
  const baseURL = process.env.REACT_APP_BASE_QR_URL
  const [dataView, setDataView] = useState([])
  const handleSidebarClosed = () => {
    dispatch(selectTestFormList([]))
  }
  const componentRef = useRef()
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  useEffect(() => {
    if (analysisCertificateState.selectedTestFormList.length > 0) {
      const listData = analysisCertificateState.selectedTestFormList
      let selectedItemsFinal = []
      listData.forEach((item) => {
        const fullCustomers = item.patients
        item.patients.forEach((it) => {
          const partners = fullCustomers.filter((itx) => itx.uuid !== it.uuid)
          let isMix = partners.length > 0
          selectedItemsFinal.push({
            ...item,
            customers: it,
            qrUrl: `${baseURL}/${item.searchCode}/${item.password}`,
            partners: partners,
            isMix: isMix,
          })
        })
      })
      setDataView(selectedItemsFinal)
    }
  }, [analysisCertificateState.selectedTestFormList])
  // ** Store Vars
  const handlePrintTestForm = useReactToPrint({
    content: () => componentRef.current,
  })
  const printTestForm = () => {
    handlePrintTestForm()
  }
  return (
    <StyledTestFormPreview
      size='lg'
      open={openTestFormPreview}
      title='Kết quả xét nghiệm'
      headerClassName='mb-1'
      contentClassName='pt-0 pt-0'
      toggleSidebar={toggleTestFormPreview}
      onClosed={handleSidebarClosed}
      titleButtonFooter='In kết quả'
      onClickButtonFooter={() => printTestForm()}
    >
      <div
        ref={componentRef}
        style={{ padding: '2cm 16px', boxSizing: 'border-box' }}
      >
        {dataView.length > 0 &&
          dataView.map((item, index) => {
            return (
              <div id='print-me' key={index}>
                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Phiếu trả kết quả xét nghiệm
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        TESTING RESULT REPORT
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Mã phiếu: {item.code}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        I. THÔNG TIN BỆNH NHÂN(PATIENT INFORMATION)
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%' }}>
                        Họ và tên
                        <span style={{ fontStyle: 'italic' }}>
                          (F.Name)
                        </span>: <span>{item.customers.name}</span>
                      </td>
                      <td>
                        Mã BN
                        <span style={{ fontStyle: 'italic' }}>
                          (Patient code)
                        </span>
                        : <span>{item.customers.code}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Ngày sinh
                        <span style={{ fontStyle: 'italic' }}>
                          (Birthday)
                        </span>:{' '}
                        <span>
                          {moment(item.customers.dateOfBirth).format(
                            'DD-MM-YYYY'
                          )}
                        </span>
                      </td>
                      <td>
                        Giới tính
                        <span style={{ fontStyle: 'italic' }}>(Sex)</span>:{' '}
                        <span>{item.customers.sex === 0 ? 'Nam' : 'Nữ'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        CMND/CCCD
                        <span style={{ fontStyle: 'italic' }}>
                          (Personal Identity Number/Passport)
                        </span>
                        : <span>{item.customers.identityNumber}</span>
                      </td>
                      <td
                        rowSpan='5'
                        style={{ textAlign: 'right', paddingRight: '2rem' }}
                      >
                        <QRCode value={item.qrUrl} size={120} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Địa chỉ
                        <span style={{ fontStyle: 'italic' }}>
                          (Address)
                        </span>: <span>{item.customers.address}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Quốc tịch
                        <span style={{ fontStyle: 'italic' }}>
                          (Nationality)
                        </span>{' '}
                        :<span>{item.customers.nationality}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Đơn vị lấy mẫu
                        <span style={{ fontStyle: 'italic' }}>
                          (Sample collecting unit)
                        </span>
                        : <span>{item.agencyName2}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Yêu cầu xét nghiệm
                        <span style={{ fontStyle: 'italic' }}>
                          (Required test)
                        </span>
                        : <span>{item.testTypeName}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td>Đối tượng gộp cùng :</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid' }}>
                        Tên<div>(Partner's name)</div>
                      </td>
                      <td style={{ border: '1px solid' }}>
                        Địa chỉ<div>(Partner's address)</div>
                      </td>
                    </tr>
                    {item.partners?.map((a, b) => {
                      return (
                        <tr key={b}>
                          <td style={{ border: '1px solid' }}>{a.name}</td>
                          <td style={{ border: '1px solid' }}>{a.address}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '100%',
                  }}
                >
                  II. THÔNG TIN BỆNH PHẨM(SAMPLE INFORMATION)
                </p>
                <table style={{ width: '100%' }}>
                  <tbody style={{ textAlign: 'center' }}>
                    <tr>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Mẫu<div style={{ fontStyle: 'italic' }}>(Sample)</div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Lần lấy mẫu
                        <div style={{ fontStyle: 'italic' }}>
                          (Time of sampling)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Thời gian lấy mẫu
                        <div style={{ fontStyle: 'italic' }}>
                          (Date of sampling)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Thời gian nhận mẫu
                        <div style={{ fontStyle: 'italic' }}>
                          (Date of receipt)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Tình trạng mẫu
                        <div style={{ fontStyle: 'italic' }}>
                          (Sample status):
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid', textAlign: 'left' }}>
                        ☑ {item.sampleTypeName}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {item.sampleNumber}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {moment(item.takeSampleTime).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {moment(item.receiveSampleTime).format(
                          'HH:mm DD-MM-YYYY'
                        )}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {item.sampleState ? 'Đạt' : 'Không đạt'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '100%',
                  }}
                >
                  II. KẾT QUẢ XÉT NGHIỆM(TEST RESULT)
                </p>
                <table style={{ width: '100%' }}>
                  <tbody style={{ textAlign: 'center', border: '1px solid' }}>
                    <tr>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Mẫu<div style={{ fontStyle: 'italic' }}>(Sample)</div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Lần XN
                        <div style={{ fontStyle: 'italic' }}>
                          (Time of testing)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Kỹ thuật
                        <div style={{ fontStyle: 'italic' }}>
                          (Testing method)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Ngày thực hiện
                        <div style={{ fontStyle: 'italic' }}>
                          (Testing date)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Kết quả
                        <div style={{ fontStyle: 'italic' }}>(Result)</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid', textAlign: 'left' }}>
                        ☑ {item.sampleTypeName}
                      </td>
                      <td style={{ border: '1px solid' }}>{item.testNumber}</td>
                      <td style={{ border: '1px solid' }}>
                        {item.testTypeName}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {moment(item.performTime).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td style={{ border: '1px solid' }}>{item.diagnosis}</td>
                    </tr>
                    <tr style={{ textAlign: 'left', border: '1px solid' }}>
                      <td colSpan='5'>
                        <div style={{ marginBottom: '0px' }}>
                          KẾT LUẬN: <span>{item.diagnosis}</span>
                        </div>
                        <div>
                          (Conclusion): <span>{item.diagnosisEng}</span>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ textAlign: 'left', border: '1px solid' }}>
                      <td colSpan='5'>
                        Thời gian trả kết quả (Time release of result):{' '}
                        <span>
                          {moment(item.returnTime).format('HH:mm DD-MM-YYYY')}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  ** Kết quả xét nghiệm chỉ có giá trị tại thời điểm lấy mẫu /
                  The test result is only valid from time of sample collection
                </div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        Số tiền: <span>{item.amount}</span> VNĐ
                        <div>Người thực hiện(Tester): {item.staffName2}</div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        Thanh Hóa, ngày {moment().format('DD')} tháng{' '}
                        {moment().format('MM')} năm {moment().format('YYYY')}
                        <div>TL.TRƯỞNG PHÒNG</div>
                        <div>(HEAD OF DEPARTMENT)</div>
                        <div>(Đã ký)</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
      </div>
    </StyledTestFormPreview>
  )
}

export default TestFormPreview
