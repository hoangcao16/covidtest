// ** React Imports
import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Label,
    Input,
    Table,
    Modal,
    Button,
    CardBody,
    ModalBody,
    ModalHeader,
    FormFeedback,
    UncontrolledTooltip
} from 'reactstrap'

// ** Third Party Components
import {Copy, Info} from 'react-feather'
import {useForm, Controller} from 'react-hook-form'

// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** FAQ Illustrations
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'

// import {roles} from './data'
import {getListRoles, deleteData, createData} from "../../../../redux/role"
import {useDispatch, useSelector} from "react-redux"
import Select from "react-select"

import AssignUserToRoleModal from './AssignUserToRoleModal'

const rolesArr = [
    'QL_THONG_TIN_BN',
    'QL_THONG_TIN_XN',
    'SUA_TIEN',
    'QL_THONG_TIN_KET_QUA',
    'CAU_HINH_DANH_MUC',
    'QL_USER',
    'QL_PHIEU_THU',
    'XEM_BAO_CAO',
    'XEM_CONG_NO'
]

const RoleCards = () => {
    const dispatch = useDispatch()
    // ** States
    const [show, setShow] = useState(false)
    const [modalType, setModalType] = useState('Thêm mới')

    const [refreshData, setRefreshData] = useState(false)

    //modal add new user
    const [showAddUserToRole, setShowAddUserToRole] = useState(false)

    const storeRoles = useSelector(state => state.role)
    console.log('storeRoles:', storeRoles)
    useEffect(() => {
        console.log('useEffect:')
        dispatch(getListRoles({
            page: 0,
            perPage: 100,
            q: ''
        }))
    }, [dispatch, refreshData])
    // ** Hooks
    const {
        reset,
        control,
        setError,
        setValue,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues: {roleName: ''}})
    const dataToRender =
        () => {
            return storeRoles.data
        }
    const onSubmit = data => {
        if (data.roleName.length) {
            setShow(false)
            dispatch(createData({
                name: data.roleName
            })).then(() => {
                setRefreshData(!refreshData)
            })

        } else {
            setError('roleName', {
                type: 'manual'
            })
        }
    }
    const handleDelete = (uuid) => {
        dispatch(deleteData(uuid)).then((() => {
            setRefreshData(!refreshData)
        }))

    }

    const onReset = () => {
        setShow(false)
        reset({roleName: ''})
    }

    const handleModalClosed = () => {
        setModalType('Thêm mới')
        setValue('roleName')
    }

    const handleAddUserToRole = (role) => {
        console.log('role:', role)
        setShowAddUserToRole(true)
    }
    return (
        <Fragment>
            <Row>
                {dataToRender().map((item, index) => {
                    return (
                        <Col key={index} xl={4} md={6}>
                            <Card>
                                <CardBody>
                                    {/*<div className='d-flex justify-content-between'>*/}
                                    {/*    <span>{`Total ${item.totalUsers} users`}</span>*/}
                                    {/*    <AvatarGroup data={item.users}/>*/}
                                    {/*</div>*/}
                                    <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>

                                        <div className='role-heading'>
                                            <h4 className='fw-bolder'>{item.name}</h4>
                                            <Link
                                                to='/'
                                                className='role-edit-modal'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setModalType('Edit')
                                                    setShow(true)
                                                }}
                                            >
                                                <small className='fw-bolder'>Sửa vai trò</small>
                                            </Link>
                                        </div>
                                        <Link to='' className='text-body' onClick={e => e.preventDefault()}>
                                            <Copy className='font-medium-5'/>
                                        </Link>
                                        <Button type='reset' color='secondary' outline
                                                onClick={() => handleDelete(item.uuid)}>
                                            Xóa
                                        </Button>
                                        <Button type='submit' color='primary' outline
                                                onClick={() => handleAddUserToRole(item)}>
                                            Thêm tài khoản tới vài trò
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}
                <Col xl={4} md={6}>
                    <Card>
                        <Row>
                            <Col sm={5}>
                                <div className='d-flex align-items-end justify-content-center h-100'>
                                    <img className='img-fluid mt-2' src={illustration} alt='Image' width={85}/>
                                </div>
                            </Col>
                            <Col sm={7}>
                                <CardBody className='text-sm-end text-center ps-sm-0'>
                                    <Button
                                        color='primary'
                                        className='text-nowrap mb-1'
                                        onClick={() => {
                                            setModalType('Add new')
                                            setShow(true)
                                        }}
                                    >
                                        Thêm role mới
                                    </Button>
                                    <p className='mb-0'>Add a new role, if it does not exist</p>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Modal
                isOpen={show}
                onClosed={handleModalClosed}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-5 pb-5'>
                    <div className='text-center mb-4'>
                        <h1>{modalType} role</h1>
                        <p>Thiết lập phân quyền</p>
                    </div>
                    <Row tag='form' onSubmit={handleSubmit(onSubmit)}>
                        <Col xs={12}>
                            <Label className='form-label' for='roleName'>
                                Tên vai trò
                            </Label>
                            <Controller
                                name='roleName'
                                control={control}
                                render={({field}) => (
                                    <Input {...field} id='roleName' placeholder='Enter role name'
                                           invalid={errors.roleName && true}/>
                                )}
                            />
                            {errors.roleName && <FormFeedback>Please enter a valid role name</FormFeedback>}
                        </Col>
                        <Col xs={12}>
                            <h4 className='mt-2 pt-50'>Vai trò - Phân Quyền</h4>
                            <Table className='table-flush-spacing' responsive>
                                <tbody>
                                <tr>
                                    <td className='text-nowrap fw-bolder'>
                                        <span className='me-50'> QUẢN TRỊ VIÊN </span>
                                        <Info size={14} id='info-tooltip'/>
                                        <UncontrolledTooltip placement='top' target='info-tooltip'>
                                            Allows a full access to the system
                                        </UncontrolledTooltip>
                                    </td>
                                    <td>
                                        <div className='form-check'>
                                            <Input type='checkbox' id='select-all'/>
                                            <Label className='form-check-label' for='select-all'>
                                                Tất cả
                                            </Label>
                                        </div>
                                    </td>
                                </tr>
                                {rolesArr.map((role, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-nowrap fw-bolder'>{role}</td>
                                            <td>
                                                <div className='d-flex'>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input type='checkbox' id={`read-${role}`}/>
                                                        <Label className='form-check-label' for={`read-${role}`}>
                                                            Cho phép
                                                        </Label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className='text-center mt-2' xs={12}>
                            <Button type='submit' color='primary' className='me-1'>
                                Submit
                            </Button>
                            <Button type='reset' outline onClick={onReset}>
                                Discard
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <AssignUserToRoleModal show={showAddUserToRole} />
        </Fragment>
    )
}

export default RoleCards
