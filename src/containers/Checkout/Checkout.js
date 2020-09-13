import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import PropTypes from 'prop-types';

const Checkout = props => {

    const {history, match} = props;

    //map state to consts
    const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
    const purchased = useSelector((state) => state.order.purchased);

    const checkoutCancelledHandler = () => {
        history.goBack();
    }

    const checkoutContinuedHandler = () => {
        history.replace( '/checkout/contact-data' );
    }


        let summary = <Redirect to="/" />
        if ( ingredients ) {
            const purchasedRedirect = purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={ingredients}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler} />
                    <Route
                        path={match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
};

Checkout.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default Checkout;