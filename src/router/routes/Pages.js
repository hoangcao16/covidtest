import {lazy} from 'react'
import {Redirect} from 'react-router-dom'

const PagesRoutes = [
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
