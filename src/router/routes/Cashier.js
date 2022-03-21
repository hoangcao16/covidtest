/* eslint-disable comma-dangle */
import { lazy } from 'react'

const CashierRoutes = [
  {
    path: '/cashier-test-form',
    component: lazy(() => import('../../views/cashier/testform')),
    meta: {
      action: 'read',
      resource: 'thu_ngan',
    },
  },
  {
    path: '/cashier-bill',
    component: lazy(() => import('../../views/cashier/bill')),
    meta: {
      action: 'read',
      resource: 'thu_ngan',
    },
  },
  {
    path: '/cashier-loans',
    component: lazy(() => import('../../views/cashier/loan')),
    meta: {
      action: 'read',
      resource: 'thu_ngan',
    },
  },
]

export default CashierRoutes
