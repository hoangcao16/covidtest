/* eslint-disable comma-dangle */
// ** Custom Components

import { Trash, Edit } from 'react-feather'

// ** Table Server Side Column
export const customizeColumns = (editCallback, deleteCallback) => {
  return [
    {
      sortable: true,
      name: 'Mã',
      minWidth: '225px',
      selector: (row) => row.code,
    },
    {
      sortable: true,
      name: 'Tên',
      minWidth: '250px',
      selector: (row) => row.name,
    },
    {
      sortable: true,
      name: 'Giá',
      minWidth: '250px',
      selector: (row) => row.price,
    },
    {
      sortable: true,
      name: 'Giá tại nhà',
      minWidth: '250px',
      selector: (row) => row.getSampleAtHomePrice,
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
            <a
              onClick={(e) => {
                e.stopPropagation()
                editCallback(row)
              }}
            >
              <Edit size={15} />
            </a>
          </div>
        </>
      ),
    },
  ]
}
