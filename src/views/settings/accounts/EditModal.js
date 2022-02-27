// ** React Imports
import {useState} from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {User, Briefcase, Mail, Calendar, Lock, X, Compass, Smartphone} from 'react-feather'

// ** Reactstrap Imports
import {Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {accountService} from "../../../services/accountService"

const EditModal = ({open, item, handleModal, setRefreshTable}) => {
    console.log('item:', item)
    // ** State
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>
    const handleSubmit = () => {
        console.log('handleSubmit:', name, email, password, phone)
        accountService.update(item.uuid, {
            name,
            email,
            password,
            phone
        }).then(r => {
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
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Edit Record</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <div className='mb-1'>
                    <Label className='form-label' for='name'>
                        Tên
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <User size={15}/>
                        </InputGroupText>
                        <Input name='name'
                               type='text'
                               placeholder={item.name}
                               onChange={e => setName(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='email'>
                        Email
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Mail size={15}/>
                        </InputGroupText>
                        <Input name='email' placeholder='tupa@hstc.com.vn'
                               type='email'
                               placeholder={item.email}
                               onChange={e => setEmail(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='password'>
                        Password
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Lock size={15}/>
                        </InputGroupText>
                        <Input name='password'
                               type='password'
                               placeholder='Abc12345'
                               onChange={e => setPassword(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='phone'>
                        Điện thoại
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Smartphone size={15}/>
                        </InputGroupText>
                        <Input name='phone'
                               type='number'
                               placeholder={item.phone}
                               onChange={e => setPhone(e.target.value)}/>
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

export default EditModal
