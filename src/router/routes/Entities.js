import {lazy} from 'react'

const EntitiesRoutes = [
    {
        path: '/entities/agency',
        component: lazy(() => import('../../views/entities/agency'))
    },
    {
        path: '/entities/technical-type',
        component: lazy(() => import('../../views/entities/technical-type'))
    }
]

export default EntitiesRoutes
