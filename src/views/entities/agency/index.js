// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import Agency from './Agency'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Đơn vị' breadCrumbParent='Danh mục'
                         breadCrumbActive='Đơn vị'/>
            <Row>
                <Col sm='12'>
                    <Agency/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
