import React, { useMemo } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

const Modal = props => useMemo(() => {
    const {show, modalClosed, children} = props;
    return (
        <React.Fragment>
            <Backdrop show={show} clicked={modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                {children}
            </div>
        </React.Fragment>
    )
});

Modal.propTypes = {
    show: PropTypes.oneOf([null, true, false]),
    modalClosed: PropTypes.func.isRequired,
    children: PropTypes.element
};

export default Modal;