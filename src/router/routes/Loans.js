/* eslint-disable comma-dangle */
import { lazy } from 'react'

const LoanRoutes = [
  {
    path: '/loans',
    component: lazy(() => import('../../views/Loans/index')),
  },
]

export default LoanRoutes
