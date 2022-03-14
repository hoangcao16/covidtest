/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import { useState, useEffect } from 'react'
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
  Form,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { testTypeService } from '../../../services/testTypeService'
import { useForm, Controller } from 'react-hook-form'
import { Slide, toast } from 'react-toastify'
// import MixTestType from "./MixTestType"

const defaultValues = {
  code: '',
  name: '',
  basePrice: '',
  mix: [],
  sum2: '2',
  sum3: '3',
  sum4: '4',
  sum5: '5',
  sum6: '6',
  sum7: '7',
  sum8: '8',
  sum9: '9',
  sum10: '10',
  price2: null,
  price3: null,
  price4: null,
  price5: null,
  price6: null,
  price7: null,
  price8: null,
  price9: null,
  price10: null,
  getSampleAtHomePrice: '',
}

const EditModal = ({ open, selecteditem, handleModal, setRefreshTable }) => {
  // ** State
  // const [code, setCode] = useState()
  // const [description, setDescription] = useState()
  const [totalSumary, setTotalSumary] = useState([])
  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues })
  useEffect(() => {
    console.log('selecteditem:', selecteditem)
    const dataForm = {
      code: selecteditem?.code,
      name: selecteditem?.name,
      basePrice: selecteditem?.price,
      getSampleAtHomePrice: selecteditem?.getSampleAtHomePrice,
      sum2: selecteditem?.groupPrices?.find((x) => x.quantity === 2)?.quantity,
      sum3: selecteditem?.groupPrices?.find((x) => x.quantity === 3)?.quantity,
      sum4: selecteditem?.groupPrices?.find((x) => x.quantity === 4)?.quantity,
      sum5: selecteditem?.groupPrices?.find((x) => x.quantity === 5)?.quantity,
      sum6: selecteditem?.groupPrices?.find((x) => x.quantity === 6)?.quantity,
      sum7: selecteditem?.groupPrices?.find((x) => x.quantity === 7)?.quantity,
      sum8: selecteditem?.groupPrices?.find((x) => x.quantity === 8)?.quantity,
      sum9: selecteditem?.groupPrices?.find((x) => x.quantity === 9)?.quantity,
      sum10: selecteditem?.groupPrices?.find((x) => x.quantity === 10)
        ?.quantity,
      price2: selecteditem?.groupPrices?.find((x) => x.quantity === 2)?.price,
      price3: selecteditem?.groupPrices?.find((x) => x.quantity === 3)?.price,
      price4: selecteditem?.groupPrices?.find((x) => x.quantity === 4)?.price,
      price5: selecteditem?.groupPrices?.find((x) => x.quantity === 5)?.price,
      price6: selecteditem?.groupPrices?.find((x) => x.quantity === 6)?.price,
      price7: selecteditem?.groupPrices?.find((x) => x.quantity === 7)?.price,
      price8: selecteditem?.groupPrices?.find((x) => x.quantity === 8)?.price,
      price9: selecteditem?.groupPrices?.find((x) => x.quantity === 9)?.price,
      price10: selecteditem?.groupPrices?.find((x) => x.quantity === 10)?.price,
    }
    for (const key in dataForm) {
      setValue(key, dataForm[key])
    }
  }, [selecteditem])
  const add = () => {
    setTotalSumary((prevState) => [...prevState, { sum: '', price: '' }])
  }
  const remove = () => {
    setTotalSumary((prevState) => prevState.slice(0, -1))
  }
  // }
  //   console.log(totalSumary)
  const onSubmit = (data) => {
    const dataSend = {
      code: data.code,
      name: data.name,
      price: parseFloat(data.basePrice),
      getSampleAtHomePrice: parseFloat(data.getSampleAtHomePrice),
      groupPrices: [],
    }
    if (data.price2 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum2),
        price: parseFloat(data.price2),
      })
    }
    if (data.price3 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum3),
        price: parseFloat(data.price3),
      })
    }
    if (data.price4 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum4),
        price: parseFloat(data.price4),
      })
    }
    if (data.price5 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum5),
        price: parseFloat(data.price5),
      })
    }
    if (data.price6 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum6),
        price: parseFloat(data.price6),
      })
    }
    if (data.price7 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum7),
        price: parseFloat(data.price7),
      })
    }
    if (data.price8 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum8),
        price: parseFloat(data.price8),
      })
    }
    if (data.price9 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum9),
        price: parseFloat(data.price9),
      })
    }
    if (data.price10 !== 0) {
      dataSend.groupPrices.push({
        quantity: parseFloat(data.sum10),
        price: parseFloat(data.price10),
      })
    }

    console.log('dataSend:', data)
    console.log('dataSend:', dataSend)
    testTypeService
      .edit(selecteditem.uuid, dataSend)
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
      className='sidebar-lg'
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='code'>
              Mã code
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                rules={{
                  required: true,
                }}
                name='code'
                control={control}
                render={({ field }) => (
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
                <User size={15} />
              </InputGroupText>
              <Controller
                rules={{
                  required: true,
                }}
                name='name'
                control={control}
                render={({ field }) => (
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
                <User size={15} />
              </InputGroupText>
              <Controller
                rules={{
                  required: true,
                }}
                name='basePrice'
                control={control}
                render={({ field }) => (
                  <Input
                    id='basePrice'
                    placeholder='500.000 VND'
                    invalid={errors.basePrice && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='getSampleAtHomePrice'>
              Phí lấy mẫu tại nhà
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                rules={{
                  required: true,
                }}
                name='getSampleAtHomePrice'
                control={control}
                render={({ field }) => (
                  <Input
                    id='getSampleAtHomePrice'
                    placeholder='500.000 VND'
                    invalid={errors.getSampleAtHomePrice && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <div className='d-flex justify-content-between'>
              <Label className='form-label me-1' for='basePrice'>
                Giá gộp
              </Label>
              {/* <div>
                <Button
                  className='me-1'
                  color='primary'
                  type='button'
                  size='sm'
                  onClick={add}
                >
                  +
                </Button>
                <Button
                  className='me-1'
                  color='danger'
                  type='button'
                  size='sm'
                  onClick={remove}
                >
                  -
                </Button>
              </div> */}
            </div>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum2`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum2`}
                    placeholder='2'
                    invalid={errors.sum2 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price2`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price2`}
                    placeholder='500.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum3`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum3`}
                    placeholder='3'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price3`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price3`}
                    placeholder='500.000 VND'
                    invalid={errors.sum3 && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum4`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum4`}
                    placeholder='4'
                    invalid={errors.sum4 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price4`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price4`}
                    placeholder='500.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum5`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum5`}
                    placeholder='5'
                    invalid={errors.sum5 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price5`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price5`}
                    placeholder='500.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum6`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum6`}
                    placeholder='6'
                    invalid={errors.sum6 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price6`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price6`}
                    placeholder='600.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum7`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum7`}
                    placeholder='7'
                    invalid={errors.sum5 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price7`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price7`}
                    placeholder='700.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum8`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum8`}
                    placeholder='8'
                    invalid={errors.sum8 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price8`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price8`}
                    placeholder='800.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum9`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum9`}
                    placeholder='9'
                    invalid={errors.sum9 && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price9`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price5`}
                    placeholder='900.000 VND'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <InputGroup>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`sum10`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`sum10`}
                    placeholder='9'
                    invalid={errors.code && true}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name={`price10`}
                control={control}
                render={({ field }) => (
                  <Input
                    id={`price10`}
                    placeholder='1000.000 VND'
                    invalid={errors.price10 && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div>{/*<MixTestType mixArr={mix}/>*/}</div>
          <Button className='me-1' color='primary' type='submit'>
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

export default EditModal
