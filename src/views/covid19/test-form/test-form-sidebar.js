/* eslint-disable object-shorthand */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable semi */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import { useState, useEffect, useCallback } from 'react'
// ** Custom Components
import { StyledTestFormSidebar } from './style'
import { debounce } from 'lodash'
// ** Utils
import { selectThemeColors } from '@utils'
import { samplestateOptions, statusOptions } from './data'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import toVND from '../../components/common/toVND'
// ** Reactstrap Imports
import { Button, Label, Form, Input, Row, Col } from 'reactstrap'
import { refetchList, closeSidebar } from '../../../redux/analysisCertificate'
import moment from 'moment'
import { Radio, Checkbox } from 'antd'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
//Service
import { agencyService } from '../../../services/agencyService'
import { sampleTypeService } from '../../../services/sampleTypeService'
import { testTypeService } from '../../../services/testTypeService'
import { labResultTypeService } from '../../../services/labResultTypeService'
import { patientService } from '../../../services/patientService'
import { staffService } from '../../../services/staffService'
import { analysisCertificateService } from '../../../services/analysisCertificateCervice'
import { toast, Slide } from 'react-toastify'
import Card from '../../../@core/components/card-snippet'
import AddNewModal from '../../patients/patients/AddNewModal'
const defaultValues = {
  agencyUuid1: '',
  agencyUuid2: '',
  amount: '',
  diagnosis: 'Âm tính',
  diagnosisEng: 'Negative',
  inWords: '',
  labResultUuid: '',
  patients: [],
  payFor: '',
  payerUuid: '',
  performTime: moment().format('YYYY-DD-MMTHH:mm'),
  receiveSampleTime: moment().format('YYYY-DD-MMTHH:mm'),
  returnTime: moment().isBetween(
    moment().set({ hour: 23, minute: 1, second: 0 }),
    moment().set({ hour: 23, minute: 59, second: 59 })
  )
    ? moment()
        .add(1, 'd')
        .set({ hour: 15, minute: 0 })
        .format('YYYY-DD-MMTHH:mm')
    : moment().isBetween(
        moment().set({ hour: 0, minute: 0, second: 0 }),
        moment().set({ hour: 8, minute: 30, second: 59 })
      )
    ? moment().set({ hour: 15, minute: 0 }).format('YYYY-DD-MMTHH:mm')
    : moment().isBetween(
        moment().set({ hour: 8, minute: 31, second: 0 }),
        moment().set({ hour: 15, minute: 30, second: 59 })
      )
    ? moment().set({ hour: 21, minute: 0 }).format('YYYY-DD-MMTHH:mm')
    : moment().isBetween(
        moment().set({ hour: 15, minute: 31, second: 0 }),
        moment().set({ hour: 23, minute: 0, second: 59 })
      )
    ? moment()
        .add(1, 'd')
        .set({ hour: 7, minute: 0 })
        .format('YYYY-DD-MMTHH:mm')
    : '',
  sampleNumber: 1,
  sampleState: true,
  sampleType: '',
  staffUuid1: '',
  staffUuid2: '',
  staffUuid3: '',
  staffUuid4: '',
  state: 'NOT_PAID',
  takeSampleTime: moment().format('YYYY-DD-MMTHH:mm'),
  technicaltype: '',
  testNumber: 1,
  testtype: '',
  shift:
    moment().isBetween(
      moment().set({ hour: 23, minute: 1, second: 0 }),
      moment().set({ hour: 23, minute: 59, second: 59 })
    ) ||
    moment().isBetween(
      moment().set({ hour: 0, minute: 0, second: 0 }),
      moment().set({ hour: 8, minute: 30, second: 59 })
    )
      ? 'Ca 1'
      : moment().isBetween(
          moment().set({ hour: 8, minute: 31, second: 0 }),
          moment().set({ hour: 15, minute: 30, second: 59 })
        )
      ? 'Ca 2'
      : moment().isBetween(
          moment().set({ hour: 15, minute: 31, second: 0 }),
          moment().set({ hour: 23, minute: 0, second: 59 })
        )
      ? 'Ca 3'
      : '',
  note: '',
  ct: '',
  getSampleAtHome: false,
  getSampleAtHomePrice: '',
}

