// ** React Imports
import {useState} from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {User, Briefcase, Mail, Calendar, DollarSign, X} from 'react-feather'

// ** Reactstrap Imports
import {Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {agencyService} from "../../../services/agencyService"

const AddNewModal = ({open, handleModal, refreshTable}) => {
    // ** State
    const [code, setCode] = useState()
    const [description, setDescription] = useState()
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>
    const handleSubmit = () => {
        console.log('handleSubmit:', code, description)
        agencyService.create({
            code,
            name: description
        }).then(r => {
            console.log('handleSubmit:response:', r)
            handleModal()
            refreshTable = !refreshTable
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
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>New Record</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <div className='mb-1'>
                    <Label className='form-label' for='code'>
                        Mã code
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <User size={15}/>
                        </InputGroupText>
                        <Input id='full-name' placeholder='HSTC' onChange={e => setCode(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='description'>
                        Mô tả
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Briefcase size={15}/>
                        </InputGroupText>
                        <Input id='description' placeholder='Trung tâm xét nghiệm công nghệ cao HSTC'
                               onChange={e => setDescription(e.target.value)}/>
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
