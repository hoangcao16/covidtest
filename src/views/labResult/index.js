/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import './style.css'
import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { analysisCertificateService } from '../../services/analysisCertificateCervice'
import moment from 'moment'
import QRCode from 'react-qr-code'
import { useReactToPrint } from 'react-to-print'
import { useDispatch, useSelector } from 'react-redux'
const labResultQrcode = () => {
  const [dataView, setDataView] = useState([])
  const componentRef = useRef()
  const { code, password } = useParams()
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  const baseURL = process.env.REACT_APP_BASE_QR_URL
  useEffect(() => {
    analysisCertificateService.qrcode(code, password).then((res) => {
      if (res.data.code === 600 && res.data.payload !== null) {
        let selectedItemsFinal = []
        const fullCustomers = res?.data?.payload?.patients
        res?.data?.payload?.patients.forEach((item) => {
          const partners = fullCustomers.filter((i) => i.uuid !== item.uuid)
          selectedItemsFinal.push({
            ...res.data.payload,
            customers: item,
            qrUrl: `${baseURL}/${res.data.payload.searchCode}/${res.data.payload.password}`,
            partners: partners,
          })
        })
        setDataView(selectedItemsFinal)
      }
    })
  }, [])
  const handlePrintTestForm = useReactToPrint({
    content: () => componentRef.current,
  })
  const printTestForm = () => {
    analysisCertificateState.selectedTestFormList.map((item) => {
      const dataUpdate = {
        patientUuids: item.patientUuids,
        agencyUuid1: item.agencyUuid1,
        testTypeUuid: item.testTypeUuid,
        state: item.state,
        printStatus: 1,
      }
      analysisCertificateService
        .update(item.uuid, dataUpdate)
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    })
    handlePrintTestForm()
  }
  return (
    <>
      <div ref={componentRef} style={{ padding: '2cm 16px' }}>
        {dataView.length > 0 ? (
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
                <></>
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
                        {item.sampleState ? 'Đủ mẫu' : 'Không đủ mẫu'}
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
                      <td style={{ border: '1px solid' }}>
                        {item.labResultName}
                      </td>
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
                <p></p>
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
          })
        ) : (
          <h1>Chưa có kết quả</h1>
        )}
      </div>
      <div className='button-wrapper'>
        <button onClick={() => printTestForm()} className='print-button'>
          In kết quả
        </button>
      </div>
    </>
  )
}
export default labResultQrcode
