import React from 'react';
import classes from './Button.css';
import PropTypes from 'prop-types';

const Button = props => {
    const {disabled, btnType, clicked, children} = props;
    return (
        <button
            disabled={disabled}
            className={[classes.Button, classes[btnType]].join(' ')}
            onClick={clicked}>{children}</button>
    );
};

Button.propTypes = {
    disabled: PropTypes.bool,
    btnType: PropTypes.string.isRequired,
    clicked: PropTypes.func,
    children: PropTypes.string.isRequired,

};

export default Button;