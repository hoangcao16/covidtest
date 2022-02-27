// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import testForm from './testForm'

const rootReducer = {
    auth,
    navbar,
    layout,
    testForm
}

export default rootReducer
