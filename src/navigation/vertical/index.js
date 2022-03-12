/* eslint-disable comma-dangle */
import {
  Mail,
  Home,
  Circle,
  Camera,
  Command,
  Cpu,
  Dribbble,
  Slack,
  Briefcase,
  Monitor,
  CreditCard,
} from 'react-feather'

export default [
  {
    id: 'patients',
    title: 'Khách Hàng',
    icon: <Home size={20} />,
    navLink: '/patients',
  },
  {
    id: 'cashier',
    title: 'Thu Ngân',
    icon: <CreditCard size={20} />,
    navLink: '/cashier',
    children: [
      {
        id: 'cashier-test-form',
        title: 'Phiếu Xét Nghiệm',
        icon: <Circle size={12} />,
        navLink: '/cashier-test-form',
      },
      {
        id: 'cashier-bill',
        title: 'Phiếu Thu',
        icon: <Circle size={12} />,
        navLink: '/cashier-bill',
      },
      {
        id: 'cashier-loans',
        title: 'Công nợ',
        icon: <Circle size={20} />,
        navLink: '/cashier-loans',
      },
    ],
  },
  {
    id: 'sampling-unit',
    title: 'Lấy mẫu',
    icon: <Command size={20} />,
    navLink: '/sampling-unit',
  },
  {
    id: 'laboratory',
    title: 'Phòng xét nghiệm',
    icon: <Briefcase size={20} />,
    navLink: '/laboratory',
  },
  {
    id: 'return-result',
    title: 'Trả kết quả ',
    icon: <Monitor size={20} />,
    navLink: '/return-result',
  },
  {
    id: 'covid19',
    title: 'Xét nghiệm Covid-19',
    icon: <Command size={20} />,
    navLink: '/covid19',
    children: [
      {
        id: 'test-form',
        title: 'Phiếu Xét Nghiệm',
        icon: <Circle size={12} />,
        navLink: '/covid19/test-form',
      },
      {
        id: 'bill',
        title: 'Phiếu Thu',
        icon: <Circle size={12} />,
        navLink: '/bill',
      },
      {
        id: 'result-form',
        title: 'Phiếu Trả Kết Quả',
        icon: <Circle size={12} />,
        navLink: '/covid19/result-form',
      },
    ],
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
        title: 'Loai Kết quả',
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
    id: 'loans',
    title: 'Công nợ',
    icon: <Cpu size={20} />,
    navLink: '/loans',
    // children: [],
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
