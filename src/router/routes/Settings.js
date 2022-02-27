import {lazy} from 'react'

const SettingsRoutes = [
    {
        path: '/settings/accounts',
        component: lazy(() => import('../../views/settings/accounts'))
    }
    // {
    //     path: '/settings/roles',
    //     component: lazy(() => import('../../views/settings/technical-type'))
    // },
    // {
    //     path: '/settings/permisssions',
    //     component: lazy(() => import('../../views/entities/sample-type'))
    // }

]

export default SettingsRoutes
