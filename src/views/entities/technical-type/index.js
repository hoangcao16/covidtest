// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import TechnicalType from './TechnicalType'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Loại kỹ thuật' breadCrumbParent='Danh mục'
                         breadCrumbActive='Loại kỹ thuật'/>
            <Row>
                <Col sm='12'>
                    <TechnicalType/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
