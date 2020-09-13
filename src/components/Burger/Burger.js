import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import PropTypes from 'prop-types';

const Burger = props => {

    const {ingredients} = props;
    // console.log(ingredients);

    let transformedIngredients = Object.keys( ingredients )
        .map( ingredientKey => {
            return [...Array( ingredients[ingredientKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Start creating your tasty burger!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

Burger.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.number).isRequired
};

export default Burger;