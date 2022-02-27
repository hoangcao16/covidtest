// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import SampleType from './SampleType'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Mẫu bệnh phẩm' breadCrumbParent='Danh mục'
                         breadCrumbActive='Mẫu bệnh phẩm'/>
            <Row>
                <Col sm='12'>
                    <SampleType/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
