import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import PropTypes from 'prop-types';

const Toolbar = props => {
    const {onDrawerClick, isAuth} = props;
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={onDrawerClick} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={isAuth} />
            </nav>
        </header>
    );
};

Toolbar.propTypes = {
    drawerToggleClicked: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired
};

export default Toolbar;