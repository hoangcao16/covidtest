/* eslint-disable comma-dangle */
// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import testForm from './testForm'
import agency from './agency'
import technicalType from './technicalType'
import sampleType from './sampleType'
import testType from './testType'
import analysisCertificate from './analysisCertificate'
import account from './account'
import labResultType from './labResultType'
import patient from './patient'
import role from './role'
import permission from './permission'
import staff from './staff'
import debt from './debt'
import receipt from './receipt'

const rootReducer = {
  auth,
  navbar,
  layout,
  testForm,
  agency,
  technicalType,
  sampleType,
  testType,
  account,
  labResultType,
  patient,
  analysisCertificate,
  role,
  permission,
  staff,
  debt,
  receipt,
}

export default rootReducer
