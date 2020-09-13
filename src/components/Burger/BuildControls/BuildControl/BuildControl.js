import React from 'react';
import classes from './BuildControl.css';
import PropTypes from 'prop-types';


const BuildControl = props => {
    const {label, removed, disabled, added} = props;
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button 
                className={classes.Less} 
                onClick={removed} 
                disabled={disabled}>Less</button>
            <button 
                className={classes.More} 
                onClick={added}>More</button>
        </div>
    );
};

BuildControl.propTypes = {
    label: PropTypes.string.isRequired,
    removed: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    added: PropTypes.func.isRequired,
};

export default BuildControl;