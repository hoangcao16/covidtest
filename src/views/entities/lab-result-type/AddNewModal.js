/* eslint-disable comma-dangle */
// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { User, X } from 'react-feather'
import { Slide, toast } from 'react-toastify'

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
import { labResultTypeService } from '../../../services/labResultTypeService'

const AddNewModal = ({ open, handleModal, setRefreshTable }) => {
  // ** State
  const [name, setName] = useState()
  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  const handleSubmit = () => {
    labResultTypeService
      .create({
        name,
      })
      .then((r) => {
        console.log('handleSubmit:response:', r)
        handleModal()
        setRefreshTable()
      })
      .then(() => {
        toast.success('Thêm mới loại kết quả thành công !', {
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
          <Label className='form-label' for='name'>
            Mã code
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input
              id='name'
              placeholder='Dương Tính'
              onChange={(e) => setName(e.target.value)}
            />
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
