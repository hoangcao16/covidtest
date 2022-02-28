import {lazy} from 'react'

const SettingsRoutes = [
    {
        path: '/settings/accounts',
        component: lazy(() => import('../../views/settings/accounts'))
    },
    {
        path: '/settings/roles',
        component: lazy(() => import('../../views/settings/roles-permissions/roles'))
    },
    {
        path: '/settings/permissions',
        component: lazy(() => import('../../views/settings/roles-permissions/permissions'))
    }
]

export default SettingsRoutes
