import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = props => {
    const {price, ingredientAdded, ingredientRemoved, disabled, purchasable, ordered, isAuth} = props;
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{price.toFixed( 2 )}</strong></p>
            {controls.map( ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => ingredientAdded( ctrl.type )}
                    removed={() => ingredientRemoved( ctrl.type )}
                    disabled={disabled[ctrl.type]} />
            ) )}
            <button
                className={classes.OrderButton}
                disabled={!purchasable}
                onClick={ordered}>{isAuth ? 'ORDER THE BURGER' : 'LOG IN TO ORDER'}</button>
        </div>
    );
};


BuildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabled: PropTypes.object.isRequired,
    purchasable: PropTypes.bool.isRequired,
    ordered: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
};

export default BuildControls;