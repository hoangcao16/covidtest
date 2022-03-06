/* eslint-disable comma-dangle */
import { lazy } from 'react'

const PatientsHistoryRoutes = [
  {
    path: '/patient-history/:patientuuid',
    component: lazy(() => import('../../views/patient-history/')),
  },
]

export default PatientsHistoryRoutes
