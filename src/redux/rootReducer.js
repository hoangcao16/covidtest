// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import testForm from './testForm'
import agency from './agency'
import technicalType from './technicalType'
import sampleType from './sampleType'
import testType from './testType'
import account from './account'
import labResultType from './labResultType'

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
    labResultType
}

export default rootReducer
