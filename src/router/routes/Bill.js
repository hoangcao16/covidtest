/* eslint-disable comma-dangle */
import { lazy } from 'react'

const BillRoutes = [
  {
    path: '/bill',
    component: lazy(() => import('../../views/bill/index')),
  },
]

export default BillRoutes
