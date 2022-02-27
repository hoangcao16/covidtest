import {lazy} from 'react'
import {Redirect} from 'react-router-dom'

const PagesRoutes = [
    {
        path: '/patients',
        component: lazy(() => import('../../views/patients/Patients'))
    },
    {
        path: '/covid19/test-form',
        component: lazy(() => import('../../views/covid19/test-form'))
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    }
]

export default PagesRoutes
