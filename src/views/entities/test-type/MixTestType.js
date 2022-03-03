// ** React Imports
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {User, Briefcase, Mail, Calendar, DollarSign, X, Plus, Minus} from 'react-feather'

// ** Reactstrap Imports
import {
    Label,
    Row,
    Col
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {StyledMixTestType} from "./style"
import {InputNumber} from "antd"
import Proptypes from "prop-types"

const MixTestType = ({mixArr}) => {
    // ** State
    const render = () => {
        mixArr.map((item) => (
            <Row>
                <Col md='6'>
                    <Label className='form-label' for='readOnly-number-input'>
                        Số lượng
                    </Label>
                    <InputNumber
                        readOnly
                        defaultValue={item.number}
                        upHandler={<Plus/>}
                        downHandler={<Minus/>}
                        id='readOnly-number-input'
                    />
                </Col>
                <Col md='6'>
                    <Label className='form-label' for='number'>
                        Giá
                    </Label>
                    <InputNumber
                        readOnly
                        defaultValue={item.number}
                        upHandler={<Plus/>}
                        downHandler={<Minus/>}
                        id='readOnly-number-input'
                    />
                </Col>
            </Row>
        ))
    }
    return (
        <StyledMixTestType>
            {render()}
        </StyledMixTestType>

    )
}
MixTestType.propTypes = {
    className: Proptypes.string,
    bodyClassName: Proptypes.string,
    open: Proptypes.bool.isRequired,
    title: Proptypes.string.isRequired,
    contentClassName: Proptypes.string,
    wrapperClassName: Proptypes.string,
    children: Proptypes.any.isRequired,
    size: Proptypes.oneOf(['sm', 'lg', 'xl']),
    toggleSidebar: Proptypes.func.isRequired,
    // eslint-disable-next-line comma-dangle
    width: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
}

export default MixTestType
