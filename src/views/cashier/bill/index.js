/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { Fragment, useState, useEffect, memo, useCallback } from 'react'
// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { StyledCard } from './style'
import {
  selectTestFormList,
  fetchListTestForm,
} from '../../../redux/analysisCertificate'
import BillFilter from './bill-filter'
// ** Third Party Components
import { MoreVertical, FileText } from 'react-feather'
import { Table, Menu, Dropdown, Pagination } from 'antd'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
import moment from 'moment'
import { toast, Slide } from 'react-toastify'
import { isEmpty, debounce } from 'lodash'
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
import BillPreview from '../../components/BillPreview/bill-preview'

const TestForm = ({}) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  // const [totalPage, setTotalPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const printStatus = 1
  const [selectedCertificate, setSelectedCertificate] = useState([])
  const [openBillPreview, setOpenBillPreview] = useState(false)
  const [metadata, setMetadata] = useState({
    page: 1,
    size: 10,
    total: 0,
  })
  const [allParamsSearch, setAllParamsSearch] = useState({})

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
      page: currentPage,
      size: rowsPerPage,
      state: 'PAID',
      printStatus: printStatus,
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
  const toggleBillPreview = () => {
    setOpenBillPreview(!openBillPreview)
    // dispatch(selectTestFormList([]))
  }
  const handlePrintBill = (uuid) => {
    let Chosenone = []
    analysisCertificateService
      .get(uuid)
      .then((res) => {
        Chosenone.push(res.data.payload)
      })
      .then(() => {
        if (Chosenone.length > 0) {
          dispatch(selectTestFormList(Chosenone))
          toggleBillPreview()
        }
      })
  }
  const ActionsMenu = (props) => {
    return (
      <Menu>
        <Menu.Item
          key='1'
          onClick={(e) => {
            e.domEvent.stopPropagation()
            handlePrintBill(props.text.uuid)
          }}
        >
          <FileText size={15} />
          <span className='align-middle ms-50'>In phiếu thu</span>
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
  // const handleFilter = (e) => {
  //   setSearchValue(e)
  //   debounceSearch({
  //     page: currentPage,
  //     size: rowsPerPage,
  //     printStatus: printStatus,
  //     filter: e,
  //   })
  // }
  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    const params = {
      ...allParamsSearch,
      page: 1,
      state: 'PAID',
      size: parseInt(e.target.value),
      printStatus: printStatus,
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
      state: 'PAID',
      size: rowsPerPage,
      printStatus: printStatus,
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
  const handlePrintMultipleBill = () => {
    if (selectedCertificate.length > 0) {
      let AllTestForm = []
      selectedCertificate.map((item) => {
        analysisCertificateService
          .get(item.uuid)
          .then((res) => {
            AllTestForm.push(res.data.payload)
          })
          .then(() => {
            if (AllTestForm.length === selectedCertificate.length) {
              dispatch(selectTestFormList(AllTestForm))
              toggleBillPreview()
            }
          })
      })
    } else {
      toast.error('Hãy chọn phiếu thu !', {
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
  }
  // ** Table Server Side Column
  const TestFormColumns = [
    {
      title: 'Mã Phiếu thu',
      align: 'center',
      sorter: (a, b) => a.receiptNo.localeCompare(b.receiptNo),
      dataIndex: 'receiptNo',
      ellipsis: true,
    },
    {
      title: 'Mã XN',
      align: 'center',
      sorter: (a, b) => a.code.localeCompare(b.code),
      dataIndex: 'code',
      ellipsis: true,
      render: (code) => <a href='/covid19/test-form'>{code} </a>,
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
      title: 'Người nộp tiền',
      align: 'center',
      sorter: (a, b) => a.payerName.localeCompare(b.payerName),
      dataIndex: 'payerName',
    },
    {
      title: 'Lí do nộp tiền',
      align: 'center',
      sorter: (a, b) => a.payFor.localeCompare(b.payFor),
      dataIndex: 'payFor',
    },
    {
      title: 'Số tiền',
      align: 'center',
      sorter: (a, b) => a.amount - b.amount,
      dataIndex: 'amount',
    },
    {
      title: 'Người tạo',
      align: 'center',
      sorter: (a, b) => a.staffName4.localeCompare(b.staffName4),
      dataIndex: 'staffName4',
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
      <BillFilter
        paramsSearch={paramsSearch}
        handleResetFilter={handleResetFilter}
      ></BillFilter>
      <StyledCard>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Danh sách</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-2 justify-content-between'>
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
            sm='6'
          >
            <Button
              className='print-test-form'
              color='primary'
              onClick={() => handlePrintMultipleBill()}
            >
              In phiếu thu
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
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
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
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      </StyledCard>
      <BillPreview
        openBillPreview={openBillPreview}
        toggleBillPreview={toggleBillPreview}
      />
    </Fragment>
  )
}

export default memo(TestForm)
