/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { Fragment, useState, useEffect, memo, useCallback } from 'react'
// ** Table Columns
import { statusOptions, disableOptions } from '../components/common/data'
// ** Invoice List Sidebar
import TestFormSidebarTechnician from '../components/TestformSidebar/test-form-sidebar-technician'
// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { StyledCard } from './style'
import {
  refetchList,
  selectUuid,
  editCertificate,
  fetchListTestForm,
} from '../../redux/analysisCertificate'
// ** Third Party Components
import { MoreVertical, Edit } from 'react-feather'
import { Table, Menu, Dropdown, Pagination } from 'antd'
import { analysisCertificateService } from '../../services/analysisCertificateCervice'
import moment from 'moment'
import Select from 'react-select'
import { toast, Slide } from 'react-toastify'
import LaboratoryFilter from './laboratory-filter'
import { isEmpty, debounce } from 'lodash'
// ** Reactstrap Imports
import { CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import { STATE_TECHNICIAN } from '../../constants/state'

const TestForm = ({}) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
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
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  const paramsSearch = (params) => {
    setAllParamsSearch(params)
  }
  useEffect(() => {
    const params = {
      ...allParamsSearch,
      page: currentPage,
      state: STATE_TECHNICIAN,
      size: rowsPerPage,
      fromDate: moment().startOf('day').valueOf(),
      toDate: moment().valueOf(),
    }
    analysisCertificateService.list(params).then((res) => {
      // setDataTable(res.data.payload)
      if (res.data.payload !== null) {
        dispatch(fetchListTestForm(res.data))
      } else {
        dispatch(fetchListTestForm([]))
      }
    })
  }, [analysisCertificateState.refetch])
  // ** Function to toggle sidebar
  useEffect(() => {
    if (!isEmpty(analysisCertificateState.dataTable.metadata)) {
      // setTotalPage(analysisCertificateState.dataTable.metadata.total)
      setMetadata(analysisCertificateState.dataTable.metadata)
    }
  }, [analysisCertificateState.dataTable])
  // ** Function to toggle sidebar
  const toggleTestFormSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const handleUpdateState = (value, record) => {
    const dataUpdate = {
      patientUuids: record.patientUuids,
      agencyUuid1: record.agencyUuid1,
      testTypeUuid: record.testTypeUuid,
      state: value.value,
    }
    analysisCertificateService.update(record.uuid, dataUpdate).then((res) => {
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
  const handleEdit = (uuid) => {
    toggleTestFormSidebar()
    dispatch(editCertificate(true))
    dispatch(selectUuid(uuid))
  }

  const ActionsMenu = (props) => {
    return (
      <Menu>
        <Menu.Item
          key='3'
          onClick={(e) => {
            e.domEvent.stopPropagation()
            handleEdit(props.text.uuid)
          }}
        >
          <Edit size={15} />
          <span className='align-middle ms-50'>Edit</span>
        </Menu.Item>
      </Menu>
    )
  }
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
  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e)
    debounceSearch({ page: currentPage, size: rowsPerPage, filter: e })
  }
  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    const params = {
      ...allParamsSearch,
      page: 1,
      size: parseInt(e.target.value),
      fromDate:
        allParamsSearch.fromDate === undefined
          ? moment().startOf('day').valueOf()
          : allParamsSearch.fromDate,
      toDate:
        allParamsSearch.toDate === undefined
          ? moment().valueOf()
          : allParamsSearch.toDate,
    }
    analysisCertificateService.list(params).then((res) => {
      // setDataTable(res.data.payload)
      if (res.data.payload !== null) {
        dispatch(fetchListTestForm(res.data))
      }
    })
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
    const params = {
      ...allParamsSearch,
      page: page,
      size: rowsPerPage,
      fromDate:
        allParamsSearch.fromDate === undefined
          ? moment().startOf('day').valueOf()
          : allParamsSearch.fromDate,
      toDate:
        allParamsSearch.toDate === undefined
          ? moment().valueOf()
          : allParamsSearch.toDate,
    }
    analysisCertificateService.list(params).then((res) => {
      // setDataTable(res.data.payload)
      if (res.data.payload !== null) {
        dispatch(fetchListTestForm(res.data))
      }
    })
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
    {
      title: 'Người thực hiện',
      align: 'center',
      sorter: (a, b) => a.staffName2.localeCompare(b.staffName2),
      dataIndex: 'staffName2',
    },
    {
      title: 'Ca',
      align: 'center',
      sorter: (a, b) => a.shift.localeCompare(b.shift),
      dataIndex: 'shift',
    },
    {
      title: 'Kết quả',
      align: 'center',
      sorter: (a, b) => a.labResultName.localeCompare(b.labResultName),
      dataIndex: 'labResultName',
    },
    {
      title: 'Đơn vị',
      align: 'center',
      sorter: (a, b) => a.agencyName1.localeCompare(b.agencyName1),
      dataIndex: 'agencyName1',
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
      title: 'Actions',
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className='d-flex justify-content-center'>
            <Dropdown
              overlay={<ActionsMenu text={text} />}
              trigger={['click']}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical size={15} />
            </Dropdown>
          </div>
        )
      },
    },
  ]

  const handleResetFilter = () => {
    setRowsPerPage(10)
    setCurrentPage(1)
  }
  return (
    <Fragment>
      <LaboratoryFilter
        paramsSearch={paramsSearch}
        handleResetFilter={handleResetFilter}
      ></LaboratoryFilter>
      <StyledCard>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Danh sách</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-2'>
          <Col sm='3'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>Hiển thị</Label>
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
              <Label for='sort-select'>kết quả</Label>
            </div>
          </Col>
          <Col
            className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1'
            sm={{ size: 5, offset: 4 }}
          >
            <Label className='me-1' for='search-input'>
              Tìm kiếm
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </Col>
        </Row>
        <div className='react-dataTable'>
          <Table
            // loading={true}
            pagination={false}
            rowKey='uuid'
            columns={TestFormColumns}
            dataSource={analysisCertificateState.dataTable.payload}
          />
          <div className='pagination'>
            <Pagination
              // defaultPageSize={rowsPerPage}
              pageSize={metadata?.size}
              current={metadata?.page}
              total={metadata?.total}
              showSizeChanger={false}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      </StyledCard>
      <TestFormSidebarTechnician
        openSideBar={sidebarOpen}
        toggleTestFormSidebar={toggleTestFormSidebar}
      />
    </Fragment>
  )
}

export default memo(TestForm)
