/* eslint-disable comma-dangle */
// ** Custom Components
import { Trash, Edit, BookOpen } from 'react-feather'
// import {store} from '@store/store'
// import {deleteData, selectItem} from '../../../redux/account'
// ** Table Server Side Column
export const customizeColumns = (editCallback, deleteCallback) => {
  return [
    {
      sortable: true,
      name: 'Mã code',
      minWidth: '150px',
      selector: (row) => row.code,
    },
    {
      sortable: true,
      name: 'name',
      minWidth: '240px',
      selector: (row) => row.name,
    },
    {
      sortable: true,
      name: 'Điện thoại',
      minWidth: '200px',
      selector: (row) => row.phone,
    },
    {
      sortable: true,
      name: 'CMND/CCCD',
      minWidth: '175px',
      selector: (row) => row.identityNumber,
    },
    {
      sortable: true,
      name: 'email',
      minWidth: '175px',
      selector: (row) => row.email,
    },
    {
      name: 'Actions',
      minWidth: '100px',
      sticky: true,
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
