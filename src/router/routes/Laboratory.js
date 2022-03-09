/* eslint-disable comma-dangle */
import { lazy } from 'react'

const LaboratoryRoutes = [
  {
    path: '/laboratory',
    component: lazy(() => import('../../views/laboratory/index')),
  },
]

export default LaboratoryRoutes
