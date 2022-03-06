/* eslint-disable comma-dangle */
// ** Custom Components
import { Trash, Edit, BookOpen } from 'react-feather'
// import {store} from '@store/store'
// import {deleteData, selectItem} from '../../../redux/account'
import { Link } from 'react-router-dom'
// ** Table Server Side Column
export const customizeColumns = (editCallback, deleteCallback) => {
  return [
    {
      sortable: true,
      name: 'Mã code',
      minWidth: '250px',
      selector: (row) => row.code,
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
      name: 'CMND/CCCD',
      minWidth: '225px',
      selector: (row) => row.identityNumber,
    },
    {
      sortable: true,
      name: 'email',
      minWidth: '225px',
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
              console.log('row:', row)
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
          <Link
            to={`/patient-history/${row.uuid}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <BookOpen />
          </Link>
        </div>
      ),
    },
  ]
}
