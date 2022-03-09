/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import {
  CardTitle,
  CardHeader,
  Row,
  Col,
  Label,
  Input,
  Button,
} from 'reactstrap'
import { useDispatch } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { shiftOptions } from '../../components/common/data'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
import { fetchListTestForm } from '../../../redux/analysisCertificate'
import { debounce } from 'lodash'
import { StyledFilterList } from './style'
import { agencyService } from '../../../services/agencyService'
import { DatePicker } from 'antd'
import moment from 'moment'

const BillFilter = ({ paramsSearch, handleResetFilter }) => {
  const [agencyOptions, setAgencyOptions] = useState([])
  const [phoneSearch, setPhoneSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [addressSearch, setAddressSearch] = useState('')
  const [receiptNoSearch, setReceiptNoSearch] = useState('')
  const [shiftSearch, setShiftSearch] = useState('')
  const [identityNumberSearch, setIdentityNumberSearch] = useState('')
  const [startTimeRange, setStartTimeRange] = useState(moment().startOf('day'))
  const [endTimeRange, setEndTimeRange] = useState(moment())
  const [agency2Search, setAgency2Search] = useState('')

  useEffect(() => {
    const allParamsSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      code: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      agencyUuid2: agency2Search?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
    }
    paramsSearch(allParamsSearch)
  }, [
    phoneSearch,
    nameSearch,
    addressSearch,
    receiptNoSearch,
    shiftSearch,
    identityNumberSearch,
    startTimeRange,
    endTimeRange,
    agency2Search,
  ])

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker
  useEffect(() => {
    agencyService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((agency) => ({
          label: agency.name,
          value: agency.uuid,
        }))
        setAgencyOptions(options)
      }
    })
  }, [])
  const fetchList = (params) => {
    analysisCertificateService.list(params).then((res) => {
      if (res.data.code === 600) {
        if (res.data.payload !== null) {
          dispatch(fetchListTestForm(res.data))
        } else {
          dispatch(fetchListTestForm([]))
        }
      }
    })
  }
  const debounceSearch = useCallback(
    debounce((query) => fetchList(query), 500),
    []
  )
  const hanldeSearchPhone = (e) => {
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      receiptNo: receiptNoSearch,
      phone: e,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setPhoneSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchName = (e) => {
    const dataSearch = {
      name: e,
      state: 'PAID',
      address: addressSearch,
      receiptNo: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setNameSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchAddress = (e) => {
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: e,
      receiptNo: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setAddressSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchReceipt = (e) => {
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      receiptNo: e,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setReceiptNoSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchShift = (e) => {
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      receiptNo: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: e?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setShiftSearch(e)
    debounceSearch(dataSearch)
  }
  const handleSearchidentityNumber = (e) => {
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      receiptNo: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: e,
      shift: shiftSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setIdentityNumberSearch(e)
    debounceSearch(dataSearch)
  }
  const handleSearchTime = (e) => {
    console.log(e)
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      receiptNo: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      fromDate: e !== null ? moment(e[0]).valueOf() : undefined,
      toDate: e !== null ? moment(e[1]).valueOf() : undefined,
      agencyUuid2: agency2Search?.value,
      page: 1,
      size: 10,
    }
    setStartTimeRange(e !== null ? e[0] : moment().startOf('day'))
    setEndTimeRange(e !== null ? e[1] : moment())
    debounceSearch(dataSearch)
  }
  const hanldeSearchAgency2 = (e) => {
    const dataSearch = {
      name: nameSearch,
      state: 'PAID',
      address: addressSearch,
      receiptNo: receiptNoSearch,
      phone: phoneSearch,
      identityNumber: identityNumberSearch,
      shift: shiftSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      agencyUuid2: e?.value,
      page: 1,
      size: 10,
    }
    setAgency2Search(e)
    debounceSearch(dataSearch)
  }
  const handleReset = () => {
    setPhoneSearch('')
    setNameSearch('')
    setAddressSearch('')
    setReceiptNoSearch('')
    setShiftSearch('')
    setIdentityNumberSearch('')
    setStartTimeRange(moment().startOf('day'))
    setEndTimeRange(moment())
    setAgency2Search('')
    debounceSearch({
      page: 1,
      size: 10,

      fromDate: moment().startOf('day').valueOf(),
      toDate: moment().valueOf(),
    })
    handleResetFilter()
  }
  return (
    <StyledFilterList>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Bộ lọc</CardTitle>
        <Button
          className='print-test-form'
          color='primary'
          onClick={() => handleReset()}
        >
          Reset
        </Button>
      </CardHeader>

      <Row className='mx-0 mt-1 mb-1'>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Số điện thoại
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='phone-input'
            placeholder='Nhập số điện thoại'
            onChange={(e) => hanldeSearchPhone(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Họ và tên
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='name-input'
            value={nameSearch}
            onChange={(e) => hanldeSearchName(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Địa chỉ
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='address-input'
            value={addressSearch}
            onChange={(e) => hanldeSearchAddress(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Đơn vị
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            className='dataTable-filter select-filter'
            options={agencyOptions}
            theme={selectThemeColors}
            value={agency2Search}
            onChange={(e) => hanldeSearchAgency2(e)}
          />
        </Col>
      </Row>
      <Row className='mx-0 mt-1 mb-1'>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Mã phiếu thu
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='receiptNo-input'
            value={receiptNoSearch}
            onChange={(e) => hanldeSearchReceipt(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            CCCD/CMT
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='receiptNo-input'
            value={identityNumberSearch}
            onChange={(e) => handleSearchidentityNumber(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Ca
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            className='dataTable-filter select-filter'
            options={shiftOptions}
            theme={selectThemeColors}
            value={shiftSearch}
            onChange={(e) => hanldeSearchShift(e)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Chọn thời gian
          </Label>
          <RangePicker
            separator={<span>Đến</span>}
            placeholder={['DD-MM-YYYY', 'DD-MM-YYYY']}
            format={['DD-MM-YYYY HH:mm ', 'DD-MM-YYYY HH:mm ']}
            value={[startTimeRange, endTimeRange]}
            onChange={handleSearchTime}
            showTime={{
              format: 'HH:mm',
              defaultValue: [
                moment('00:00', 'HH:mm'),
                moment('23:59', 'HH:mm'),
              ],
            }}
            className='dataTable-filter'
          />
        </Col>
      </Row>
    </StyledFilterList>
  )
}
export default BillFilter
