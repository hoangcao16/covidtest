/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react'
// ** Custom Components
import { StyledSidebar } from './style'
// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
// ** Reactstrap Imports
import {
  Button,
  Label,
  FormText,
  Form,
  Input,
  Row,
  Col,
  FormGroup,
} from 'reactstrap'
import moment from 'moment'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch } from 'react-redux'
//Service
import { agencyService } from '../../../services/agencyService'
import { sampleTypeService } from '../../../services/sampleTypeService'
import { testTypeService } from '../../../services/testTypeService'
import { technicalTypeService } from '../../../services/technicalTypeService'
import { labResultTypesService } from '../../../services/labResultTypesService'
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
  const [agencyOptions, setAgencyOptions] = useState([])
  const [sampleTypeOptions, setSampleTypeOptions] = useState([])
  const [testTypeOptions, setTestTypeOptions] = useState([])
  const [technicalTypeOptions, setTechnicalTypeOptions] = useState([])
  const [labResultTypeOptions, setLabResultTypeOptions] = useState([])
  // ** Store Vars
  const dispatch = useDispatch()
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    },
  }
  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    agencyService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((agency) => ({
          label: agency.name,
          value: agency.uuid,
        }))
        setAgencyOptions(options)
      }
    })
    sampleTypeService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((sampleType) => ({
          label: sampleType.name,
          value: sampleType.uuid,
        }))
        setSampleTypeOptions(options)
      }
    })
    testTypeService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((testType) => ({
          label: testType.name,
          value: testType.uuid,
        }))
        setTestTypeOptions(options)
      }
    })
    technicalTypeService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((technicalType) => ({
          label: technicalType.name,
          value: technicalType.uuid,
        }))
        setTechnicalTypeOptions(options)
      }
    })
    labResultTypesService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((labResultType) => ({
          label: labResultType.name,
          value: labResultType.uuid,
        }))
        setLabResultTypeOptions(options)
      }
    })
  }, [])
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
  const Formcheckbox = () => {
    return <></>
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
            rules={
              {
                // required: true,
              }
            }
            name='testtype'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={testTypeOptions}
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
            rules={
              {
                // required: true,
              }
            }
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='technicaltype'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={technicalTypeOptions}
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
              <Label className='form-label' for='agencyUuid1'>
                Đơn vị gửi mẫu <span className='text-danger'>*</span>
              </Label>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='agencyUuid1'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={agencyOptions}
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='shift'
                control={control}
                render={({ field }) => (
                  <FormGroup {...field}>
                    <Input type='radio' name='chooseshift' value='Ca 1' />
                    <Label className='shiftRadio'>Ca 1</Label>
                    <Input type='radio' name='chooseshift' value='Ca 2' />
                    <Label className='shiftRadio'>Ca 2 </Label>
                    <Input type='radio' name='chooseshift' value='Ca 3' />
                    <Label className='shiftRadio'>Ca 3 </Label>
                  </FormGroup>
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <div className='mb-1 sampletype'>
              <Label className='form-label ' for='sampletype'>
                Mẫu bệnh phẩm <span className='text-danger'>*</span>
              </Label>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='sampletype'
                control={control}
                render={({ field }) => (
                  <ReactMultiSelectCheckboxes
                    options={sampleTypeOptions}
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='result'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={labResultTypeOptions}
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='sampleNumber'
                control={control}
                render={({ field }) => (
                  <Input
                    id='sampleNumber'
                    placeholder='1'
                    defaultValue='1'
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='diagnosis'
                control={control}
                render={({ field }) => (
                  <Input
                    id='diagnosis'
                    placeholder='John Doe'
                    invalid={errors.diagnosis && true}
                    defaultValue='Âm tính'
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='takeSampleTime'
                control={control}
                render={({ field }) => (
                  <input
                    type='datetime-local'
                    className='date-picker'
                    id='takeSampleTime'
                    name='takeSampleTime'
                    placeholder='Chọn thời gian'
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='diagnosisEng'
                control={control}
                render={({ field }) => (
                  <Input
                    id='diagnosisEng'
                    placeholder='Negative'
                    invalid={errors.diagnosisEng && true}
                    defaultValue='Negative'
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='receiveSampleTime'
                control={control}
                render={({ field }) => (
                  <input
                    type='datetime-local'
                    className='date-picker'
                    id='receiveSampleTime'
                    name='receiveSampleTime'
                    placeholder='Chọn thời gian'
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='performTime'
                control={control}
                render={({ field }) => (
                  <input
                    type='datetime-local'
                    className='date-picker'
                    id='performTime'
                    name='performTime'
                    placeholder='Chọn thời gian'
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
                name='returnTime'
                control={control}
                render={({ field }) => (
                  <input
                    type='datetime-local'
                    className='date-picker'
                    id='returnTime'
                    name='returnTime'
                    placeholder='Chọn thời gian'
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
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
                rules={
                  {
                    // required: true,
                  }
                }
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
