/* eslint-disable comma-dangle */
import { lazy } from 'react'

const LaboratoryRoutes = [
  {
    path: '/laboratory',
    component: lazy(() => import('../../views/laboratory/index')),
    meta: {
      action: 'read',
      resource: 'ky_thuat_vien',
    },
  },
]

export default LaboratoryRoutes
