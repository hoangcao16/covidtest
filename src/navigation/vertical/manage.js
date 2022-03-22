/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import {
  Circle,
  Camera,
  Cpu,
  Dribbble,
  Slack,
  Umbrella,
  LifeBuoy,
} from 'react-feather'
export default [
  {
    id: 'test-form',
    title: 'Phiếu xét nghiệm',
    icon: <Umbrella size={12} />,
    navLink: '/covid19/test-form',
  },
  {
    id: 'bill',
    title: 'Phiếu thu',
    icon: <LifeBuoy size={12} />,
    navLink: '/bill',
  },
  {
    id: 'loans',
    title: 'Phiếu ghi nợ',
    icon: <Cpu size={20} />,
    navLink: '/loans',
    // children: [],
  },
  {
    id: 'entities',
    title: 'Danh mục',
    icon: <Dribbble size={20} />,
    navLink: '/entities',
    children: [
      {
        id: 'test-type',
        title: 'Loại xét nghiệm',
        icon: <Circle size={12} />,
        navLink: '/entities/test-type',
      },
      {
        id: 'sample-type',
        title: 'Mẫu bệnh phẩm',
        icon: <Circle size={12} />,
        navLink: '/entities/sample-type',
      },
      {
        id: 'agency',
        title: 'Đơn vị',
        icon: <Circle size={12} />,
        navLink: '/entities/agency',
      },
      {
        id: 'lab-result-type',
        title: 'Loai kết quả',
        icon: <Circle size={12} />,
        navLink: '/entities/lab-result-type',
      },
      {
        id: 'staffs',
        title: 'Nhân viên',
        icon: <Circle size={12} />,
        navLink: '/entities/staffs',
      },
    ],
  },

  {
    id: 'reports',
    title: 'Báo cáo',
    icon: <Camera size={20} />,
    navLink: '/reports',
    children: [
      {
        id: 'loans',
        title: 'Công nợ',
        icon: <Circle size={12} />,
        navLink: '/reports/loans',
      },
      {
        id: 'revenue',
        title: 'Doanh thu',
        icon: <Circle size={12} />,
        navLink: '/reports/revenue',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Cấu hình',
    icon: <Slack size={20} />,
    navLink: '/accounts',
    children: [
      {
        id: 'accounts',
        title: 'Tài khoản',
        icon: <Circle size={12} />,
        navLink: '/settings/accounts',
      },
      {
        id: 'roles',
        title: 'Vai trò',
        icon: <Circle size={12} />,
        navLink: '/settings/roles',
      },
      {
        id: 'permissions',
        title: 'Phân quyền',
        icon: <Circle size={12} />,
        navLink: '/settings/permissions',
      },
      {
        id: 'language',
        title: 'Ngôn ngữ',
        icon: <Circle size={12} />,
        navLink: '/settings/language',
      },
      {
        id: 'invoices',
        title: 'Nội dung phiếu thu',
        icon: <Circle size={12} />,
        navLink: '/settings/invoices',
      },
    ],
  },
]
