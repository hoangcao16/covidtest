/* eslint-disable comma-dangle */

import { Edit, Trash } from 'react-feather'

// ** Table Server Side Column
export const customizeColumns = (editCallback, deleteCallback) => {
  return [
    {
      sortable: true,
      name: 'Tên',
      minWidth: '250px',
      selector: (row) => row.name,
    },
    {
      name: 'Thao tác',
      allowOverflow: true,
      cell: (row) => (
        <>
          <div data-tag='allowRowEvents' onClick={() => deleteCallback(row)}>
            <a>
              <Trash size={15} />
            </a>
          </div>
          <div onClick={() => editCallback(row)}>
            <a>
              <Edit size={15} />
            </a>
          </div>
        </>
      ),
    },
  ]
}
