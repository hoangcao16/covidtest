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
import toVND from '../../components/common/toVND'
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
import { patientService } from '../../../services/patientService'
import { staffService } from '../../../services/staffService'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
const defaultValues = {
  agencyUuid1: '',
  agencyUuid2: '',
  amount: '',
  diagnosis: 'Âm tính',
  diagnosisEng: 'Negative',
  inWords: '',
  labResultUuid: '',
  patient: [],
  payFor: '',
  payerUuid: '',
  performTime: moment(),
  receiveSampleTime: moment(),
  returnTime: moment(),
  sampleNumber: 1,
  sampleState: true,
  sampletype: [],
  staffUuid1: '',
  staffUuid2: '',
  staffUuid3: '',
  staffUuid4: '',
  state: 'NOT_PAID',
  takeSampleTime: moment(),
  technicaltype: {},
  testNumber: 1,
  testtype: {},
  shift: 'Ca 1',
  note: '',
}

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
const samplestateOptions = [
  {
    label: 'Đủ mẫu',
    value: true,
  },
  {
    label: 'Không đủ mẫu',
    value: false,
  },
]

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
  const [patientsOptions, setPatientsOptions] = useState([])
  const [staffOptions, setStaffOptions] = useState([])
  // ** Store Vars
  const dispatch = useDispatch()
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
    staffService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((staff) => ({
          label: staff.name,
          value: staff.uuid,
        }))
        setStaffOptions(options)
      }
    })
  }, [])
  // ** Function to handle form submit
  const onSubmit = (data) => {
    console.log(data)
    const newData = {
      agencyUuid1: data.agencyUuid1.value,
      agencyUuid2: data.agencyUuid1.value,
      amount: Number(data.amount),
      diagnosis: data.diagnosis,
      diagnosisEng: data.diagnosisEng,
      inWords: to_vietnamese(data.amount),
      labResultUuid: data.labResultUuid.value,
      patientUuids: data?.patient?.map((p) => p.value),
      payFor: data.testtype.label,
      payerUuid: data.payerUuid.value,
      performTime: moment(data.performTime).valueOf(),
      receiveSampleTime: moment(data.receiveSampleTime).valueOf(),
      returnTime: moment(data.returnTime).valueOf(),
      sampleNumber: Number(data.sampleNumber),
      sampleState: data.sampleState.value,
      sampleTypeUuid: data.sampletype[0].value,
      staffUuid1: data?.staffUuid1?.value,
      staffUuid2: data?.staffUuid2?.value,
      staffUuid3: data?.staffUuid3?.value,
      staffUuid4: data?.staffUuid4?.value,
      state: data.state.value,
      takeSampleTime: moment(data.takeSampleTime).valueOf(),
      technicalUuid: data.technicaltype.value,
      testNumber: 1,
      testTypeUuid: data.testtype.value,
      shift: data.shift,
      note: data.note,
    }
    console.log(newData)
    analysisCertificateService.add(newData).then((res) => {
      if (res.data.code === 600) {
        alert('Thêm mới thành công')
      }
    })
    for (const key in defaultValues) {
      setValue(key, defaultValues[key])
    }
  }
  const searchPatients = (query) => {
    patientService.list({ page: 1, perPage: 40, q: query }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((patient) => ({
          label: patient.name,
          value: patient.uuid,
        }))
        setPatientsOptions(options)
      }
    })
  }
  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, defaultValues[key])
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
                  'is-invalid': data !== null && data.value === null,
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
                isMulti
                onInputChange={(value) => searchPatients(value)}
                classNamePrefix='select'
                options={patientsOptions}
                theme={selectThemeColors}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.value === null,
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
                    placeholder='50000'
                    // invalid={errors.amount && true}
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
                      'is-invalid': data !== null && data.value === null,
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
                      'is-invalid': data !== null && data.value === null,
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
              <Label className='form-label' for='labResultUuid'>
                Kết quả <span className='text-danger'>*</span>
              </Label>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='labResultUuid'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={labResultTypeOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
                    options={samplestateOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
                    options={staffOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
                    options={staffOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
                    options={staffOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
                    onInputChange={(value) => searchPatients(value)}
                    classNamePrefix='select'
                    options={patientsOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
                    options={staffOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': data !== null && data.value === null,
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
              <Label className='form-label' for='note'>
                Ghi chú <span className='text-danger'>*</span>
              </Label>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='note'
                control={control}
                render={({ field }) => (
                  <Input id='note' invalid={errors.note && true} {...field} />
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
