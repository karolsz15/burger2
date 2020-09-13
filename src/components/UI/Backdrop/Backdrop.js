import React from 'react';
import classes from './Backdrop.css';
import PropTypes from 'prop-types';

const Backdrop = props => {
    const {show, clicked} = props;
    return (
        show ? <div className={classes.Backdrop} onClick={clicked}></div> : null
    );
};

Backdrop.propTypes = {
    show: PropTypes.any,
    clicked: PropTypes.func.isRequired
};

export default Backdrop;