const SidebarNewTestForm = ({ openSideBar, toggleTestFormSidebar }) => {
  // ** States
  const [agencyOptions, setAgencyOptions] = useState([])
  const [sampleTypeOptions, setSampleTypeOptions] = useState([])
  const [testTypeOptions, setTestTypeOptions] = useState([])
  const [labResultTypeOptions, setLabResultTypeOptions] = useState([])
  const [patientsOptions, setPatientsOptions] = useState([])
  const [staffOptions, setStaffOptions] = useState([])
  const [modal, setModal] = useState(false)
  // const [refreshTable, setRefreshTable] = useState(false)

  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  // ** Store Vars
  const dispatch = useDispatch()
  // ** Vars
  const {
    control,
    setValue,
    getValues,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues })
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
      if (res.data.code === 600 && res.data.payload !== null) {
        const options = res.data.payload?.map((sampleType) => ({
          label: sampleType.name,
          value: sampleType.uuid,
        }))
        setSampleTypeOptions(options)
        // console.log(options)
        setValue('sampleType', options[0].value)
      }
    })
    testTypeService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((testType) => ({
          label: testType.name,
          value: testType.uuid,
          getSampleAtHomePrice: testType.getSampleAtHomePrice,
        }))
        setTestTypeOptions(options)
      }
    })
    labResultTypeService.list({ page: 1, perPage: 40, q: '' }).then((res) => {
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
  const filterOption = (option, inputValue) => {
    const { label, value, data } = option
    // looking if other options with same label are matching inputValue
    const otherKey = patientsOptions.filter(
      (opt) =>
        (opt.label === label && opt.value.includes(inputValue)) ||
        opt.phone.includes(inputValue) ||
        opt.nationality.includes(inputValue)
    )
    return otherKey
  }
  const handleSidebarClosed = () => {
    dispatch(closeSidebar())
    for (const key in defaultValues) {
      setValue(key, defaultValues[key])
    }
  }
  useEffect(() => {
    if (analysisCertificateState.isEdit === true) {
      analysisCertificateService
        .get(analysisCertificateState.selectedUuid)
        .then((res) => {
          if (res.data.code === 600) {
            const payload = res?.data?.payload
            const dataForm = {
              ...payload,
              agencyUuid1: {
                ...payload?.agency1,
                value: payload?.agency1?.uuid,
                label: payload?.agency1?.name,
              },
              agencyUuid2: '',
              // amount: payload?.amount,
              // diagnosis: payload?.diagnosis,
              // diagnosisEng: payload?.diagnosisEng,
              labResultUuid: {
                ...payload?.labResultType,
                value: payload?.labResultType?.uuid,
                label: payload?.labResultType?.name,
              },
              patients: payload?.patients?.map((i) => ({
                ...i,
                label: i?.name,
                value: i?.uuid,
              })),
              // payFor: payload?.payFor,
              payerUuid: {
                ...payload?.payer,
                label: payload?.payer?.name,
                value: payload?.payer?.uuid,
              },
              performTime: moment(payload?.performTime).format(
                'YYYY-DD-MMTHH:mm'
              ),
              receiveSampleTime: moment(payload?.receiveSampleTime).format(
                'YYYY-DD-MMTHH:mm'
              ),
              returnTime: moment(payload?.returnTime).format(
                'YYYY-DD-MMTHH:mm'
              ),
              // sampleNumber: payload?.sampleNumber,
              sampleState: {
                label:
                  payload?.sampleState === true ? 'Đủ mẫu' : 'Không đủ mẫu',
                value: payload?.sampleState,
              },
              sampleType: payload?.sampleType?.uuid,
              staffUuid1: {
                ...payload?.staff1,
                label: payload?.staff1?.name,
                value: payload?.staff1?.uuid,
              },
              staffUuid2: {
                ...payload?.staff2,
                label: payload?.staff2?.name,
                value: payload?.staff2?.uuid,
              },
              staffUuid3: {
                ...payload?.staff3,
                label: payload?.staff3?.name,
                value: payload?.staff3?.uuid,
              },
              staffUuid4: {
                ...payload?.staff4,
                label: payload?.staff4?.name,
                value: payload?.staff4?.uuid,
              },
              state: statusOptions.find((i) => i.value === payload?.state),
              takeSampleTime: moment(payload?.takeSampleTime).format(
                'YYYY-DD-MMTHH:mm'
              ),
              // testNumber: payload?.testNumber,
              testtype: {
                ...payload?.testType,
                label: payload?.testType?.name,
                value: payload?.testType?.uuid,
              },
              // shift: payload?.shift,
              // note: payload?.note,
              ct: payload?.ct,
              getSampleAtHome: payload?.getSampleAtHome,
              getSampleAtHomePrice: payload?.getSampleAtHomePrice,
            }
            for (const key in dataForm) {
              setValue(key, dataForm[key])
            }
          }
        })
    }
  }, [analysisCertificateState.isEdit])
  // ** Function to handle form submit
  const onSubmit = (data) => {
    if (analysisCertificateState.isEdit === true) {
      const newDataEdit = {
        agencyUuid1: data?.agencyUuid1?.value,
        agencyUuid2: data?.agencyUuid1?.value,
        amount: parseFloat(data?.amount),
        diagnosis: data?.diagnosis,
        diagnosisEng: data?.diagnosisEng,
        inWords: to_vietnamese(data?.amount),
        labResultUuid: data?.labResultUuid?.value,
        patientUuids: data?.patients?.map((p) => p.value),
        payFor: data?.testtype?.label,
        payerUuid: data?.payerUuid?.value,
        performTime: moment(data?.performTime).valueOf(),
        receiveSampleTime: moment(data?.receiveSampleTime).valueOf(),
        returnTime: moment(data?.returnTime).valueOf(),
        sampleNumber: parseFloat(data?.sampleNumber),
        sampleState: data?.sampleState?.value,
        sampleTypeUuid: data?.sampleType,
        staffUuid1: data?.staffUuid1?.value,
        staffUuid2: data?.staffUuid2?.value,
        staffUuid3: data?.staffUuid3?.value,
        staffUuid4: data?.staffUuid4?.value,
        state: data?.state?.value,
        takeSampleTime: moment(data?.takeSampleTime).valueOf(),
        testTypeUuid: data?.testtype?.value,
        shift: data?.shift,
        note: data?.note,
        ct: parseFloat(data?.ct),
        getSampleAtHome: data?.getSampleAtHome,
        getSampleAtHomePrice: parseFloat(data?.getSampleAtHomePrice),
      }
      analysisCertificateService.update(data?.uuid, newDataEdit).then((res) => {
        if (res.data.code === 600) {
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
          for (const key in defaultValues) {
            setValue(key, defaultValues[key])
          }
          toggleTestFormSidebar()
          dispatch(refetchList())
        } else {
          toast.error('Cập nhật thất bại !', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Slide,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      })
    } else if (analysisCertificateState.isAddNew === true) {
      const newData = {
        agencyUuid1: data?.agencyUuid1?.value,
        agencyUuid2: data?.agencyUuid1?.value,
        amount: parseFloat(data?.amount),
        diagnosis: data?.diagnosis,
        diagnosisEng: data?.diagnosisEng,
        inWords: to_vietnamese(data?.amount),
        labResultUuid: data?.labResultUuid?.value,
        patientUuids: data?.patients?.map((p) => p.value),
        payFor: data?.testtype?.label,
        payerUuid: data?.payerUuid?.value,
        performTime: moment(data?.performTime).valueOf(),
        receiveSampleTime: moment(data?.receiveSampleTime).valueOf(),
        returnTime: moment(data?.returnTime).valueOf(),
        sampleNumber: parseFloat(data?.sampleNumber),
        sampleState: data?.sampleState?.value,
        sampleTypeUuid: data?.sampleType,
        staffUuid1: data?.staffUuid1?.value,
        staffUuid2: data?.staffUuid2?.value,
        staffUuid3: data?.staffUuid3?.value,
        staffUuid4: data?.staffUuid4?.value,
        state: data?.state?.value,
        takeSampleTime: moment(data?.takeSampleTime).valueOf(),
        testTypeUuid: data?.testtype?.value,
        shift: data?.shift,
        note: data?.note,
        ct: parseFloat(data?.ct),
        getSampleAtHome: data?.getSampleAtHome,
        getSampleAtHomePrice: parseFloat(data?.getSampleAtHomePrice),
      }
      analysisCertificateService.add(newData).then((res) => {
        if (res.data.code === 600) {
          toast.success('Thêm mới thành công !', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Slide,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          for (const key in defaultValues) {
            setValue(key, defaultValues[key])
          }
          toggleTestFormSidebar()
          dispatch(refetchList())
        } else {
          toast.error('Thêm mới thất bại !', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Slide,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      })
    }
  }
  const fetchPatientsDropdown = (query) => {
    patientService.list({ page: 1, perPage: 40, q: query }).then((res) => {
      if (res.data.payload !== null) {
        const options = res.data.payload?.map((patient) => ({
          label: `${patient.name} - ${moment(patient.dateOfBirth).format(
            'DD/MM/YYYY'
          )} - ${patient.phone}`,
          value: patient.uuid,
          phone: patient.phone,
          nationality: patient.nationality,
        }))
        setPatientsOptions(options)
      }
    })
  }
  const debounceDropDown = useCallback(
    debounce((query) => fetchPatientsDropdown(query), 500),
    []
  )
  const handleSearchPatients = (query) => {
    debounceDropDown(query)
  }
  const handldeSelectShift = (value) => {
    setValue(
      'returnTime',
      value === 'Ca 1'
        ? moment().set({ hour: 15, minute: 0 }).format('YYYY-DD-MMTHH:mm')
        : value === 'Ca 2'
        ? moment().set({ hour: 21, minute: 0 }).format('YYYY-DD-MMTHH:mm')
        : value === 'Ca 3'
        ? moment()
            .add(1, 'd')
            .set({ hour: 7, minute: 0 })
            .format('YYYY-DD-MMTHH:mm')
        : ''
    )
  }

  const handleModal = () => {
    setModal(!modal)
  }
  const setRefreshTable = () => {}
  const handleCountPrice = () => {
    const totalPatient = getValues('patients')?.length
    const testtype = getValues('testtype')
    console.log(testtype.value)
    if (testtype.value === undefined) {
      toast.error('Chọn yêu cầu xét nghiệm !', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Slide,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const data = {
        numberOfPatient: totalPatient,
        uuid: testtype.value,
      }
      analysisCertificateService.getPrice(data).then((res) => {
        if (res.data.code === 600) {
          setValue('amount', res.data.payload.price)
        }
      })
    }
  }
  return (
    <StyledTestFormSidebar
      size='lg'
      open={openSideBar}
      title='Thêm phiếu xét nghiệm'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleTestFormSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='patients'>
            Chọn khách hàng (Thu ngân)<span className='text-danger'>*</span>
          </Label>
          <div className='d-flex'>
            <Controller
              rules={{
                required: true,
              }}
              name='patients'
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    isClearable={false}
                    isMulti
                    onInputChange={(value) => handleSearchPatients(value)}
                    classNamePrefix='select'
                    options={patientsOptions}
                    theme={selectThemeColors}
                    filterOption={filterOption}
                    className={classnames('react-select', {
                      'is-invalid': errors.patients,
                    })}
                    {...field}
                  />
                </>
              )}
            />
            <Button
              type='button'
              className='me-1 add-patient-button'
              color='primary'
              onClick={handleModal}
            >
              +
            </Button>
          </div>
        </div>
        <Card title='Thu Ngân'>
          <Row>
            <Col md='4'>
              <div className='mb-1'>
                <Label className='form-label' for='testtype'>
                  Yêu cầu xét nghiệm (Thu ngân){' '}
                  <span className='text-danger'>*</span>
                </Label>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name='testtype'
                  control={control}
                  render={({ field: { onChange, value, ref } }) => {
                    return (
                      <Select
                        inputRef={ref}
                        value={testTypeOptions.find(
                          (c) => c.value === value.value
                        )}
                        onChange={(val) => {
                          setValue(
                            'getSampleAtHomePrice',
                            val.getSampleAtHomePrice
                          )
                          console.log(val)
                          onChange(val)
                        }}
                        isClearable={false}
                        classNamePrefix='select'
                        options={testTypeOptions}
                        theme={selectThemeColors}
                        className={classnames('react-select', {
                          'is-invalid': errors.testtype,
                        })}
                      />
                    )
                  }}
                />
              </div>
            </Col>
            <Col md='4'>
              <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='getSampleAtHome'>
                  Lấy mẫu tại nhà (Thu ngân)
                  {/* <span className='text-danger'>*</span> */}
                </Label>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='getSampleAtHome'
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Checkbox onChange={onChange} checked={value}>
                      Lấy mẫu tại nhà
                    </Checkbox>
                  )}
                />
              </div>
            </Col>
            <Col md='4'>
              <div className='mb-1'>
                <Label className='form-label' for='getSampleAtHomePrice'>
                  Giá tiền thu tại nhà (Thu ngân)
                  {/* <span className='text-danger'>*</span> */}
                </Label>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='getSampleAtHomePrice'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='getSampleAtHomePrice'
                      placeholder='50000'
                      invalid={errors.getSampleAtHomePrice && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='4'>
              <div className='mb-1'>
                <Label className='form-label' for='amount'>
                  Giá tiền (Thu ngân)
                  {/* <span className='text-danger'>*</span> */}
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
                    <div className='d-flex'>
                      <Input
                        id='amount'
                        placeholder='50000'
                        invalid={errors.amount && true}
                        {...field}
                      />{' '}
                      <Button
                        type='button'
                        className='me-1 countPrice'
                        color='primary'
                        onClick={handleCountPrice}
                      >
                        Tính tiền
                      </Button>
                    </div>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Card>
        <Card title='Lấy mẫu'>
          <Row>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='agencyUuid1'>
                  Đơn vị gửi mẫu (Thu ngân)
                  <span className='text-danger'>*</span>
                </Label>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name='agencyUuid1'
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable={false}
                      classNamePrefix='select'
                      options={agencyOptions}
                      theme={selectThemeColors}
                      className={classnames('react-select', {
                        'is-invalid': errors.agencyUuid1,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1 sampletype'>
                <Label className='form-label ' for='sampleType'>
                  Mẫu bệnh phẩm (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
                </Label>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='sampleType'
                  control={control}
                  render={({ field }) => (
                    <Radio.Group
                      options={sampleTypeOptions}
                      {...field}
                      className={classnames('groupshift', {
                        'is-invalid': errors.sampleType,
                      })}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='shift'>
                  Ca (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
                </Label>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='shift'
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => {
                    return (
                      <Radio.Group
                        value={value}
                        onChange={(e) => {
                          onChange(e.target.value)
                          handldeSelectShift(e.target.value)
                        }}
                        name={name}
                        className={classnames('groupshift', {
                          'is-invalid': errors.shift,
                        })}
                      >
                        <Radio value={'Ca 1'}>Ca 1</Radio>
                        <Radio value={'Ca 2'}>Ca 2</Radio>
                        <Radio value={'Ca 3'}>Ca 3</Radio>
                      </Radio.Group>
                    )
                  }}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='staffUuid1'>
                  Người lấy mẫu (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.staffUuid1,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='sampleNumber'>
                  Số lần lấy mẫu (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='sampleState'>
                  Tình trạng mẫu (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.sampleState,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='takeSampleTime'>
                  Thời gian lấy mẫu (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='receiveSampleTime'>
                  Thời gian nhận mẫu (Bộ phận lấy mẫu)
                  {/* <span className='text-danger'>*</span> */}
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
          </Row>
        </Card>
        <Card title='Kỹ thuật viên'>
          <Row>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='diagnosisEng'>
                  Kết luận tiếng anh (Kỹ thuật viên)
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='performTime'>
                  Thời gian thực hiện (Kỹ thuật viên)
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='diagnosis'>
                  Kết luận (Kỹ thuật viên)
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='state'>
                  Trạng thái
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.state,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='labResultUuid'>
                  Kết quả (Kỹ thuật viên)
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.labResultUuid,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='staffUuid3'>
                  Người ký phiếu
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.staffUuid3,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='returnTime'>
                  Ngày trả kết quả
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='staffUuid2'>
                  Người thực hiện
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.staffUuid2,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='staffUuid4'>
                  Người lập phiếu
                  {/* <span className='text-danger'>*</span> */}
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
                        'is-invalid': errors.staffUuid4,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='payerUuid'>
                  Người nộp tiền
                  {/* <span className='text-danger'>*</span> */}
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
                      onInputChange={(value) => handleSearchPatients(value)}
                      classNamePrefix='select'
                      options={patientsOptions}
                      theme={selectThemeColors}
                      filterOption={filterOption}
                      className={classnames('react-select', {
                        'is-invalid': errors.payerUuid,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='note'>
                  Ghi chú
                  {/* <span className='text-danger'>*</span> */}
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
            <Col md='3'>
              <div className='mb-1'>
                <Label className='form-label' for='ct'>
                  CT
                </Label>
                <Controller
                  rules={
                    {
                      // required: true,
                    }
                  }
                  name='ct'
                  control={control}
                  render={({ field }) => (
                    <Input id='ct' invalid={errors.ct && true} {...field} />
                  )}
                />
              </div>
            </Col>
          </Row>
          <div className='group-button'>
            <Button type='submit' className='me-1' color='primary'>
              Submit
            </Button>
            <Button
              type='reset'
              color='secondary'
              outline
              onClick={toggleTestFormSidebar}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </Form>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        setRefreshTable={setRefreshTable}
      />
    </StyledTestFormSidebar>
  )
}

export default SidebarNewTestForm
