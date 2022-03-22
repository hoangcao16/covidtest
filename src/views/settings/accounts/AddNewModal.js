/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { User, Mail, Lock, X, Smartphone } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

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

const AddNewModal = ({ open, handleModal, setRefreshTable }) => {
  // ** State
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [phone, setPhone] = useState()
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
  const handleSubmit = () => {
    accountService
      .create({
        name,
        email,
        password,
        phone,
        staffUuid: staff?.value,
      })
      .then((r) => {
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
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='code'>
            Tên
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input
              id='full-name'
              placeholder='HSTC'
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Email
          </Label>
          <InputGroup>
            <InputGroupText>
              <Mail size={15} />
            </InputGroupText>
            <Input
              id='email'
              placeholder='tupa@hstc.com.vn'
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
              id='password'
              placeholder='Abc12345'
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
              id='number'
              placeholder='0944148495'
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='phone'>
            Nhân viên *
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            options={staffOptions}
            theme={selectThemeColors}
            placeholder='Chọn nhân viên'
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

export default AddNewModal
