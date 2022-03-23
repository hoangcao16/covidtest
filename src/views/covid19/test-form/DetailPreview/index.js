/* eslint-disable object-shorthand */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable semi */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import { useState, useEffect } from 'react'
// ** Custom Components
import { StyledDetailSidebar } from './style'
// ** Utils
import {
  samplestateOptions,
  statusOptions,
} from '../../../components/common/data'
// ** Third Party Components
// import toVND from '../../components/common/toVND'
// ** Reactstrap Imports
import { Button, Label, Row, Col } from 'reactstrap'
import { closeSidebar } from '../../../../redux/analysisCertificate'
import moment from 'moment'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
//Service
import { analysisCertificateService } from '../../../../services/analysisCertificateCervice'

const SidebarNewTestForm = ({ openDetailPreview, toggleDetail }) => {
  // ** States
  const [dataView, setDataView] = useState({})
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  // ** Store Vars
  const dispatch = useDispatch()

  const handleSidebarClosed = () => {
    dispatch(closeSidebar())
  }
  useEffect(() => {
    if (analysisCertificateState.isDetail) {
      analysisCertificateService
        .get(analysisCertificateState.selectedUuid)
        .then((res) => {
          if (res.data.code === 600) {
            const payload = res?.data?.payload
            setDataView(payload)
          }
        })
    }
  }, [analysisCertificateState.isDetail])
  return (
    <StyledDetailSidebar
      size='lg'
      open={openDetailPreview}
      title='Chi tiết phiếu xét nghiệm'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleDetail}
      onClosed={handleSidebarClosed}
    >
      <h2>
        Mã phiếu xét nghiệm: <strong>{dataView?.code}</strong>
      </h2>
      <div className='detail'>
        <div className='mb-1'>
          <Label className='form-label'>
            Khách hàng:{' '}
            {dataView?.patients?.map((item, index) => {
              return (
                <span key={index}>
                  {item?.name} - {item?.phone}
                  {index < dataView?.patients?.length - 1 && ','}{' '}
                </span>
              )
            })}
          </Label>
        </div>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Yêu cầu xét nghiệm: {dataView?.testTypeName}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1 sampletype'>
              <Label className='form-label '>
                Mẫu bệnh phẩm: {dataView?.sampleTypeName}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Đơn vị xét nghiệm: {dataView?.agencyName1}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Đơn vị gửi mẫu: {dataView?.agencyName2}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Lấy mẫu tại nhà: {dataView?.getSampleAtHome ? 'Có' : 'Không'}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Giá tiền thu tại nhà:{' '}
                {dataView?.getSampleAtHome ? dataView?.getSampleAtHomePrice : 0}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>Giá tiền: {dataView?.amount}</Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Đơn vị nợ: {dataView?.agencyName3}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>Ca: {dataView?.shift}</Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Người lấy mẫu: {dataView?.staffName1}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Số lần lấy mẫu: {dataView?.sampleNumber}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label' for='sampleState'>
                Tình trạng mẫu:{' '}
                {dataView?.sampleStateName ? 'Đạt' : 'Không đạt'}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Thời gian lấy mẫu:{' '}
                {moment(dataView?.takeSampleTime).format('HH:mm DD-MM-YYYY')}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Thời gian nhận mẫu:{' '}
                {moment(dataView?.receiveSampleTime).format('HH:mm DD-MM-YYYY')}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>Ghi chú: {dataView?.note}</Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Người ký phiếu: {dataView?.staffName3}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Thời gian thực hiện:{' '}
                {moment(dataView?.performTime).format('HH:mm DD-MM-YYYY')}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Ngày trả kết quả:{' '}
                {moment(dataView?.returnTime).format('HH:mm DD-MM-YYYY')}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Kết quả: {dataView?.labResultName}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>CT: {dataView?.ct}</Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Kết luận: {dataView?.diagnosis}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Kết luận tiếng anh: {dataView?.diagnosisEng}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Trạng thái:{' '}
                {statusOptions.find((e) => e.value === dataView?.state)?.label}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Người thực hiện: {dataView?.staffName2}
              </Label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Người lập phiếu: {dataView?.staffName4}
              </Label>
            </div>
          </Col>
          <Col>
            <div className='mb-1'>
              <Label className='form-label'>
                Xác nhận Ký phiếu: {dataView?.signed ? 'Đã ký' : 'Chưa ký'}
              </Label>
            </div>
          </Col>
        </Row>
        <div className='group-button'>
          <Button type='reset' color='secondary' outline onClick={toggleDetail}>
            Cancel
          </Button>
        </div>
      </div>
    </StyledDetailSidebar>
  )
}

export default SidebarNewTestForm
