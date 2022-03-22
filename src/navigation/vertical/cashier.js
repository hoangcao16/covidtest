/* eslint-disable comma-dangle */
import { Home, Circle, CreditCard } from 'react-feather'
export default [
  {
    id: 'patients',
    title: 'Khách hàng',
    icon: <Home size={20} />,
    action: 'read',
    resource: 'thu_ngan',
    navLink: '/patients',
  },
  {
    id: 'cashier',
    title: 'Thu ngân',
    icon: <CreditCard size={20} />,
    action: 'read',
    resource: 'thu_ngan',
    navLink: '/cashier',
    children: [
      {
        id: 'cashier-test-form',
        title: 'Lập phiếu',
        icon: <Circle size={12} />,
        action: 'read',
        resource: 'thu_ngan',
        navLink: '/cashier-test-form',
      },
      {
        id: 'cashier-bill',
        title: 'Đã thu tiền',
        icon: <Circle size={12} />,
        action: 'read',
        resource: 'thu_ngan',
        navLink: '/cashier-bill',
      },
      {
        id: 'cashier-loans',
        title: 'Treo công nợ',
        icon: <Circle size={20} />,
        action: 'read',
        resource: 'thu_ngan',
        navLink: '/cashier-loans',
      },
    ],
  },
]
