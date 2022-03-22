/* eslint-disable comma-dangle */
import { lazy } from 'react'

const PatientsHistoryRoutes = [
  {
    path: '/patient-history/:patientuuid',
    component: lazy(() => import('../../views/patient-history/')),
    meta: {
      action: 'read',
      resource: 'thu_ngan',
    },
  },
]

export default PatientsHistoryRoutes
