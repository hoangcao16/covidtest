// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import Patients from './Patients'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Bệnh nhân' breadCrumbParent='Khách Hàng'
                         breadCrumbActive='Bệnh nhân'/>
            <Row>
                <Col sm='12'>
                    <Patients/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
