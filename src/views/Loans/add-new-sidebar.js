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
import { StyledSidebar } from './style'
import { debounce } from 'lodash'
// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import toVND from '../components/common/toVND'
// ** Reactstrap Imports
import { Button, Label, Form, Input, Row, Col } from 'reactstrap'
import { refetchList, closeSidebar } from '../../redux/debt'
import moment from 'moment'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
//Service
import { agencyService } from '../../services/agencyService'
import { testTypeService } from '../../services/testTypeService'
import { patientService } from '../../services/patientService'
import { analysisCertificateService } from '../../services/analysisCertificateCervice'
import { staffService } from '../../services/staffService'
import { debtService } from '../../services/debtService'
import { toast, Slide } from 'react-toastify'
// import AddNewModal from '../patients/patients/AddNewModal'

const defaultValues = {
  testtype: '',
  agencyUuid: '',
  amount: 500000,
  analysisCertificate: '',
  inWords: '',
  note: '',
  payFor: '',
  payer: '',
  staffUuid: '',
}

const SidebarBill = ({ openSideBar, toggleSidebar }) => {
  // ** States
  const [agencyOptions, setAgencyOptions] = useState([])
  const [testTypeOptions, setTestTypeOptions] = useState([])
  const [patientsOptions, setPatientsOptions] = useState([])
  const [certificateOptions, setCertificateOptions] = useState([])
  const [staffOptions, setStaffOptions] = useState([])
  // const [modal, setModal] = useState(false)

  const debtState = useSelector((state) => state.debt)

  // ** Store Vars
  const dispatch = useDispatch()
  // ** Vars
  const {
    control,
    setValue,
    handleSubmit,
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
    if (debtState.isEdit === true) {
      debtService.get(debtState.selectedUuid).then((res) => {
        if (res.data.code === 600) {
          const payload = res?.data?.payload
          setTestFormCode(payload.code)
          const dataForm = {
            ...payload,
            agencyUuid: {
              ...payload?.agency1,
              value: payload?.agency?.uuid,
              label: payload?.agency?.name,
            },
            // patients: payload?.patients?.map((i) => ({
            //   ...i,
            //   label: i?.name,
            //   value: i?.uuid,
            // })),
            staffUuid: {
              ...payload?.staff1,
              label: payload?.staff?.name,
              value: payload?.staff?.uuid,
            },
            testtype: {
              ...payload?.testType,
              label: payload?.testType?.name,
              value: payload?.testType?.uuid,
            },
          }
          for (const key in dataForm) {
            setValue(key, dataForm[key])
          }
        }
      })
    }
  }, [debtState.isEdit])
  // ** Function to handle form submit
  const onSubmit = (data) => {
    if (debtState.isEdit === true) {
      const newDataEdit = {
        // patientUuids: data?.patients?.map((p) => p.value),
        analysisCertificateUuid: data?.analysisCertificate?.value,
        testTypeUuid: data?.testtype?.value,
        agencyUuid: data?.agencyUuid?.value,
        amount: parseFloat(data?.amount),
        inWords: to_vietnamese(data?.amount),
        note: data?.note,
        payFor: data?.testtype?.label,
        payerUuid: data?.payer?.value,
        staffUuid: data?.staffUuid?.value,
      }
      debtService.update(data?.uuid, newDataEdit).then((res) => {
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
          toggleSidebar()
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
    } else if (debtState.isAddNew === true) {
      const newData = {
        // patientUuids: data?.patients?.map((p) => p.value),
        testTypeUuid: data?.testtype?.value,
        analysisCertificateUuid: data?.analysisCertificate?.value,
        agencyUuid: data?.agencyUuid?.value,
        amount: parseFloat(data?.amount),
        inWords: to_vietnamese(data?.amount),
        note: data?.note,
        payFor: data?.testtype?.label,
        payerUuid: data?.payer?.value,
        staffUuid: data?.staffUuid?.value,
      }
      debtService.add(newData).then((res) => {
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
          toggleSidebar()
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
  const fetchCertificateDropdown = (query) => {
    analysisCertificateService
      .list({ page: 1, perPage: 40, q: query })
      .then((res) => {
        if (res.data.payload !== null) {
          const options = res.data.payload?.map((item) => ({
            label: `${item.uuid}`,
            value: item.uuid,
            phone: item.phone,
            nationality: item.nationality,
          }))
          setCertificateOptions(options)
        }
      })
  }
  const debounceDropDown = useCallback(
    debounce((query) => fetchPatientsDropdown(query), 500),
    []
  )
  const debounceCertificate = useCallback(
    debounce((query) => fetchCertificateDropdown(query), 500),
    []
  )
  const handleSearchPatients = (query) => {
    debounceDropDown(query)
  }
  const handleSearchCertificate = (query) => {
    debounceCertificate(query)
  }
  // const handleModal = () => {
  //   setModal(!modal)
  // }
  // const setRefreshTable = () => {}

  return (
    <StyledSidebar
      size='lg'
      open={openSideBar}
      title='Thêm phiếu thu'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='analysisCertificate'>
            Chọn phiếu xét nghiệm
            {/* <span className='text-danger'>*</span> */}
          </Label>
          <div className='d-flex'>
            <Controller
              rules={
                {
                  // required: true,
                }
              }
              name='analysisCertificate'
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    isClearable={false}
                    onInputChange={(value) => handleSearchCertificate(value)}
                    classNamePrefix='select'
                    options={certificateOptions}
                    theme={selectThemeColors}
                    // filterOption={filterOption}
                    className={classnames('react-select', {
                      'is-invalid': errors.analysisCertificate,
                    })}
                    {...field}
                  />
                </>
              )}
            />
          </div>
        </div>
        <Row>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='testtype'>
                Yêu cầu xét nghiệm <span className='text-danger'>*</span>
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
                        (c) => c?.value === value?.value
                      )}
                      onChange={(val) => {
                        setValue(
                          'getSampleAtHomePrice',
                          val.getSampleAtHomePrice
                        )
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
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='amount'>
                Giá tiền
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
                    />
                  </div>
                )}
              />
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='agencyUuid'>
                Đơn vị
                <span className='text-danger'>*</span>
              </Label>
              <Controller
                rules={{
                  required: true,
                }}
                name='agencyUuid'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={agencyOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': errors.agencyUuid,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>

          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='payer'>
                Người thanh toán
                <span className='text-danger'>*</span>
              </Label>
              <div className='d-flex'>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name='payer'
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        isClearable={false}
                        onInputChange={(value) => handleSearchPatients(value)}
                        classNamePrefix='select'
                        options={patientsOptions}
                        theme={selectThemeColors}
                        filterOption={filterOption}
                        className={classnames('react-select', {
                          'is-invalid': errors.payer,
                        })}
                        {...field}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col md='6'>
            <div className='mb-1'>
              <Label className='form-label' for='staffUuid'>
                Nhân viên
                {/* <span className='text-danger'>*</span> */}
              </Label>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='staffUuid'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={staffOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid': errors.staffUuid,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='6'>
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
        </Row>
        <div className='group-button'>
          <Button type='submit' className='me-1' color='primary'>
            Xác nhận
          </Button>
          <Button
            type='reset'
            color='secondary'
            outline
            onClick={toggleSidebar}
          >
            Hủy
          </Button>
        </div>
      </Form>
      {/* <AddNewModal
        open={modal}
        handleModal={handleModal}
        setRefreshTable={setRefreshTable}
      /> */}
    </StyledSidebar>
  )
}

export default SidebarBill
