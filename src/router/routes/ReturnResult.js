/* eslint-disable comma-dangle */
import { lazy } from 'react'

const ReturnResultRoutes = [
  {
    path: '/return-result',
    component: lazy(() => import('../../views/return-result/index')),
  },
]

export default ReturnResultRoutes
