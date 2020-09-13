import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import PropTypes from 'prop-types';

const CheckoutSummary = props => {
    const {ingredients, checkoutCancelled, checkoutContinued} = props;
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Are you sure about your choice?</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={checkoutCancelled}>NO, CHANGE</Button>
            <Button 
                btnType="Success"
                clicked={checkoutContinued}>YES, CONTINUE</Button>
        </div>
    );
};

CheckoutSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    checkoutCancelled: PropTypes.func.isRequired,
    checkoutContinued: PropTypes.func.isRequired
};

export default CheckoutSummary;