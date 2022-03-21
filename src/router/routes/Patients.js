/* eslint-disable comma-dangle */
import { lazy } from 'react'

const PatientsRoutes = [
  {
    path: '/patients',
    component: lazy(() => import('../../views/patients/patients')),
    meta: {
      action: 'read',
      resource: 'thu_ngan',
    },
  },
]

export default PatientsRoutes
