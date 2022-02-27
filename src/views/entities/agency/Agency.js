// ** React Imports
import {Fragment, useState, useEffect, memo} from 'react'

// ** Table Columns

// ** Store & Actions
import {getData} from '../../../redux/agency'
import {useSelector, useDispatch} from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import {ChevronDown, Plus} from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Row,
    Col,
    Button
} from 'reactstrap'
import AddNewModal from "./AddNewModal"
import {agencyService} from "../../../services/agencyService"
import {customizeColumns} from "./data"

const Agency = () => {

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.agency)
    console.log('Agency:', store)
    // ** States
    const [modal, setModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [refreshTable, setRereshTable] = useState(false)
    const handleDelete = (item) => {
        console.log('delete agency:item', item)
        agencyService.delete(item.uuid).then(() => {
            setRereshTable(!refreshTable)
        })
    }

    const handleModal = () => {
        setModal(!modal)
        console.log('submit')
    }
// ** Table data to render
    const dataToRender = () => {
        const filters = {
            q: searchValue
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        console.log('Agency:dataToRender:', store.data)
        if (store && store.allData?.length > 0) {
            return store.allData.slice(currentPage - 1, rowsPerPage)
        } else if (store.allData?.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData?.slice(0, rowsPerPage)
        }
    }

// ** Get data on mount
    useEffect(() => {
        dispatch(
            getData({
                page: currentPage,
                perPage: rowsPerPage,
                q: searchValue
            })
        )
    }, [dispatch, refreshTable])

// ** Function to handle filter
    const handleFilter = e => {
        setSearchValue(e.target.value)
        setCurrentPage(1)
        dispatch(
            getData({
                page: 0,
                perPage: rowsPerPage,
                q: e.target.value
            })
        )
    }

// ** Function to handle Pagination and get data
    const handlePagination = page => {
        dispatch(
            getData({
                page: page.selected + 1,
                perPage: rowsPerPage,
                q: searchValue
            })
        )
        setCurrentPage(page.selected + 1)
    }

// ** Function to handle per page
    const handlePerPage = e => {
        dispatch(
            getData({
                page: currentPage,
                perPage: parseInt(e.target.value),
                q: searchValue
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
                onPageChange={page => handlePagination(page)}
                activeClassName='active'
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
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Danh sách</CardTitle>
                    <Button className='ms-2' color='primary' onClick={handleModal}>
                        <Plus size={15}/>
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
                                onChange={e => handlePerPage(e)}
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
                    <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
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
                        columns={customizeColumns(handleDelete)}
                        sortIcon={<ChevronDown size={10}/>}
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                    />
                </div>
            </Card>
            <AddNewModal open={modal} handleModal={handleModal} refreshTable={refreshTable}/>
        </Fragment>
    )
}

export default memo(Agency)
