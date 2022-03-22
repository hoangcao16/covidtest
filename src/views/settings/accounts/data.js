/* eslint-disable comma-dangle */
// ** Custom Components
import { MoreVertical, Archive, Trash, Trash2, Edit } from 'react-feather'
// import {store} from '@store/store'
// import {deleteData, selectItem} from '../../../redux/account'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from 'reactstrap'
// ** Table Server Side Column
export const customizeColumns = (editCallback, deleteCallback) => {
  return [
    {
      sortable: true,
      name: 'email',
      minWidth: '225px',
      selector: (row) => row.email,
    },
    {
      sortable: true,
      name: 'name',
      minWidth: '250px',
      selector: (row) => row.name,
    },
    {
      sortable: true,
      name: 'Điện thoại',
      minWidth: '250px',
      selector: (row) => row.phone,
    },
    {
      sortable: true,
      name: 'Đơn vị',
      minWidth: '250px',
      selector: (row) => row.unit,
    },
    {
      sortable: true,
      name: 'Trạng thái',
      minWidth: '250px',
      cell: () => (
        <>
          <div className='form-switch form-check-primary'>
            <Input
              type='switch'
              id='switch-primary'
              name='primary'
              defaultChecked
            />
          </div>
        </>
      ),
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => (
        <div className='column-action'>
          <a
            onClick={(e) => {
              e.stopPropagation()
              deleteCallback(row.uuid)
            }}
          >
            <Trash />
          </a>
          <a
            onClick={(e) => {
              e.stopPropagation()
              editCallback(row)
            }}
          >
            <Edit />
          </a>
        </div>
      ),
    },
  ]
}
