/* eslint-disable comma-dangle */
import { lazy } from 'react'

const CashierRoutes = [
  {
    path: '/cashier-test-form',
    component: lazy(() => import('../../views/cashier/testform')),
  },
  {
    path: '/cashier-bill',
    component: lazy(() => import('../../views/cashier/bill')),
  },
  {
    path: '/cashier-loans',
    component: lazy(() => import('../../views/cashier/loan')),
  },
]

export default CashierRoutes
