import {Fragment} from "react"
import {Coffee} from "react-feather"

const ToastContent = ({title, description}) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Coffee size={12}/>}/>
                <h6 className='toast-title fw-bold'>{title}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>{description}</span>
        </div>
    </Fragment>
)

export default ToastContent
