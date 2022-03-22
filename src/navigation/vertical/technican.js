/* eslint-disable comma-dangle */
import { Briefcase, Monitor } from 'react-feather'
export default [
  {
    id: 'laboratory',
    title: 'Kỹ thuật viên',
    icon: <Briefcase size={20} />,
    action: 'read',
    resource: 'ky_thuat_vien',
    navLink: '/laboratory',
  },
  {
    id: 'return-result',
    title: 'Trả kết quả ',
    icon: <Monitor size={20} />,
    action: 'read',
    resource: 'ky_thuat_vien',
    navLink: '/return-result',
  },
]
