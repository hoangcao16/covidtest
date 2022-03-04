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
import { useState, useCallback } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { statusOptions, printStatusOptions } from './data'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
import { fetchListTestForm } from '../../../redux/analysisCertificate'
import { debounce } from 'lodash'
import { StyledFilterList } from './style'

const TestFormFilter = () => {
  const [phoneSearch, setPhoneSearch] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [addressSearch, setAddressSearch] = useState('')
  const [stateSearch, setStateSearch] = useState('')
  const [receiptNoSearch, setReceiptNoSearch] = useState('')
  const [printStatusSearch, setPrintStatusSearch] = useState(null)
  const dispatch = useDispatch()

  const fetchList = (params) => {
    analysisCertificateService.list(params).then((res) => {
      dispatch(fetchListTestForm(res.data))
    })
  }
  const debounceSearch = useCallback(
    debounce((query) => fetchList(query), 500),
    []
  )
  const hanldeSearchPhone = (e) => {
    const dataSearch = {
      name: nameSearch,
      address: addressSearch,
      state: stateSearch?.value,
      receiptNo: receiptNoSearch,
      printStatus: printStatusSearch?.value,
      phone: e,
      page: 1,
      size: 10,
    }
    setPhoneSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchName = (e) => {
    const dataSearch = {
      name: e,
      address: addressSearch,
      state: stateSearch?.value,
      receiptNo: receiptNoSearch,
      printStatus: printStatusSearch?.value,
      phone: phoneSearch,
      page: 1,
      size: 10,
    }
    setNameSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchAddress = (e) => {
    const dataSearch = {
      name: nameSearch,
      address: e,
      state: stateSearch?.value,
      receiptNo: receiptNoSearch,
      printStatus: printStatusSearch?.value,
      phone: phoneSearch,
      page: 1,
      size: 10,
    }
    setAddressSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchState = (e) => {
    const dataSearch = {
      name: nameSearch,
      address: addressSearch,
      state: e?.value,
      receiptNo: receiptNoSearch,
      printStatus: printStatusSearch?.value,
      phone: phoneSearch,
      page: 1,
      size: 10,
    }
    setStateSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchReceiptNo = (e) => {
    const dataSearch = {
      name: nameSearch,
      address: addressSearch,
      state: stateSearch?.value,
      receiptNo: e,
      printStatus: printStatusSearch?.value,
      phone: phoneSearch,
      page: 1,
      size: 10,
    }
    setReceiptNoSearch(e)
    debounceSearch(dataSearch)
  }
  const hanldeSearchPrintStatus = (e) => {
    const dataSearch = {
      name: nameSearch,
      address: addressSearch,
      status: stateSearch?.value,
      receiptNo: receiptNoSearch,
      printStatus: e?.value,
      phone: phoneSearch,
      page: 1,
      size: 10,
    }
    setPrintStatusSearch(e)
    debounceSearch(dataSearch)
  }
  const handleReset = () => {
    setPhoneSearch('')
    setNameSearch('')
    setAddressSearch('')
    setStateSearch('')
    setReceiptNoSearch('')
    setPrintStatusSearch('')
    debounceSearch({ page: 1, size: 10 })
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

      <Row className='mx-0 mt-1 mb-2'>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='4'
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
          sm='4'
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
          sm='4'
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
      </Row>
      <Row className='mx-0 mt-1 mb-2'>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='4'
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
          sm='4'
        >
          <Label className='me-1' for='search-input'>
            Mã phiếu
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='receiptNo-input'
            value={receiptNoSearch}
            onChange={(e) => hanldeSearchReceiptNo(e.target.value)}
          />
        </Col>
        <Col
          className='d-flex align-items-start mt-sm-0 mt-1 flex-column'
          sm='4'
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
    </StyledFilterList>
  )
}
export default TestFormFilter
