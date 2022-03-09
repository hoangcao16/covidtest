/* eslint-disable comma-dangle */
import { StyledAddNewCard } from './style'
import { User, Mail, Lock, Smartphone } from 'react-feather'
import { toast, Slide } from 'react-toastify'

// ** Reactstrap Imports
import {
  Input,
  Label,
  Button,
  InputGroup,
  InputGroupText,
  Form,
  Row,
  Col,
  CardHeader,
  CardTitle,
} from 'reactstrap'

// ** Styles
import { patientService } from '../../../services/patientService'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import Select from 'react-select'
import classnames from 'classnames'

const defaultValues = {
  name: '',
  phone: '',
  address: '',
  email: '',
  identityNumber: '',
  dateOfBirth: moment().format('DD-MM-YYYY'),
  sex: { value: 0, label: 'Nam' },
}
const AddNewCard = ({ setRefreshTable }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })
  const onHandleSubmit = (data) => {
    patientService
      .create({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        identityNumber: data?.identityNumber,
        address: data?.address,
        dateOfBirth: data?.dateOfBirth,
        sex: data?.sex?.value,
      })
      .then((r) => {
        console.log('handleSubmit:response:', r)
        setRefreshTable()
      })
      .then(() => {
        toast.success('Thêm mới bệnh nhân thành công !', {
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

  const genderOptions = [
    {
      value: 0,
      label: 'Nam',
    },
    {
      value: 1,
      label: 'Nữ',
    },
  ]
  return (
    <StyledAddNewCard>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Thêm mới bệnh nhân</CardTitle>
      </CardHeader>
      <Form onSubmit={handleSubmit(onHandleSubmit)}>
        <Row>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='name'>
                Tên
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
                      placeholder='Phùng Anh Tú'
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='phone'>
                Điện thoại
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Smartphone size={15} />
                </InputGroupText>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='phone'
                      placeholder='0942225095'
                      invalid={errors.phone && true}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='address'>
                Địa chỉ
              </Label>
              <InputGroup>
                <InputGroupText>
                  <User size={15} />
                </InputGroupText>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='address'
                      placeholder='146 Đội Cấn'
                      invalid={errors.address && true}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='identityNumber'>
                CMND/CCCD
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Mail size={15} />
                </InputGroupText>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='identityNumber'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='identityNumber'
                      placeholder='1435434344545'
                      invalid={errors.identityNumber && true}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='email'>
                Email
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Mail size={15} />
                </InputGroupText>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='email'
                      placeholder='tupa@hstc.com.vn'
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='dateOfBirth'>
                Ngày sinh
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Lock size={15} />
                </InputGroupText>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='dateOfBirth'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='dateOfBirth'
                      placeholder='Ngày sinh'
                      invalid={errors.dateOfBirth && true}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={3}>
            <div className='mb-1'>
              <Label className='form-label' for='gender'>
                Giới tính
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Lock size={15} />
                </InputGroupText>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='sex'
                  control={control}
                  render={({ field }) => (
                    // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                    <Select
                      isClearable={false}
                      classNamePrefix='select'
                      options={genderOptions}
                      className={classnames('react-select', {
                        'is-invalid': errors.sex,
                      })}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={3} className='submit-btn'>
            <Button className='me-1' color='primary'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </StyledAddNewCard>
  )
}
export default AddNewCard
