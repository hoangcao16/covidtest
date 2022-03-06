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
import {
  statusOptions,
  printStatusOptions,
  shiftOptions,
} from '../covid19/test-form/data'
import { analysisCertificateService } from '../../services/analysisCertificateCervice'
import { fetchListTestForm } from '../../redux/analysisCertificate'
import { debounce } from 'lodash'
import { StyledFilterList } from '../covid19/test-form/style'
import { labResultTypeService } from '../../services/labResultTypeService'
import { agencyService } from '../../services/agencyService'
import { DatePicker } from 'antd'
import moment from 'moment'

const PatientHistoryFilter = ({
  paramsSearch,
  handleResetFilter,
  patientuuid,
}) => {
  const [labResultTypeOptions, setLabResultTypeOptions] = useState([])
  const [stateSearch, setStateSearch] = useState('')
  const [codeSearch, setCodeSearch] = useState('')
  const [printStatusSearch, setPrintStatusSearch] = useState(null)
  const [shiftSearch, setShiftSearch] = useState('')
  const [labResultSearch, setLabResultSearch] = useState('')
  const [qrcodeSearch, setQrCodeSearch] = useState('')
  const [passwordSearch, setPasswordSearch] = useState('')
  const [startTimeRange, setStartTimeRange] = useState()
  const [endTimeRange, setEndTimeRange] = useState()

  useEffect(() => {
    const allParamsSearch = {
      state: stateSearch?.value,
      code: codeSearch,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
    }
    paramsSearch(allParamsSearch)
  }, [
    stateSearch,
    codeSearch,
    printStatusSearch,
    shiftSearch,
    labResultSearch,
    qrcodeSearch,
    passwordSearch,
    startTimeRange,
    endTimeRange,
  ])
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker
  useEffect(() => {
    labResultTypeService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((labResultType) => ({
          label: labResultType.name,
          value: labResultType.uuid,
        }))
        setLabResultTypeOptions(options)
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
  const hanldeSearchState = (e) => {
    const dataSearch = {
      state: e?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setStateSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchCode = (e) => {
    const dataSearch = {
      state: stateSearch?.value,
      code: e,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setCodeSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchPrintStatus = (e) => {
    const dataSearch = {
      status: stateSearch?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: e?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setPrintStatusSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchShift = (e) => {
    const dataSearch = {
      state: stateSearch?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: e?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setShiftSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchLabResult = (e) => {
    const dataSearch = {
      state: stateSearch?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: e?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setLabResultSearch(e)
    debounceSearch(dataSearch)
  }
  const handleSearchQRCode = (e) => {
    const dataSearch = {
      state: stateSearch?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: e,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setQrCodeSearch(e)
    debounceSearch(dataSearch)
  }
  const handleSearchPassWord = (e) => {
    const dataSearch = {
      state: stateSearch?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: e,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate:
        startTimeRange !== undefined
          ? moment(startTimeRange).valueOf()
          : undefined,
      toDate:
        endTimeRange !== undefined ? moment(endTimeRange).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setPasswordSearch(e)
    debounceSearch(dataSearch)
  }
  const handleSearchTime = (e) => {
    const dataSearch = {
      state: stateSearch?.value,
      code: codeSearch,
      patientUuid: patientuuid,
      printStatus: printStatusSearch?.value,
      searchCode: qrcodeSearch,
      password: passwordSearch,
      shift: shiftSearch?.value,
      labResultUuid: labResultSearch?.value,
      fromDate: e !== null ? moment(e[0]).valueOf() : undefined,
      toDate: e !== null ? moment(e[1]).valueOf() : undefined,
      page: 1,
      size: 10,
    }
    setStartTimeRange(e !== null ? e[0] : moment().startOf('day'))
    setEndTimeRange(e !== null ? e[1] : moment())
    debounceSearch(dataSearch)
  }
  const handleReset = () => {
    setStateSearch('')
    setCodeSearch('')
    setPrintStatusSearch('')
    setShiftSearch('')
    setLabResultSearch('')
    setQrCodeSearch('')
    setPasswordSearch('')
    setStartTimeRange()
    setEndTimeRange()
    debounceSearch({
      page: 1,
      size: 10,
      patientUuid: patientuuid,
      // fromDate: moment().startOf('day').valueOf(),
      // toDate: moment().valueOf(),
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
            Mã phiếu
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='receiptNo-input'
            value={codeSearch}
            onChange={(e) => hanldeSearchCode(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Trạng thái
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            className='dataTable-filter select-filter'
            options={statusOptions}
            theme={selectThemeColors}
            value={stateSearch}
            onChange={(e) => hanldeSearchState(e)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Kết quả
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            className='dataTable-filter select-filter'
            options={labResultTypeOptions}
            theme={selectThemeColors}
            value={labResultSearch}
            onChange={(e) => hanldeSearchLabResult(e)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Print Status
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            className='dataTable-filter select-filter'
            options={printStatusOptions}
            theme={selectThemeColors}
            value={printStatusSearch}
            onChange={(e) => hanldeSearchPrintStatus(e)}
          />
        </Col>
      </Row>
      <Row className='mx-0 mt-1 mb-1'>
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
            Mã QR code
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='receiptNo-input'
            value={qrcodeSearch}
            onChange={(e) => handleSearchQRCode(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='3'
        >
          <Label className='me-1' for='search-input'>
            Mật khẩu
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='receiptNo-input'
            value={passwordSearch}
            onChange={(e) => handleSearchPassWord(e.target.value)}
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
export default PatientHistoryFilter
