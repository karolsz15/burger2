import React from 'react';
import classes from './Input.css';
import PropTypes from 'prop-types';

const Input = props => {

    const {invalid, shouldValidate, touched, elementType, elementConfig, value, changed, label} = props;

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={value}
                    onChange={changed}>
                    {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    );
};

Input.propTypes = {
    invalid: PropTypes.bool.isRequired,
    shouldValidate: PropTypes.object.isRequired,
    touched: PropTypes.bool,
    elementType: PropTypes.string.isRequired,
    elementConfig: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    label: PropTypes.string,
};


export default Input;