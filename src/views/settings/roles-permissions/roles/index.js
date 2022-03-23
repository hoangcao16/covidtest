// ** React Imports
import { Fragment } from 'react'

// ** Roles Components
import Table from './Table'
import RoleCards from './RoleCards'

const Roles = () => {
  return (
    <Fragment>
      <h3>Danh sách vai trò</h3>
      <p className='mb-2'>
        Một role cung cấp sự truy xuất đến tính năng phụ thuộc vào vai trò được
        gán tới
      </p>
      <RoleCards />
      <h3 className='mt-50'>Tất cả tài khoản và vai trò của họ</h3>
      <p className='mb-2'>
        Find all of your company’s administrator accounts and their associate
        roles.
      </p>
      <div className='app-user-list'>
        <Table />
      </div>
    </Fragment>
  )
}

export default Roles
