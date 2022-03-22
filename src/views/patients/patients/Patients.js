/* eslint-disable comma-dangle */
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns

// ** Store & Actions
import { getList } from '../../../redux/patient'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import AddNewCard from './AddNewCard'
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Button,
} from 'reactstrap'
import AddNewModal from './AddNewModal'
import { customizeColumns } from './data'
import { patientService } from '../../../services/patientService'
import EditModal from './EditModal'

const Patients = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.patient)
  // ** States
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [refreshTable, setRefreshTable] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const handleDelete = (uuid) => {
    patientService.delete(uuid).then(() => {
      setRefreshTable(!refreshTable)
    })
  }
  const handleModal = () => {
    setModal(!modal)
  }

  const handleEditModal = (item) => {
    setEditModal(!editModal)
    setSelectedItem(item)
  }
  // ** Table data to render
  // const dataToRender = () => {
  //   const filters = {
  //     q: searchValue,
  //   }

  //   const isFiltered = Object.keys(filters).some(function (k) {
  //     return filters[k].length > 0
  //   })

  //   if (store && store.allData?.length > 0) {
  //     return store.allData.slice(currentPage - 1, rowsPerPage)
  //   } else if (store.allData?.length === 0 && isFiltered) {
  //     return []
  //   } else {
  //     return store.allData?.slice(0, rowsPerPage)
  //   }
  // }
  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getList({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
  }, [dispatch, refreshTable])

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
    dispatch(
      getList({
        page: 1,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    dispatch(
      getList({
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
      getList({
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
        // activeClassName='active'
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

  return (
    <Fragment>
      <AddNewCard setRefreshTable={setRefreshTable} />
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Danh sách</CardTitle>
          <Button className='ms-2' color='primary' onClick={handleModal}>
            <Plus size={15} />
            <span className='align-middle ms-50'>Add Record</span>
          </Button>
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
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            className='react-dataTable'
            columns={customizeColumns(handleEditModal, handleDelete)}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={store?.data}
          />
        </div>
      </Card>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        setRefreshTable={setRefreshTable}
      />
      <EditModal
        open={editModal}
        item={selectedItem}
        handleModal={handleEditModal}
        setRefreshTable={setRefreshTable}
      />
    </Fragment>
  )
}

export default memo(Patients)
