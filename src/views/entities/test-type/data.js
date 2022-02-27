// ** Custom Components

import {Trash} from 'react-feather'

// ** Table Server Side Column
export const customizeColumns = (deleteCallback) => {
    return [
        {
            sortable: true,
            name: 'Mã',
            minWidth: '225px',
            selector: row => row.code
        },
        {
            sortable: true,
            name: 'Tên',
            minWidth: '250px',
            selector: row => row.name
        },
        {
            name: 'Thao tác',
            allowOverflow: true,
            cell: row => <>
                <div data-tag="allowRowEvents" onClick={() => deleteCallback(row)}>
                    <a>
                        <Trash size={15}/>
                    </a>
                </div>
            </>
        }
    ]
}
