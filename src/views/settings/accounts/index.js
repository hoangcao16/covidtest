// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import Account from './Account'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Tài khoản' breadCrumbParent='Cấu hình'
                         breadCrumbActive='Tài khoản'/>
            <Row>
                <Col sm='12'>
                    <Account/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
