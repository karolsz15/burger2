import React from 'react';
import classes from './DrawerToggle.css';
import PropTypes from 'prop-types';

const DrawerToggle = props => {
    const {clicked} = props;
    return (
        <div className={classes.DrawerToggle} onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}; 

DrawerToggle.propTypes = {
    clicked: PropTypes.func.isRequired
};

export default DrawerToggle;