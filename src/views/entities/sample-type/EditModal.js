/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { Briefcase, X } from 'react-feather'

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
import { Slide, toast } from 'react-toastify'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { sampleTypeService } from '../../../services/sampleTypeService'

const EditModal = ({ open, selecteditem, handleModal, setRefreshTable }) => {
  // ** State
  const [description, setDescription] = useState()
  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  useEffect(() => {
    if (selecteditem.name) {
      setDescription(selecteditem.name)
    }
    return () => {
      setDescription()
    }
  }, [selecteditem])
  const handleSubmit = () => {
    console.log('handleSubmit:', description)
    sampleTypeService
      .edit(selecteditem.uuid, {
        name: description,
      })
      .then((r) => {
        console.log('handleSubmit:response:', r)
        handleModal()
        setRefreshTable()
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
      })
      .catch((err) => {
        toast.error('Cập nhật thất bại!', {
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
        <h5 className='modal-title'>Sửa mẫu bệnh phẩm</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
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
              placeholder='Dịch tỵ Hầu'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>
        </div>
        <Button className='me-1' color='primary' onClick={handleSubmit}>
          Xác nhận
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Hủy
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
