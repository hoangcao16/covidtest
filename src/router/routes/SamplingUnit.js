/* eslint-disable comma-dangle */
import { lazy } from 'react'

const SamplingUnitRoutes = [
  {
    path: '/sampling-unit',
    component: lazy(() => import('../../views/sampling-unit/index')),
    meta: {
      action: 'read',
      resource: 'lay_mau',
    },
  },
]

export default SamplingUnitRoutes
