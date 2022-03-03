// ** React Imports
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {User, Briefcase, Mail, Calendar, DollarSign, X} from 'react-feather'

// ** Reactstrap Imports
import {Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Form} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {testTypeService} from "../../../services/testTypeService"
import {useForm, Controller} from 'react-hook-form'
// import MixTestType from "./MixTestType"

const defaultValues = {
    code: '',
    name: '',
    basePrice: '',
    mix: []
}

const AddNewModal = ({open, handleModal, setRefreshTable}) => {
    // ** State
    // const [code, setCode] = useState()
    // const [description, setDescription] = useState()
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues})
    // const mix = [
    //     {
    //         number: 2,
    //         price: 880000
    //     },
    //     {
    //         number: 2,
    //         price: 880000
    //     }
    // ]
    const onSubmit = data => {
        console.log('handleSubmit:', data.code, data.name)
        testTypeService.create({
            code: data.code,
            name: data.name
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-1'>
                        <Label className='form-label' for='code'>
                            Mã code
                        </Label>
                        <InputGroup>
                            <InputGroupText>
                                <User size={15}/>
                            </InputGroupText>
                            <Controller
                                rules={
                                    {
                                        // required: true,
                                    }
                                }
                                name='code'
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id='code'
                                        placeholder='PCR'
                                        invalid={errors.code && true}
                                        {...field}
                                    />
                                )}
                            />
                            {/*<Input id='full-name' placeholder='PCR' onChange={e => setCode(e.target.value)}/>*/}
                        </InputGroup>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='name'>
                            Mô tả
                        </Label>
                        <InputGroup>
                            <InputGroupText>
                                <User size={15}/>
                            </InputGroupText>
                            <Controller
                                rules={
                                    {
                                        // required: true,
                                    }
                                }
                                name='name'
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id='name'
                                        placeholder='Realtime PCR'
                                        invalid={errors.name && true}
                                        {...field}
                                    />
                                )}
                            />
                        </InputGroup>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='basePrice'>
                            Đơn giá
                        </Label>
                        <InputGroup>
                            <InputGroupText>
                                <User size={15}/>
                            </InputGroupText>
                            <Controller
                                rules={
                                    {
                                        // required: true,
                                    }
                                }
                                name='basePrice'
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id='basePrice'
                                        placeholder='500.000 VND'
                                        invalid={errors.code && true}
                                        {...field}
                                    />
                                )}
                            />
                        </InputGroup>
                    </div>
                    <div>
                        {/*<MixTestType mixArr={mix}/>*/}
                    </div>
                    <Button className='me-1' color='primary' onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button color='secondary' onClick={handleModal} outline>
                        Cancel
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AddNewModal
