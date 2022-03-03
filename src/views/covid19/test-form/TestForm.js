/* eslint-disable prefer-const */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import {Fragment, useState, useEffect, memo} from 'react'
// ** Table Columns
import {statusOptions, disableOptions} from './data'
// ** Invoice List Sidebar
import TestFormSidebar from './test-form-sidebar'
import TestFormPreview from './test-form-preview'
import TestFromUploadCSV from './test-form-upload-sidebar'
// ** Store & Actions
import {useSelector, useDispatch} from 'react-redux'
import {StyledCard, StyledExpander} from './style'
import {
    refetchList,
    selectUuid,
    editCertificate,
    addNewCertificate,
    selectTestFormList,
    fetchListTestForm,
} from '../../../redux/analysisCertificate'
// ** Third Party Components
import {MoreVertical, Edit, FileText, Trash} from 'react-feather'
import {Table, Menu, Dropdown} from 'antd'
import {analysisCertificateService} from '../../../services/analysisCertificateCervice'
import moment from 'moment'
import Select from 'react-select'
import {toast, Slide} from 'react-toastify'
import TestFormFilter from './test-form-filter'
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
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(40)
    const [searchValue, setSearchValue] = useState('')
    const [selectedCertificate, setSelectedCertificate] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [openTestFormPreview, setOpenTestFormPreview] = useState(false)
    const [openTestFormUploadCSV, setOpenTestFormUploadCSV] = useState(false)
    const [dataExpanded, setDataExpanded] = useState({})

    // ** Store Vars
    const dispatch = useDispatch()
    const analysisCertificateState = useSelector(
        (state) => state.analysisCertificate
    )
    useEffect(() => {
        const params = {
            page: currentPage,
            size: rowsPerPage,
        }
        analysisCertificateService.list(params).then((res) => {
            // setDataTable(res.data.payload)
            if (res.data.payload !== null) {
                dispatch(fetchListTestForm(res.data.payload))
            }
        })
    }, [analysisCertificateState.refetch, currentPage, rowsPerPage])
    // ** Function to toggle sidebar
    const toggleTestFormSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }
    const toggleTestFormPreview = () => {
        setOpenTestFormPreview(!openTestFormPreview)
        // dispatch(selectTestFormList([]))
    }

    const toggleTestFormUploadCSV = () => {
        setOpenTestFormUploadCSV(!openTestFormUploadCSV)
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
    const handlePrintOne = (uuid) => {
        let Chosenone = []
        analysisCertificateService
            .get(uuid)
            .then((res) => {
                Chosenone.push(res.data.payload)
            })
            .then(() => {
                if (Chosenone.length > 0) {
                    dispatch(selectTestFormList(Chosenone))
                    toggleTestFormPreview()
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
                        handlePrintOne(props.text.uuid)
                    }}
                >
                    <FileText size={15}/>
                    <span className='align-middle ms-50'>In phiếu xét nghiệm</span>
                </Menu.Item>
                <Menu.Item key='2' onClick={(e) => e.domEvent.stopPropagation()}>
                    <FileText size={15}/>
                    <span className='align-middle ms-50'>In phiếu thu</span>
                </Menu.Item>
                <Menu.Item
                    key='3'
                    onClick={(e) => {
                        e.domEvent.stopPropagation()
                        handleEdit(props.text.uuid)
                    }}
                >
                    <Edit size={15}/>
                    <span className='align-middle ms-50'>Edit</span>
                </Menu.Item>
                <Menu.Item key='4' onClick={(e) => e.domEvent.stopPropagation()}>
                    <Trash size={15}/>
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
                            overlay={<ActionsMenu text={text}/>}
                            trigger={['click']}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreVertical size={15}/>
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
    const handleUploadCSV = () => {
        setOpenTestFormUploadCSV(!openTestFormUploadCSV)
    }
    const handlePrintMultipleTestForm = () => {
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
                            toggleTestFormPreview()
                        }
                    })
            })
        } else {
            toast.error('Hãy chọn phiếu xét nghiệm !', {
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
    const handleRowClick = (expanded, record) => {
        console.log(expanded, record)
        if (expanded) {
            analysisCertificateService.get(record.uuid).then((res) => {
                if (res.data.code === 600) {
                    setDataExpanded(res.data.payload)
                    console.log(res.data.payload)
                }
            })
        } else {
            setDataExpanded({})
        }
    }
    const Expander = ({record, expanded}) => {
        if (expanded) {
            return (
                <StyledExpander>
                    <thead>
                    <tr>
                        <td>Mã bệnh nhân</td>
                        <td>Tên bệnh nhân</td>
                        <td>CCCD/CMT</td>
                        <td>Số điện thoại</td>
                        <td>Địa chỉ</td>
                    </tr>
                    </thead>
                    <tbody>
                    {dataExpanded?.patients?.map((p, i) => (
                        <tr key={i}>
                            <td>{p.code}</td>
                            <td>{p.name}</td>
                            <td>{p.identityNumber}</td>
                            <td>{p.phone}</td>
                            <td>{p.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </StyledExpander>
            )
        } else {
            return <h2>Không có dữ liệu</h2>
        }
    }
    return (
        <Fragment>
            <TestFormFilter></TestFormFilter>
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
                            className='upload-test-form mx-1'
                            color='error'
                            onClick={() => handleUploadCSV()}
                        >
                            Upload CSV
                        </Button>
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
                        expandIconAsCell={false}
                        expandIconColumnIndex={-1}
                        expandRowByClick
                        expandedRowRender={(record, index, indent, expanded) => (
                            <Expander record={record} expanded={expanded}/>
                        )}
                        pagination={false}
                        rowKey='uuid'
                        columns={TestFormColumns}
                        onExpand={(expanded, record) => {
                            handleRowClick(expanded, record)
                        }}
                        dataSource={analysisCertificateState.dataTable}
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

            <TestFromUploadCSV
                openSideBar={openTestFormUploadCSV}
                toggleTestFormSidebar={toggleTestFormUploadCSV}
            />
        </Fragment>
    )
}

export default memo(TestForm)
