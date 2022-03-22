/* eslint-disable comma-dangle */
import { lazy } from 'react'

const ReturnResultRoutes = [
  {
    path: '/return-result',
    component: lazy(() => import('../../views/return-result/index')),
    meta: {
      action: 'read',
      resource: 'ky_thuat_vien',
    },
  },
]

export default ReturnResultRoutes
