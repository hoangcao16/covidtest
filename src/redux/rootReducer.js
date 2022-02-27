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

const rootReducer = {
  auth,
  navbar,
  layout,
  testForm,
  agency,
  technicalType,
  sampleType,
  testType,
  analysisCertificate,
}

export default rootReducer
