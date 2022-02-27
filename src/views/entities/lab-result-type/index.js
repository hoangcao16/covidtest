// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import LabResultType from './LabResultType'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Loại kết quả' breadCrumbParent='Danh mục'
                         breadCrumbActive='Loại kết quả'/>
            <Row>
                <Col sm='12'>
                    <LabResultType/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
