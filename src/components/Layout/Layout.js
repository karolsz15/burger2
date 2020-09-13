import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PropTypes from 'prop-types';

const Layout = props => {

    const isAuthenticated = useSelector(state => state.auth.token !== null)

    const {children} = props;

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const handleDrawerClick = () => {
        setShowSideDrawer( ({showSideDrawer}) => {
            return { showSideDrawer: !showSideDrawer };
        } );
    };

        return (
            <React.Fragment>
                <Toolbar
                    isAuth={isAuthenticated}
                    onDrawerClick={handleDrawerClick} />
                <SideDrawer
                    isAuth={isAuthenticated}
                    open={showSideDrawer}
                    closed={() => setShowSideDrawer(false)} />
                <main className={classes.Content}>
                    {children}
                </main>
            </React.Fragment>
        )
};

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;