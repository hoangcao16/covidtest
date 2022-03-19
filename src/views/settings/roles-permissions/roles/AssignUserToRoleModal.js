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

// ** FAQ Illustrations

import {useDispatch, useSelector} from "react-redux"
import Select from "react-select"
import classnames from "classnames"
import {selectThemeColors} from '@utils'
import {getList} from "../../../../redux/account"
import {assignedTo} from "../../../../redux/role"

const AssignUserToRoleModal = ({show, roleUuid}) => {
    const dispatch = useDispatch()
    // ** States
    const [data] = useState(null)
    const [showAddUserToRole, setShowAddUserToRole] = useState(false)
    const [modalAddUserToRoleType] = useState('Gán user')
    const [accountOptions, setAccountOptions] = useState([])

    const store = useSelector(state => state.account)
    console.log('AssignUserToRoleModal:', store)
    useEffect(() => {
        setShowAddUserToRole(show)
    }, [show])
    useEffect(() => {
        dispatch(getList({page: 0, perPage: 40, q: ''})).then(() => {
            console.log('get:', store.allData)
            const options = store.allData.map((account) => ({
                label: account.name,
                value: account.uuid
            }))
            console.log('get:1', options)
            setAccountOptions(options)
        })
    }, [dispatch])

    // ** Hooks
    const {
        reset,
        control,
        handleSubmit
    } = useForm({defaultValues: {roleName: ''}})

    const onResetAddNewToRole = () => {
        reset({roleName: ''})
    }
    const onAddUserToRole = (data, e) => {
        e.preventDefault()
        console.log('onAddUserToRole:', data, e)
        const user_uuids = []
        data.accounts?.forEach(item => {
            user_uuids.push(item.value)
        })
        dispatch(assignedTo({
            role_uuid: roleUuid,
            user_uuids
        })).then(() => {
            const options = store.allData.map((account) => ({
                label: account.name,
                value: account.uuid
            }))
            setAccountOptions(options)
        })
    }

    const searchUsers = (query) => {
        console.log('searchUsers:user:', query)
        dispatch(getList({page: 0, perPage: 40, q: query})).then(() => {
            const options = store.allData.map((account) => ({
                label: account.name,
                value: account.uuid
            }))
            setAccountOptions(options)
        })
    }

    const renderModalAssignUserToRole = (role) => {
        const name = role?.name
        return (
            <Modal
                isOpen={showAddUserToRole}
                toggle={() => setShowAddUserToRole(!showAddUserToRole)}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent'
                             toggle={() => setShowAddUserToRole(!showAddUserToRole)}></ModalHeader>
                <ModalBody className='px-5 pb-5'>
                    <div className='text-center mb-4'>
                        <h1>{modalAddUserToRoleType} tới {name}</h1>
                        <p>Thêm users tới vai trò</p>
                    </div>
                    <Row tag='form' onSubmit={
                        handleSubmit(onAddUserToRole)
                    }>
                        <Col xs={12}>
                            <div className='mb-1'>
                                <Label className='form-label' for='patient'>
                                    Chọn tài khoản <span className='text-danger'>*</span>
                                </Label>
                                <Controller
                                    rules={
                                        {
                                            // required: true,
                                        }
                                    }
                                    name='accounts'
                                    control={control}
                                    render={({field}) => (
                                        // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                                        <Select
                                            isClearable={false}
                                            isMulti
                                            onInputChange={(value) => searchUsers(value)}
                                            classNamePrefix='select'
                                            options={accountOptions}
                                            theme={selectThemeColors}
                                            className={classnames('react-select', {
                                                'is-invalid': data !== null && data.value === null
                                            })}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        </Col>

                        <Col className='text-center mt-2' xs={12}>
                            <Button color='primary' className='me-1'>
                                Submit
                            </Button>
                            <Button type='reset' outline onClick={onResetAddNewToRole}>
                                Discard
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }
    return (
        <Fragment>
            {renderModalAssignUserToRole()}
        </Fragment>
    )
}

export default AssignUserToRoleModal
