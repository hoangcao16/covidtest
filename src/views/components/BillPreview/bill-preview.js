/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useRef } from 'react'
// ** Custom Components
import { StyledBillPreview } from './style'
import './index.css'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'react-qr-code'
import {
  refetchList,
  selectTestFormList,
} from '../../../redux/analysisCertificate'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
const baseURL = process.env.REACT_APP_BASE_QR_URL
//Service
const BillPreview = ({ openBillPreview, toggleBillPreview }) => {
  // ** States
  const dispatch = useDispatch()
  const [dataView, setDataView] = useState([])
  const handleSidebarClosed = () => {
    dispatch(selectTestFormList([]))
  }
  const componentRef = useRef()
  const receiptState = useSelector((state) => state.receipt)
  useEffect(() => {
    if (receiptState.selectedReceiptList.length > 0) {
      const listDate = receiptState.selectedReceiptList
      const selectedItemsFinal = listDate.map((item) => {
        return {
          ...item,
          qrUrl: `${baseURL}/${item?.searchCode}/${item?.password}`,
        }
      })
      setDataView(selectedItemsFinal)
    }
  }, [receiptState.selectedReceiptList])
  // ** Store Vars
  const handlePrintBill = useReactToPrint({
    content: () => componentRef.current,
  })
  const printBill = () => {
    receiptState.selectedReceiptList.map((item) => {
      const dataUpdate = {
        patientUuids: item?.patientUuids,
        agencyUuid1: item?.agencyUuid1,
        testTypeUuid: item?.testTypeUuid,
        state: 'PAID',
        printStatus: 1,
      }
      analysisCertificateService
        .update(item?.uuid, dataUpdate)
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    })
    dispatch(refetchList())
    handlePrintBill()
  }
  return (
    <StyledBillPreview
      size='lg'
      open={openBillPreview}
      title='Phiếu thu'
      headerClassName='mb-1'
      contentClassName='pt-0 pt-0'
      toggleSidebar={toggleBillPreview}
      onClosed={handleSidebarClosed}
      titleButtonFooter='In Phiếu Thu'
      onClickButtonFooter={() => printBill()}
    >
      <div
        ref={componentRef}
        style={{ padding: '2cm 16px', boxSizing: 'border-box' }}
      >
        {dataView.length > 0 &&
          dataView.map((item, index) => {
            console.log(item)
            return (
              <div id='print-me' key={index}>
                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tbody>
                    <tr style={{ textAlign: 'left' }}>
                      <td>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          CÔNG TY CP NGHIÊN CỨU KHOA HỌC - XÉT NGHIỆM CÔNG NGHỆ
                          CAO HỢP LỰC
                        </div>
                        <div style={{ fontSize: '16px' }}>
                          595 Nguyễn Chí Thanh, Phường Đông Thọ, Thành phố Thanh
                          Hóa, tỉnh Thanh Hóa, Việt Nam
                        </div>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                          Phiếu thu
                        </div>
                        <div>(Liên 2: Giao Khách Hàng)</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {moment().format('DD-MM-YYYY')}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        I. THÔNG TIN KHÁCH HÀNG
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', lineHeight: '1.1' }}>
                        Họ và tên : <span>{item?.payerName}</span>
                      </td>
                      <td style={{ lineHeight: '1.1' }}>
                        Mã BN : <span>{item?.payer?.code}</span>
                      </td>
                      <td
                        rowSpan='6'
                        style={{
                          textAlign: 'right',
                          paddingRight: '2rem',
                          lineHeight: '1.1',
                        }}
                      >
                        <QRCode value={item?.qrUrl} size={110} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '50%', lineHeight: '1.1' }}>
                        Ngày sinh :
                        {/* <span style={{ fontStyle: 'italic' }}>
                          (Birthday)
                        </span>:{' '} */}
                        <span>
                          {item?.payer?.dateOfBirth !== undefined
                            ? moment(item?.payer?.dateOfBirth).format(
                                'DD-MM-YYYY'
                              )
                            : ''}
                        </span>
                      </td>
                      <td style={{ width: '50%', lineHeight: '1.1' }}>
                        Giới tính :
                        {/* <span style={{ fontStyle: 'italic' }}>(Sex)</span>:{' '} */}
                        <span>
                          {item?.payer?.sex === 0
                            ? 'Nam'
                            : item?.payer?.sex === 1
                            ? 'Nữ'
                            : ''}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        Đơn vị:{item.agency}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        Nơi chỉ định: <span>{item?.agencyName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        Hẹn trả KQ:&nbsp;
                        <span>
                          {moment(item?.returnTime).format('HH:mm DD-MM-YYYY')}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        Địa điểm: <span>{item?.agencyName1}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <p></p>
                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tbody>
                    <tr style={{ fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid', width: '5%' }}>STT</td>
                      <td style={{ border: '1px solid', width: '25%' }}>
                        Nội dung
                      </td>
                      <td style={{ border: '1px solid', width: '45%' }}>
                        Ghi chú
                      </td>
                      <td style={{ border: '1px solid', width: '5%' }}>
                        Đơn vị tính
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Thành tiền
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ border: '1px solid', textAlign: 'left' }}
                        colSpan='6'
                      >
                        Xét nghiệm
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid' }}>1</td>
                      <td style={{ border: '1px solid' }}>{item?.payFor}</td>
                      <td style={{ border: '1px solid' }}>{item?.note}</td>
                      <td style={{ border: '1px solid' }}>
                        {item?.patients?.length}
                      </td>
                      <td style={{ border: '1px solid' }}>{item?.amount}</td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: '1px solid',
                          fontWeight: 'bold',
                          textAlign: 'left',
                        }}
                        colSpan='4'
                      >
                        Tổng cộng
                      </td>
                      <td style={{ border: '1px solid' }}>{item?.amount}</td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td colSpan='5'>
                        Danh sách khách hàng gồm kèm : {item?.patients?.length}{' '}
                        người
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: '1px solid',
                          width: '10%',
                          fontWeight: 'bold',
                        }}
                      >
                        STT
                      </td>
                      <td
                        style={{
                          border: '1px solid',
                          width: '35%',
                          fontWeight: 'bold',
                        }}
                      >
                        Bệnh nhân
                      </td>
                      <td
                        style={{
                          border: '1px solid',
                          width: '35%',
                          fontWeight: 'bold',
                        }}
                      >
                        Địa chỉ
                      </td>
                      <td
                        style={{
                          border: '1px solid',
                          width: '20%',
                          fontWeight: 'bold',
                        }}
                      >
                        Số điện thoại
                      </td>
                    </tr>
                    {item?.patients?.map((a, b) => {
                      return (
                        <tr key={b}>
                          <td style={{ border: '1px solid' }}>{b + 1}</td>
                          <td style={{ border: '1px solid' }}>{a.name}</td>
                          <td style={{ border: '1px solid' }}>{a.address}</td>
                          <td style={{ border: '1px solid' }}>{a.phone}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p></p>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%' }}></td>
                      <td style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          Tiền mặt: {item?.amount}
                        </div>
                        <div
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          Thu ngân
                        </div>
                        <div>(Ký, ghi rõ họ tên)</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <p></p>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        1. HÒM THƯ GÓP Ý ONLINE
                        <div>
                          Truy cập https://hstc.hopluc.com để góp ý chất lượng
                        </div>
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        2. HƯỚNG DẪN TRA CỨU KẾT QUẢ
                        <div>Bước 1: Hướng dẫn tra cứu kết quả</div>
                        <div>
                          Bước 2: Sử dụng phần mềm QR CODE và quét mã QR trên
                          phiếu thu này
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <p></p>
                <p></p>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        1. Hóa đơn GTGT chỉ xuất trong ngày và thông tin hóa đơn
                        được xuất theo thông tin khách hàng khai báo đăng ký
                        khám
                        <div>
                          2. Nếu có các yếu tố dịch tễ hoặc nghi nhiễm COVID-19,
                          đề nghị KH không ra về trước khi có kết quả và vui
                          lòng chờ tại khu vực hướng dẫn của nhân viên y tế.
                          Liên hệ tổng đài tư vấn: 0942225095
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
      </div>
    </StyledBillPreview>
  )
}

export default BillPreview
