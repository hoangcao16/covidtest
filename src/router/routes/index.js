// ** Document title
const TemplateTitle = '%s - Hospital'

// ** Default Route
const DefaultRoute = '/patients'

import PagesRoutes from './Pages'
import EntitiesRoutes from './Entities'
// ** Merge Routes
const Routes = [
    ...PagesRoutes,
    ...EntitiesRoutes
]

export {DefaultRoute, TemplateTitle, Routes}
