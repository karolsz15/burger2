import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = () => {
    
    //map state to consts
    const orders = useSelector((state) => state.order.orders);
    const loading = useSelector((state) => state.order.loading);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);

    //map dispatch to consts
    const dispatch = useDispatch();
    const onFetchOrders = useCallback(
        (token, userId) => dispatch( actions.fetchOrders(token, userId) ),
        [dispatch]
    );

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

        let ordersList = <Spinner />;
        if ( !loading && orders.length === 0) {
            ordersList = 'You have not ordered any burger so far! It\'s high time to change it!';
        };
        if ( !loading && orders.length !== 0) {
            ordersList = orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {ordersList}
            </div>
        );
};

export default withErrorHandler( Orders, axios );