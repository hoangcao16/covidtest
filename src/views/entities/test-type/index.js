// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import TestType from './TestType'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Loại xét nghiệm' breadCrumbParent='Danh mục'
                         breadCrumbActive='Loại xét nghiệm'/>
            <Row>
                <Col sm='12'>
                    <TestType/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
