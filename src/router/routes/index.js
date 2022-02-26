import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Hospital'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/patients',
    component: lazy(() => import('../../views/patients/Patients'))
  },
  {
    path: '/covid19',
    component: lazy(() => import('../../views/covid19/Covid19'))
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

export { DefaultRoute, TemplateTitle, Routes }
