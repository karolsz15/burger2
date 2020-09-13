import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PropTypes from 'prop-types';

const SideDrawer = props => {
    const {open, closed, isAuth} = props;

    //ISN'T THIS HTE SIMPLEST WAY?
    let attachedClasses = open ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];

    //IT WAS THIS WAY:
    // let attachedClasses = [classes.SideDrawer, classes.Close];
    // if (open) {
    //     attachedClasses = [classes.SideDrawer, classes.Open];
    // }

    //YOU SUGGESTED DOING THIS:
    // const classNamesHelper = (classes) => classes.filter((el) => el);
    
    return (
        <React.Fragment>
            <Backdrop show={open} clicked={closed}/>
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
};

SideDrawer.propTypes = {
    open: PropTypes.any.isRequired,
    closed: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired
};

export default SideDrawer;