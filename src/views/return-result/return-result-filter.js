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
import {useDispatch} from 'react-redux'
import {useEffect, useState, useCallback} from 'react'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {shiftOptions} from '../components/common/data'
import {analysisCertificateService} from '../../services/analysisCertificateCervice'
import {fetchListTestForm} from '../../redux/analysisCertificate'
import {debounce} from 'lodash'
import {StyledFilterList} from './style'
import {labResultTypeService} from '../../services/labResultTypeService'
import {agencyService} from '../../services/agencyService'
import {DatePicker} from 'antd'
import moment from 'moment'
import {STATE_TECHNICIAN} from "../../constants/state"

const ReturnResultFilter = ({paramsSearch, handleResetFilter}) => {
    const [labResultTypeOptions, setLabResultTypeOptions] = useState([])
    const [agencyOptions, setAgencyOptions] = useState([])
    const [phoneSearch, setPhoneSearch] = useState('')
    const [nameSearch, setNameSearch] = useState('')
    const [addressSearch, setAddressSearch] = useState('')
    const [stateSearch, setStateSearch] = useState('')
    const [codeSearch, setCodeSearch] = useState('')
    const [printStatusSearch, setPrintStatusSearch] = useState(null)
    const [shiftSearch, setShiftSearch] = useState('')
    const [labResultSearch, setLabResultSearch] = useState('')
    const [identityNumberSearch, setIdentityNumberSearch] = useState('')
    const [startTimeRange, setStartTimeRange] = useState(moment().startOf('day'))
    const [endTimeRange, setEndTimeRange] = useState(moment())
    const [agency2Search, setAgency2Search] = useState('')

    useEffect(() => {
        const allParamsSearch = {
            name: nameSearch,

            code: codeSearch,

            phone: phoneSearch,
            state: STATE_TECHNICIAN,
            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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
        codeSearch,
        shiftSearch,
        labResultSearch,
        identityNumberSearch,
        startTimeRange,
        endTimeRange,
        agency2Search,
    ])

    const dispatch = useDispatch()
    const {RangePicker} = DatePicker
    useEffect(() => {
        labResultTypeService.list({page: 1, perPage: 40, q: ''}).then((res) => {
            if (res.data.payload !== null) {
                const options = res.data.payload?.map((labResultType) => ({
                    label: labResultType.name,
                    value: labResultType.uuid,
                }))
                setLabResultTypeOptions(options)
            }
        })
        agencyService.list({page: 1, perPage: 40, q: ''}).then((res) => {
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
            code: codeSearch,
            phone: e,
            state: 'RETURN_RESULT,COMPLETED',
            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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
            code: codeSearch,
            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',
            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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
    const hanldeSearchCode = (e) => {
        const dataSearch = {
            name: nameSearch,

            code: e,

            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',

            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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
        setCodeSearch(e)
        debounceSearch(dataSearch)
    }
    const hanldeSearchShift = (e) => {
        const dataSearch = {
            name: nameSearch,

            code: codeSearch,

            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',

            identityNumber: identityNumberSearch,
            shift: e?.value,
            labResultUuid: labResultSearch?.value,
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
    const hanldeSearchLabResult = (e) => {
        const dataSearch = {
            name: nameSearch,

            code: codeSearch,

            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',

            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: e?.value,
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
        setLabResultSearch(e)
        debounceSearch(dataSearch)
    }
    const handleSearchidentityNumber = (e) => {
        const dataSearch = {
            name: nameSearch,

            code: codeSearch,

            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',

            identityNumber: e,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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

            code: codeSearch,

            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',

            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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

            code: codeSearch,

            phone: phoneSearch,
            state: 'RETURN_RESULT,COMPLETED',

            identityNumber: identityNumberSearch,
            shift: shiftSearch?.value,
            labResultUuid: labResultSearch?.value,
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
        setCodeSearch('')
        setShiftSearch('')
        setLabResultSearch('')
        setIdentityNumberSearch('')
        setStartTimeRange(moment().startOf('day'))
        setEndTimeRange(moment())
        setAgency2Search('')
        debounceSearch({
            page: 1,
            size: 10,
            state: 'RETURN_RESULT,COMPLETED',
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
            </Row>
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
export default ReturnResultFilter
