// ** React Imports
import {useState} from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {User, Briefcase, Mail, Calendar, Lock, X, Compass, Smartphone} from 'react-feather'

// ** Reactstrap Imports
import {Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {patientService} from "../../../services/patientService"
import moment from 'moment'

const AddNewModal = ({open, handleModal, setRefreshTable}) => {
    // ** State
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const [identityNumber, setIdentityNumber] = useState()
    const [picker, setPicker] = useState(new Date())
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>
    const handleSubmit = () => {
        console.log('handleSubmit:', name, email, phone, address, identityNumber, picker)
        patientService.create({
            name,
            email,
            phone,
            identityNumber,
            address,
            dateOfBirth: moment(picker.getTime(), 'DD-MM-YYYY')
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
                <h5 className='modal-title'>New Record</h5>
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
                        <Input id='name' placeholder='Phùng Anh Tú' onChange={e => setName(e.target.value)}/>
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
                        <Input id='number' placeholder='0944148495'
                               onChange={e => setPhone(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='address'>
                        Địa chỉ
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <User size={15}/>
                        </InputGroupText>
                        <Input id='address' placeholder='146 Đội Cấn' onChange={e => setAddress(e.target.value)}/>
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
                        <Input id='email' placeholder='tupa@hstc.com.vn'
                               onChange={e => setEmail(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='identityNumber'>
                        CMND/CCCD
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Mail size={15}/>
                        </InputGroupText>
                        <Input id='identityNumber' placeholder='1435434344545'
                               onChange={e => setIdentityNumber(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='dateOfBirth'>
                        Ngày sinh
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Lock size={15}/>
                        </InputGroupText>
                        <Flatpickr
                            value={picker}
                            id='hf-picker'
                            className='form-control'
                            onChange={date => setPicker(date)}
                            options={{
                                altInput: true,
                                dateFormat: 'd-m-Y'

                            }}
                        />
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='gender'>
                        Giới tính
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Lock size={15}/>
                        </InputGroupText>

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
