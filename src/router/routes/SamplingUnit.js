/* eslint-disable comma-dangle */
import { lazy } from 'react'

const SamplingUnitRoutes = [
  {
    path: '/sampling-unit',
    component: lazy(() => import('../../views/sampling-unit/index')),
  },
]

export default SamplingUnitRoutes
