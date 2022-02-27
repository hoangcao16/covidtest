// ** Document title
const TemplateTitle = '%s - Hospital'

// ** Default Route
const DefaultRoute = '/patients'

import PagesRoutes from './Pages'
import EntitiesRoutes from './Entities'
import SettingsRoutes from './Settings'
// ** Merge Routes
const Routes = [
    ...PagesRoutes,
    ...EntitiesRoutes,
    ...SettingsRoutes
]

export {DefaultRoute, TemplateTitle, Routes}
