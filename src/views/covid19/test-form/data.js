/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** Custom Components
import Avatar from '@components/avatar'
import Select from 'react-select'

// ** Third Party Components
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import moment from 'moment'
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

export const statusOptions = [
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
export const samplestateOptions = [
  {
    label: 'Đủ mẫu',
    value: true,
  },
  {
    label: 'Không đủ mẫu',
    value: false,
  },
]
// ** Vars
const states = [
  'success',
  'danger',
  'warning',
  'info',
  'dark',
  'primary',
  'secondary',
]

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' },
}

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    sortable: true,
    maxWidth: '100px',
    selector: (row) => row.id,
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '225px',
    selector: (row) => row.full_name,
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '310px',
    selector: (row) => row.email,
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post,
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.age,
  },
  {
    name: 'Salary',
    sortable: true,
    minWidth: '175px',
    selector: (row) => row.salary,
  },
]
// ** Table ReOrder Column
export const reOrderColumns = [
  {
    name: 'ID',
    reorder: true,
    sortable: true,
    maxWidth: '100px',
    selector: (row) => row.id,
  },
  {
    name: 'Name',
    reorder: true,
    sortable: true,
    minWidth: '225px',
    selector: (row) => row.full_name,
  },
  {
    name: 'Email',
    reorder: true,
    sortable: true,
    minWidth: '310px',
    selector: (row) => row.email,
  },
  {
    name: 'Position',
    reorder: true,
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post,
  },
  {
    name: 'Age',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.age,
  },
  {
    name: 'Salary',
    reorder: true,
    sortable: true,
    minWidth: '175px',
    selector: (row) => row.salary,
  },
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Name',
    minWidth: '250px',
    sortable: (row) => row.full_name,
    cell: (row) => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar
            color={`light-${states[row.status]}`}
            content={row.full_name}
            initials
          />
        ) : (
          <Avatar
            img={
              require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`)
                .default
            }
          />
        )}
        <div className='user-info text-truncate ms-1'>
          <span className='d-block fw-bold text-truncate'>{row.full_name}</span>
          <small>{row.post}</small>
        </div>
      </div>
    ),
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email,
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date,
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.salary,
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.age,
  },
  {
    name: 'Status',
    minWidth: '150px',
    sortable: (row) => row.status.title,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    },
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={(e) => e.preventDefault()}
              >
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={(e) => e.preventDefault()}
              >
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={(e) => e.preventDefault()}
              >
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    },
  },
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: (row) => row.full_name,
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post,
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email,
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date,
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.salary,
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.status,
    cell: (row) => {
      return <Badge pill>{'alo'}</Badge>
    },
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    },
  },
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Mã',
    minWidth: '180px',
    selector: (row) => row.code,
  },
  {
    sortable: true,
    name: 'Ngày tạo',
    minWidth: '150px',
    selector: (row) => moment(row.createdTime).format('DD/MM/YYYY HH:mm'),
  },
  {
    sortable: true,
    name: 'Loại xét nghiệm',
    minWidth: '150px',
    selector: (row) => row.testTypeName,
  },
  {
    sortable: true,
    name: 'Người thực hiện',
    minWidth: '150px',
    selector: (row) => row.staffName2,
  },
  {
    sortable: true,
    name: 'Ca',
    maxWidth: '20px',
    selector: (row) => row.shift,
  },
  {
    sortable: true,
    name: 'Kết quả',
    maxWidth: '130px',
    selector: (row) => row.labResultName,
  },
  {
    sortable: true,
    name: 'Đơn vị',
    maxWidth: '120px',
    selector: (row) => row.agencyName1,
  },
  {
    sortable: true,
    name: 'Trạng thái',
    minWidth: '200px',
    allowOverflow: true,
    cell: (row) => {
      return (
        <Select
          isClearable={false}
          classNamePrefix='select'
          className='react-select'
          options={statusOptions}
          value={statusOptions.find((c) => c.value === row.state)}
        ></Select>
      )
    },
  },
  {
    name: 'Actions',
    allowOverflow: true,
    fixed: true,
    maxWidth: '100px',
    cell: (row) => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Edit size={15} />
                <span className='align-middle ms-50'>Edit</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    },
  },
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: (row) => row.full_name,
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email,
  },
  {
    name: 'Post',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post,
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.city,
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date,
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.salary,
  },
]

export default ExpandableTable
