/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
// ** Table Columns
import { statusOptions, disableOptions } from './data'
// ** Invoice List Sidebar
import TestFormSidebar from './test-form-sidebar'
import TestFormPreview from './test-form-preview'
// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { StyledCard } from './style'
import {
  refetchList,
  selectUuid,
  editCertificate,
  addNewCertificate,
  selectTestFormList,
} from '../../../redux/analysisCertificate'
// ** Third Party Components
import { MoreVertical, Edit, FileText, Trash } from 'react-feather'
import { Table, Menu, Dropdown } from 'antd'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
import moment from 'moment'
import Select from 'react-select'
import { toast, Slide } from 'react-toastify'
// ** Reactstrap Imports
import {
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Button,
  Col,
} from 'reactstrap'

const TestForm = ({}) => {
  // ** States
  const [dataTable, setDataTable] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(40)
  const [searchValue, setSearchValue] = useState('')
  const [selectedCertificate, setSelectedCertificate] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openTestFormPreview, setOpenTestFormPreview] = useState(false)
  // ** Store Vars
  const dispatch = useDispatch()
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  useEffect(() => {
    analysisCertificateService.list(currentPage, rowsPerPage).then((res) => {
      // setDataTable(res.data.payload)
      if (res.data.payload !== null) {
        setDataTable(res.data.payload)
      }
    })
  }, [analysisCertificateState.refetch])
  // ** Function to toggle sidebar
  const toggleTestFormSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const toggleTestFormPreview = () => {
    setOpenTestFormPreview(!openTestFormPreview)
    // dispatch(selectTestFormList([]))
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
        <Menu.Item key='1'>
          <FileText size={15} />
          <span className='align-middle ms-50'>In phiếu xét nghiệm</span>
        </Menu.Item>
        <Menu.Item key='2'>
          <FileText size={15} />
          <span className='align-middle ms-50'>In phiếu thu</span>
        </Menu.Item>
        <Menu.Item key='3' onClick={() => handleEdit(props.text.uuid)}>
          <Edit size={15} />
          <span className='align-middle ms-50'>Edit</span>
        </Menu.Item>
        <Menu.Item key='4'>
          <Trash size={15} />
          <span className='align-middle ms-50'>Delete</span>
        </Menu.Item>
      </Menu>
    )
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
            <Dropdown overlay={<ActionsMenu text={text} />} trigger={['click']}>
              <MoreVertical size={15} />
            </Dropdown>
          </div>
        )
      },
    },
  ]
  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value)
  }
  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
      setSelectedCertificate(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }
  const handlePrintMultipleTestForm = () => {
    dispatch(selectTestFormList(selectedCertificate))
    toggleTestFormPreview()
  }
  return (
    <Fragment>
      <StyledCard>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Danh sách</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-2'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
                <option value={7}>7</option>
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
            sm='6'
          >
            <Button
              className='print-test-form'
              color='primary'
              onClick={() => handlePrintMultipleTestForm()}
            >
              In phiếu xét nghiệm
            </Button>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
            <Button
              className='add-new-test-form'
              color='primary'
              onClick={() => {
                toggleTestFormSidebar()
                dispatch(addNewCertificate(true))
              }}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <div className='react-dataTable'>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            rowKey='uuid'
            columns={TestFormColumns}
            dataSource={dataTable}
          />
        </div>
      </StyledCard>
      <TestFormSidebar
        openSideBar={sidebarOpen}
        toggleTestFormSidebar={toggleTestFormSidebar}
      />
      <TestFormPreview
        openTestFormPreview={openTestFormPreview}
        toggleTestFormPreview={toggleTestFormPreview}
      />
    </Fragment>
  )
}

export default memo(TestForm)
