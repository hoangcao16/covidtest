/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { Fragment, useState, useEffect, memo, useCallback } from 'react'
// ** Table Columns
import { statusOptions, disableOptions } from '../../components/common/data'
// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { StyledCard } from './style'
import { refetchList, fetchListDebt, addNewDebt } from '../../../redux/debt'
// ** Third Party Components
import { Table, Pagination } from 'antd'
import { debtService } from '../../../services/debtService'

import moment from 'moment'
import Select from 'react-select'
import { toast, Slide } from 'react-toastify'
import LoansFilter from './loans-filter'
import { isEmpty, debounce } from 'lodash'
// ** Reactstrap Imports
import {
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Button,
} from 'reactstrap'
import SidebarLoans from './add-new-sidebar'

const TestForm = ({}) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  // const [totalPage, setTotalPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [allParamsSearch, setAllParamsSearch] = useState({})
  const [metadata, setMetadata] = useState({
    page: 1,
    size: 10,
    total: 0,
  })
  // ** Store Vars
  const dispatch = useDispatch()
  const debtState = useSelector((state) => state.debt)
  const paramsSearch = (params) => {
    setAllParamsSearch(params)
  }
  useEffect(() => {
    const params = {
      ...allParamsSearch,
      page: currentPage,
      size: rowsPerPage,

      fromDate: moment().startOf('day').valueOf(),
      toDate: moment().valueOf(),
    }
    debtService.list(params).then((res) => {
      // setDataTable(res.data.payload)
      if (res.data.payload !== null) {
        dispatch(fetchListDebt(res.data))
      } else {
        dispatch(fetchListDebt([]))
      }
    })
  }, [debtState.refetch])
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  // ** Function to toggle sidebar
  useEffect(() => {
    if (!isEmpty(debtState.dataTable.metadata)) {
      // setTotalPage(debtState.dataTable.metadata.total)
      setMetadata(debtState.dataTable.metadata)
    }
  }, [debtState.dataTable])
  const handleUpdateState = (value, record) => {
    const dataUpdate = {
      patientUuids: record.patientUuids,
      agencyUuid1: record.agencyUuid1,
      testTypeUuid: record.testTypeUuid,
      state: value.value,
    }
    debtService.update(record.uuid, dataUpdate).then((res) => {
      if (res.data.code === 600) {
        dispatch(refetchList())
        toast.success('Cập nhật thành công !', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Slide,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        toast.error('Cập nhật thất bại !', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Slide,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
  }
  const fetchList = (params) => {
    debtService.list(params).then((res) => {
      if (res.data.code === 600) {
        if (res.data.payload !== null) {
          dispatch(fetchListDebt(res.data))
        } else {
          dispatch(fetchListDebt([]))
        }
      }
    })
  }
  const debounceSearch = useCallback(
    debounce((query) => fetchList(query), 500),
    []
  )
  // ** Function to handle filter
  // const handleFilter = (e) => {
  //   setSearchValue(e)
  //   debounceSearch({
  //     page: currentPage,
  //     size: rowsPerPage,
  //
  //     filter: e,
  //   })
  // }
  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    const params = {
      ...allParamsSearch,
      page: 1,
      size: parseInt(e.target.value),

      fromDate:
        allParamsSearch.fromDate === undefined
          ? undefined
          : allParamsSearch.fromDate,
      toDate:
        allParamsSearch.toDate === undefined
          ? undefined
          : allParamsSearch.toDate,
    }
    debounceSearch(params)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
    const params = {
      ...allParamsSearch,
      page: page,
      size: rowsPerPage,

      fromDate:
        allParamsSearch.fromDate === undefined
          ? undefined
          : allParamsSearch.fromDate,
      toDate:
        allParamsSearch.toDate === undefined
          ? undefined
          : allParamsSearch.toDate,
    }
    debounceSearch(params)
  }
  // ** Table Server Side Column
  const TestFormColumns = [
    {
      title: 'Mã',
      align: 'center',
      sorter: (a, b) => a.code.localeCompare(b.code),
      dataIndex: 'code',
    },
    {
      title: 'Ngày tạo',
      align: 'center',
      sorter: (a, b) =>
        moment(a.createdTime).unix() - moment(b.createdTime).unix(),
      dataIndex: 'createdTime',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Loại xét nghiệm',
      align: 'center',
      sorter: (a, b) => a.testTypeName.localeCompare(b.testTypeName),
      dataIndex: 'testTypeName',
    },
    // {
    //   title: 'Người tạo',
    //   align: 'center',
    //   sorter: (a, b) => a.staffName2.localeCompare(b.staffName2),
    //   dataIndex: 'staffName4',
    // },
    {
      title: 'Ca',
      align: 'center',
      sorter: (a, b) => a.shift.localeCompare(b.shift),
      dataIndex: 'shift',
    },
    {
      title: 'Đơn vị nợ',
      align: 'center',
      sorter: (a, b) => a.agencyName3.localeCompare(b.agencyName3),
      dataIndex: 'agencyName3',
    },
    {
      title: 'Trạng thái',
      align: 'center',
      sorter: (a, b) => a.state.localeCompare(b.state),
      dataIndex: 'state',
      render: (text, record) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Select
              isClearable={false}
              classNamePrefix='select'
              className='react-select'
              options={statusOptions}
              isOptionDisabled={(option, selectValue) =>
                disableOptions(option, selectValue)
              }
              onChange={(value) => handleUpdateState(value, record)}
              value={statusOptions.find((c) => c.value === text)}
            ></Select>
          </div>
        )
      },
    },
    {
      title: 'Số tiền',
      align: 'center',
      sorter: (a, b) => a.amount - b.amount,
      dataIndex: 'amount',
      render: (text) => {
        return <div>{text} VNĐ</div>
      },
    },
  ]
  const handleResetFilter = () => {
    setRowsPerPage(10)
    setCurrentPage(1)
  }
  return (
    <Fragment>
      <LoansFilter
        paramsSearch={paramsSearch}
        handleResetFilter={handleResetFilter}
      ></LoansFilter>
      <StyledCard>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Danh sách</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-2'>
          <Col sm='3'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col
            className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1'
            sm={{ offset: 3, size: 6 }}
          >
            <Button
              className='add-new-test-form'
              color='primary'
              onClick={() => {
                toggleSidebar()
                dispatch(addNewDebt(true))
              }}
            >
              Thêm mới
            </Button>
            {/* <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={(e) => handleFilter(e.target.value)}
            /> */}
          </Col>
        </Row>
        <div className='react-dataTable'>
          <Table
            pagination={false}
            rowKey='uuid'
            columns={TestFormColumns}
            dataSource={debtState.dataTable.payload}
          />
          <div className='pagination'>
            <Pagination
              // defaultPageSize={rowsPerPage}
              pageSize={metadata?.size}
              current={metadata?.page}
              total={metadata?.total}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      </StyledCard>
      <SidebarLoans openSideBar={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default memo(TestForm)
