// ** React Imports
import {Fragment} from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

// ** Demo Components
import TechincalType from './TechincalType'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Kỹ thuật xét nghiệm' breadCrumbParent='Danh mục'
                         breadCrumbActive='Kỹ thuật xét nghiệm'/>
            <Row>
                <Col sm='12'>
                    <TechincalType/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default index
