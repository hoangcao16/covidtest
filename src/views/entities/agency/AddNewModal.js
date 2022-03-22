/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { User, Briefcase, X } from 'react-feather'

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
import { agencyService } from '../../../services/agencyService'
import { Radio } from 'antd'
import { Slide, toast } from 'react-toastify'

const AddNewModal = ({ open, handleModal, setRefreshTable }) => {
  // ** State
  const [code, setCode] = useState()
  const [description, setDescription] = useState()
  const [type, setType] = useState()
  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  const handleSubmit = () => {
    agencyService
      .create({
        code,
        name: description,
        type,
      })
      .then((r) => {
        handleModal()
        setRefreshTable()
      })
      .then(() => {
        toast.success('Thêm mới đơn vị thành công !', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Slide,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
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
            Mã code
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input
              id='full-name'
              placeholder='HSTC'
              onChange={(e) => setCode(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Mô tả
          </Label>
          <InputGroup>
            <InputGroupText>
              <Briefcase size={15} />
            </InputGroupText>
            <Input
              id='description'
              placeholder='Trung tâm xét nghiệm công nghệ cao HSTC'
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Thuộc loại đơn vi:
          </Label>
          <InputGroup>
            <Radio.Group
              value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
              name='type'
            >
              <Radio value={0}>Đơn vị trong</Radio>
              <Radio value={1}>Đơn vị ngoài</Radio>
            </Radio.Group>
          </InputGroup>
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
