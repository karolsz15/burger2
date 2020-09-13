import React from 'react';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';


const OrderSummary = props => {

    const {ingredients, price, purchaseCancelled, purchaseContinued } = props;

        const ingredientSummary = Object.keys( ingredients )
            .map( ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>: {ingredients[ingredientKey]}
                    </li> );
            } );

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {price.toFixed( 2 )}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
        );
};

OrderSummary.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
    price: PropTypes.number.isRequired,
    purchaseCancelled: PropTypes.func.isRequired,
    purchaseContinued: PropTypes.func.isRequired,
};

export default OrderSummary;