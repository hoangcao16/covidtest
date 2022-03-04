/* eslint-disable comma-dangle */
// ** Document title

const TemplateTitle = '%s - Hospital'

// ** Default Route
const DefaultRoute = '/patients'

import PagesRoutes from './Pages'
import EntitiesRoutes from './Entities'
import SettingsRoutes from './Settings'
import PatientsRoutes from './Patients'
import BillRoutes from './Bill'
// ** Merge Routes
const Routes = [
  ...PagesRoutes,
  ...EntitiesRoutes,
  ...SettingsRoutes,
  ...PatientsRoutes,
  ...BillRoutes,
]

export { DefaultRoute, TemplateTitle, Routes }
