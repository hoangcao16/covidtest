/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
import { serverSideColumns } from './data'
// ** Invoice List Sidebar
import Sidebar from './Sidebar'
// ** Store & Actions
import { getData } from '../../../redux/testForm'
import { useSelector, useDispatch } from 'react-redux'
import { StyledCard } from './style'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'

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

const TestForm = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const [dataTable, setDataTable] = useState([])
  const store = useSelector((state) => state.testForm)
  console.log('TestForm:', store)
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(40)
  const [searchValue, setSearchValue] = useState('')

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
  }, [dispatch])

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(store.total / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        }
      />
    )
  }
  useEffect(() => {
    analysisCertificateService.list(currentPage, rowsPerPage).then((res) => {
      console.log('res:', res)
      // setDataTable(res.data.payload)
      if (res.data.payload !== null) {
        setDataTable(res.data.payload)
      }
    })
  }, [])
  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchValue,
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <Fragment>
      <StyledCard>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Danh sách</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
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
              onClick={toggleSidebar}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            selectableRows
            selectableRowsHighlight
            paginationServer
            responsive
            className='react-dataTable'
            columns={serverSideColumns}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataTable}
          />
        </div>
      </StyledCard>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default memo(TestForm)
