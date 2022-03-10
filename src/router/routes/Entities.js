/* eslint-disable comma-dangle */
import { lazy } from 'react'

const EntitiesRoutes = [
  {
    path: '/entities/agency',
    component: lazy(() => import('../../views/entities/agency')),
  },
  {
    path: '/entities/sample-type',
    component: lazy(() => import('../../views/entities/sample-type')),
  },
  {
    path: '/entities/test-type',
    component: lazy(() => import('../../views/entities/test-type')),
  },
  {
    path: '/entities/lab-result-type',
    component: lazy(() => import('../../views/entities/lab-result-type')),
  },
  {
    path: '/entities/staffs',
    component: lazy(() => import('../../views/entities/staff')),
  },
]

export default EntitiesRoutes
