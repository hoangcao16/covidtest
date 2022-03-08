/* eslint-disable multiline-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable semi */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { StyledTestFormUploadCSV } from '../../covid19/test-form/style'
import CSVReader from 'react-csv-reader'
import * as XLSX from 'xlsx'
import readXlsxFile from 'read-excel-file'
import { useState, useRef } from 'react'
import { uploadCSV } from '../../../redux/testForm'
import { useDispatch } from 'react-redux'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
} from 'reactstrap'
import moment from 'moment'
import {
  generateCode,
  generateCodeWithNumber,
  seed,
  random,
} from '../../../utility/Utils'

const defaultValues = {}

const defaultFileList = [
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  },
]

const TestFromUploadCSV = ({ openSideBar, toggleTestFormSidebar }) => {
  const dispatch = useDispatch()
  const [file, setFile] = useState('')
  const [gop, setGop] = useState(1)
  const ref = useRef()
  const [patients, setPatients] = useState([])
  const onChange = (e) => {
    const [file] = e.target.files
    setFile(file)

    readXlsxFile(file).then((rows) => {
      console.log('filename:', rows)
      const title = rows[0]
      const patientsTemp = []
      const today = moment().format('DDMMYY')
      rows.forEach((item, idx) => {
        console.log('item', item)
        if (idx > 1) {
          console.log('push item', item)
          if (
            item[1] !== null ||
            item[2] !== null ||
            item[3] !== null ||
            item[4] !== null ||
            item[5] !== null ||
            item[6] !== null ||
            item[12] !== null ||
            item[16] !== null ||
            item[13] !== null ||
            item[10] !== null ||
            item[14] !== null
          ) {
            patientsTemp.push({
              code: generateCodeWithNumber(`BN-${today}`, 7),
              name: item[1],
              dateOfBirth: item[2],
              sex: item[3],
              nationIdentify: item[4],
              address: item[5],
              phone: item[6],
              session: item[12],
              dateCreated: moment(item[16]).format('DD-MM-YYYY'),
              agency: item[13],
              result: item[10],
              gop: item[14],
            })
          }
        }
      })

      console.log('patientsTemp:', patientsTemp)
      setPatients(patientsTemp)
    })
  }
  const handleSubmit = (e) => {
    console.log('handleSubmit:', file)
    const formData = new FormData()

    // Update the formData object
    formData.append('upload-csv', file, file.name)

    dispatch(uploadCSV(formData))
  }
  const handleReset = () => {
    console.log('handleReset:', file)
    setFile('')
    setPatients([])
    ref.current.value = ''
  }
  const handleGop = (e) => {
    const gop = e.target.value
    setGop(gop)
    const patientsTemp = patients
    let code = ''
    const today = moment().format('DDMMYY')
    patientsTemp.map((item, idx) => {
      if (idx % gop === 0) {
        code = generateCodeWithNumber(`BN-${today}`, 7)
      }
      item.code = code
    })

    setPatients(patientsTemp)
  }

  return (
    <StyledTestFormUploadCSV
      size='lg'
      open={openSideBar}
      title='Upload CSV'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleTestFormSidebar}
    >
      <input type='file' id='input' ref={ref} onChange={onChange} />
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSubmit}>Submit</button>
      <Row>
        <Label>Lựa chọn cách gộp:</Label>
        <Input
          className='dataTable-select'
          type='select'
          id='sort-select'
          value={gop}
          onChange={(e) => handleGop(e)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </Input>
      </Row>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bệnh nhân 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='patients'>
            <div className='patient'>
              <div className='patient-item patient-name'>Mã</div>
              <div className='patient-item patient-name'>Họ tên</div>
              <div className='patient-item patient-dateOfBirth'>Ngày sinh</div>
              <div className='patient-item patient-address'>Địa chỉ</div>
              <div className='patient-item patient-phone'>Điện thoại</div>
              <div className='patient-item patient-session'>Ca</div>
              <div className='patient-item patient-agency'>Đơn vị</div>
              <div className='patient-item patient-result'>Kết quả</div>
              <div className='patient-item patient-gop'>Gộp?</div>
              <div className='patient-item patient-dateCreated'>
                Ngày thực hiện
              </div>
            </div>
            {patients.map((item, idx) => (
              <div className='patient'>
                <div className='patient-item patient-code'>{item.code}</div>
                <div className='patient-item patient-name'>{item.name}</div>
                <div className='patient-item patient-dateOfBirth'>
                  {item.dateOfBirth}
                </div>
                <div className='patient-item patient-address'>
                  {item.address}
                </div>
                <div className='patient-item patient-address'>{item.phone}</div>
                <div className='patient-item patient-address'>
                  {item.session}
                </div>
                <div className='patient-item patient-address'>
                  {item.agency}
                </div>
                <div className='patient-item patient-result'>{item.result}</div>
                <div className='patient-item patient-gop'>{item.gop}</div>
                <div className='patient-item patient-dateCreated'>
                  {item.dateCreated}
                </div>
                <button
                  color='primary'
                  className='patient-item patient-dateCreated'
                >
                  Gửi lên
                </button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </StyledTestFormUploadCSV>
  )
}

export default TestFromUploadCSV
