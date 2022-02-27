import {lazy} from 'react'

const PatientsRoutes = [
    {
        path: '/patients',
        component: lazy(() => import('../../views/patients/patients'))
    }
]

export default PatientsRoutes
