/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** Third Party Components
import { X } from 'react-feather'
import Proptypes from 'prop-types'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Sidebar = (props) => {
  // ** Props
  const {
    open,
    size,
    title,
    width,
    children,
    closeBtn,
    className,
    toggleSidebar,
    bodyClassName,
    contentClassName,
    wrapperClassName,
    headerClassName,
    titleButtonFooter,
    onClickButtonFooter,
    ...rest
  } = props

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = closeBtn ? (
    closeBtn
  ) : (
    <X className='cursor-pointer' size={15} onClick={toggleSidebar} />
  )

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      contentClassName={classnames('overflow-hidden', {
        [contentClassName]: contentClassName,
      })}
      modalClassName={classnames('modal-slide-in', {
        [wrapperClassName]: wrapperClassName,
      })}
      className={classnames({
        [className]: className,
        'sidebar-lg': size === 'lg',
        'sidebar-sm': size === 'sm',
        'sidebar-xl': size === 'xl',
      })}
      /*eslint-disable */
      {...(width !== undefined
        ? {
            style: { width: String(width) + 'px' },
          }
        : {})}
      /*eslint-enable */
      {...rest}
    >
      <ModalHeader
        className={classnames({
          // eslint-disable-next-line comma-dangle
          [headerClassName]: headerClassName,
        })}
        toggle={toggleSidebar}
        close={renderCloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>
          <span className='align-middle'>{title}</span>
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody
          className={classnames('flex-grow-1', {
            // eslint-disable-next-line comma-dangle
            [bodyClassName]: bodyClassName,
          })}
        >
          {children}
        </ModalBody>
      </PerfectScrollbar>
      {titleButtonFooter && (
        <ModalFooter>
          <button onClick={onClickButtonFooter} className='print-button'>
            {titleButtonFooter}
          </button>
        </ModalFooter>
      )}
    </Modal>
  )
}

export default Sidebar

// ** PropTypes
Sidebar.propTypes = {
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
