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
import LoansRoutes from './Loans'
import PatientsHistoryRoutes from './PatientHistory'
import CashierRoutes from './Cashier'
import SamplingUnitRoutes from './SamplingUnit'
import LaboratoryRoutes from './Laboratory'
import ReturnResultRoutes from './ReturnResult'
// ** Merge Routes
const Routes = [
  ...PagesRoutes,
  ...EntitiesRoutes,
  ...SettingsRoutes,
  ...PatientsRoutes,
  ...BillRoutes,
  ...LoansRoutes,
  ...PatientsHistoryRoutes,
  ...CashierRoutes,
  ...SamplingUnitRoutes,
  ...LaboratoryRoutes,
  ...ReturnResultRoutes,
]

export { DefaultRoute, TemplateTitle, Routes }
