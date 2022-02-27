// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import testForm from './testForm'
import entities from './entities'

const rootReducer = {
    auth,
    navbar,
    layout,
    testForm,
    entities
}

export default rootReducer
