import {lazy} from 'react'

const EntitiesRoutes = [
    {
        path: '/entities/agency',
        component: lazy(() => import('../../views/entities/agency'))
    },
    {
        path: '/entities/technical-type',
        component: lazy(() => import('../../views/entities/technical-type'))
    },
    {
        path: '/entities/sample-type',
        component: lazy(() => import('../../views/entities/sample-type'))
    },
    {
        path: '/entities/test-type',
        component: lazy(() => import('../../views/entities/test-type'))
    },
    {
        path: '/entities/lab-result-type',
        component: lazy(() => import('../../views/entities/lab-result-type'))
    }
]

export default EntitiesRoutes
