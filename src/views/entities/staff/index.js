// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import StaffsSection from './StaffsList'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const index = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Nhân viên'
        breadCrumbParent='Danh mục'
        breadCrumbActive='Nhân viên'
      />
      <Row>
        <Col sm='12'>
          <StaffsSection />
        </Col>
      </Row>
    </Fragment>
  )
}

export default index
