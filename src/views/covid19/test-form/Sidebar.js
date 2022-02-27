/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import { useState } from 'react'
// ** Custom Components
import Sidebar from '../../components/sidebar'
import { StyledSidebar } from './style'
// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker'
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from 'reactstrap'
import moment from 'moment'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
}

const countryOptions = [
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Korea', value: 'Korea' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Russia', value: 'Russia' },
  { label: 'South', value: 'South' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' },
]
const statusOptions = [
  {
    label: 'Chưa đóng tiền',
    value: 'NOT_PAID',
  },
  {
    label: 'Đã đóng tiền',
    value: 'PAID',
  },
  {
    label: 'Treo công nợ',
    value: 'DEBT',
  },
  {
    label: 'Chờ lấy mẫu',
    value: 'WAITING_TAKEN_SAMPLE',
  },
  {
    label: 'Đã lấy mẫu',
    value: 'TAKEN_SAMPLE',
  },
  {
    label: 'Đủ mẫu',
    value: 'ENOUGH_SAMPLE',
  },
  {
    label: 'Không đủ mẫu',
    value: 'NOT_ENOUGH_SAMPLE',
  },
  {
    label: 'Có kết quả',
    value: 'RETURN_RESULT',
  },
  {
    label: 'Đã trả kết quả',
    value: 'COMPLETED',
  },
]
const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === 'object' ? field !== null : field.length > 0
  )
}

const SidebarNewTestForm = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')
  const [performTime, setPerformTime] = useState(moment())
  const [receiveSampleTime, setReceiveSampleTime] = useState(moment())
  const [returnTime, setReturnTime] = useState(moment())
  const [takeSampleTime, setTakeSampleTime] = useState(moment())
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = (data) => {
    console.log(data)
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  return (
    <StyledSidebar
      size='lg'
      open={open}
      title='Thêm phiếu xét nghiệm'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='testtype'>
            Yêu cầu xét nghiệm <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='testtype'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.country === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='patient'>
            Chọn khách hàng <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='patient'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.country === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='amount'>
                Giá tiền <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='amount'
                control={control}
                render={({ field }) => (
                  <Input
                    id='amount'
                    placeholder='John Doe'
                    invalid={errors.amount && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='technicaltype'>
                Kỹ thuật xét nghiệm <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='technicaltype'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='company'>
                Đơn vị gửi mẫu <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='company'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='shift'>
                Ca <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='shift'
                control={control}
                render={({ field }) => (
                  <Input
                    id='shift'
                    placeholder='John Doe'
                    invalid={errors.shift && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='sampletype'>
                Mẫu bệnh phẩm <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='sampletype'
                control={control}
                render={({ field }) => (
                  <Input
                    id='sampletype'
                    placeholder='John Doe'
                    invalid={errors.sampletype && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='result'>
                Kết quả <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='result'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='sampleNumber'>
                Số lần lấy mẫu <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='sampleNumber'
                control={control}
                render={({ field }) => (
                  <Input
                    id='sampleNumber'
                    placeholder='1'
                    invalid={errors.sampleNumber && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='diagnosis'>
                Kết luận <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='diagnosis'
                control={control}
                render={({ field }) => (
                  <Input
                    id='diagnosis'
                    placeholder='John Doe'
                    invalid={errors.diagnosis && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='takeSampleTime'>
                Thời gian lấy mẫu <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='takeSampleTime'
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    className='date-picker'
                    dayPlaceholder='DD'
                    hourPlaceholder='hh'
                    minutePlaceholder='mm'
                    monthPlaceholder='MM'
                    yearPlaceholder='YYYY'
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='diagnosisEng'>
                Kết luận tiếng anh <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='diagnosisEng'
                control={control}
                render={({ field }) => (
                  <Input
                    id='diagnosisEng'
                    placeholder='Negative'
                    invalid={errors.diagnosisEng && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='receiveSampleTime'>
                Thời gian nhận mẫu <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='receiveSampleTime'
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    className='date-picker'
                    dayPlaceholder='DD'
                    hourPlaceholder='hh'
                    minutePlaceholder='mm'
                    monthPlaceholder='MM'
                    yearPlaceholder='YYYY'
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='performTime'>
                Thời gian thực hiện <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='performTime'
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    className='date-picker'
                    dayPlaceholder='DD'
                    hourPlaceholder='hh'
                    minutePlaceholder='mm'
                    monthPlaceholder='MM'
                    yearPlaceholder='YYYY'
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='sampleState'>
                Tình trạng mẫu<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='sampleState'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='state'>
                Trạng thái <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={statusOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='staffUuid1'>
                Người lấy mẫu<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='staffUuid1'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='returnTime'>
                Ngày trả kết quả <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='returnTime'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <DateTimePicker
                    {...field}
                    className='date-picker'
                    dayPlaceholder='DD'
                    hourPlaceholder='hh'
                    minutePlaceholder='mm'
                    monthPlaceholder='MM'
                    yearPlaceholder='YYYY'
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='staffUuid3'>
                Người ký phiếu<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='staffUuid3'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='staffUuid2'>
                Người thực hiện <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='staffUuid2'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='payerUuid'>
                Người nộp tiền<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='payerUuid'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='staffUuid4'>
                Người lập phiếu <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='staffUuid4'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={countryOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.country === null,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </StyledSidebar>
  )
}

export default SidebarNewTestForm
