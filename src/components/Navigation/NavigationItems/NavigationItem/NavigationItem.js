import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';
import PropTypes from 'prop-types';

const NavigationItem = props => {
    const {link, exact, children} = props;
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                to={link}
                exact={exact}
                activeClassName={classes.active}>{children}</NavLink>
        </li>
    );
};

NavigationItem.propTypes = {
    link: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.string.isRequired
};

export default NavigationItem;