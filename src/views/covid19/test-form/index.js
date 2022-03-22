// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import TestForm from './TestForm'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Phiếu Xét Nghiệm'
        breadCrumbParent='Xét nghiệm Covid19'
        breadCrumbActive='Phiếu xét nghiệm'
      />
      <Row>
        <Col sm='12'>
          <TestForm />
        </Col>
      </Row>
    </Fragment>
  )
}

export default index
