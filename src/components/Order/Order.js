import React from 'react';
import classes from './Order.css';
import PropTypes from 'prop-types';

const Order = props => {
    const {ingredients, price} = props;

    const ingredientsArray = [];

    for ( let ingredientName in ingredients ) {
        ingredientsArray.push(
            {
                name: ingredientName,
                amount: ingredients[ingredientName]
            }
        );
    };

    const ingredientOutput = ingredientsArray.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat( price ).toFixed( 2 )}</strong></p>
        </div>
    );
};

Order.propTypes = {
    ingredients: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired
};

export default Order;