import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import PropTypes from 'prop-types';

const BurgerBuilder = props => {

    const {history} = props;

    //map state to consts
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  //map dispatch to consts
  const dispatch = useDispatch();
  const onIngredientAdded = useCallback(
    (ingName) => dispatch(actions.addIngredient(ingName)),
    [dispatch]
  );
  const onIngredientRemoved = useCallback(
    (ingName) => dispatch(actions.removeIngredient(ingName)),
    [dispatch]
  );
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = useCallback(
    () => dispatch(actions.purchaseInit()),
    [dispatch]
  );
  const onSetAuthRedirectPath = useCallback(
    (path) => dispatch(actions.setAuthRedirectPath(path)),
    [dispatch]
  );

  //local state
    const [purchasing, setPurchasing] = useState(false);

    //
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys( ingredients )
            .map( ingredientKey => {
                return ingredients[ingredientKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    };

        const disabledInfo = {
            ...ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(ingredients)}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                        price={price} />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={ingredients}
                price={price}
                purchaseCancelled={() => setPurchasing(false)}
                purchaseContinued={purchaseContinueHandler} />;
        }
        // {salad: true, meat: false, ...}
        return (
            <React.Fragment>
                <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
};

BurgerBuilder.propTypes = {
    history: PropTypes.object.isRequired
};

export default (withErrorHandler(BurgerBuilder, axios));