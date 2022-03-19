/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { useEffect, useState } from 'react'
import { selectThemeColors } from '@utils'
import Select from 'react-select'

// ** Third Party Components
import { User, Mail, Lock, X, Smartphone } from 'react-feather'

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { accountService } from '../../../services/accountService'
import { staffService } from '../../../services/staffService'

const EditModal = ({ open, item, handleModal, setRefreshTable }) => {
  console.log('item:', item)
  // ** State
  const [name, setName] = useState(item?.name)
  const [email, setEmail] = useState(item?.email)
  const [password, setPassword] = useState(item?.password)
  const [phone, setPhone] = useState(item?.phone)
  const [staff, setStaff] = useState()
  const [staffOptions, setStaffOptions] = useState([])

  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  useEffect(() => {
    staffService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((staff) => ({
          label: staff.name,
          value: staff.uuid,
        }))
        setStaffOptions(options)
      }
    })
  }, [])
  useEffect(() => {
    if (item?.staffUuid) {
      staffService.get(item?.staffUuid).then((res) => {
        if (res.data.payload !== null) {
          const data = {
            label: res.data.payload.name,
            value: res.data.payload.uuid,
          }
          setStaff(data)
        }
      })
    }
    setName(item?.name)
    setEmail(item?.email)
    setPassword(item?.password)
    setPhone(item?.phone)
  }, [item])
  const handleSubmit = () => {
    console.log('handleSubmit:', name, email, password, phone)
    accountService
      .update(item.uuid, {
        name,
        email,
        password,
        phone,
        staffUuid: staff?.value,
      })
      .then((r) => {
        console.log('handleSubmit:response:', r)
        handleModal()
        setRefreshTable()
      })
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader
        className='mb-1'
        toggle={handleModal}
        close={CloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>Edit Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Tên
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input
              name='name'
              type='text'
              placeholder={item?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='email'>
            Email
          </Label>
          <InputGroup>
            <InputGroupText>
              <Mail size={15} />
            </InputGroupText>
            <Input
              name='email'
              type='email'
              //   placeholder={item.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password
          </Label>
          <InputGroup>
            <InputGroupText>
              <Lock size={15} />
            </InputGroupText>
            <Input
              name='password'
              type='password'
              placeholder={item?.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='phone'>
            Điện thoại
          </Label>
          <InputGroup>
            <InputGroupText>
              <Smartphone size={15} />
            </InputGroupText>
            <Input
              name='phone'
              type='number'
              placeholder={item?.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='staff'>
            Nhân viên *
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            options={staffOptions}
            theme={selectThemeColors}
            // placeholder='Chọn nhân viên'
            value={staff}
            onChange={(e) => setStaff(e)}
          />
        </div>
        <Button className='me-1' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
