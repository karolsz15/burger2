import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import PropTypes from 'prop-types';

const NavigationItems = props => {
    const {isAuthenticated} = props;
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Create Burger</NavigationItem>
            {isAuthenticated ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
            {!isAuthenticated
                ? <NavigationItem link="/auth">Login</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
};

NavigationItems.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default NavigationItems;