import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = () => {

    //map state to consts
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const buildingBurger = useSelector(state => state.burgerBuilder.building);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    //map dispatch to consts
    const dispatch = useDispatch();
    const onAuth = useCallback(
        ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ), 
        [dispatch])
    ;
    const onSetAuthRedirectPath = useCallback(
        () => dispatch( actions.setAuthRedirectPath( '/' )), 
        [dispatch]
    );

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if ( !buildingBurger && authRedirectPath !== '/' ) {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath]);

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, controls[controlName].validation ),
                touched: true
            } )
        } );
        // this.setState( { controls: updatedControls } );
        setControls(updatedControls);
    };

    const submitHandler = ( event ) => {
        event.preventDefault();
        onAuth( controls.email.value, controls.password.value, isSignup );
    };

        const formElementsArray = [];
        for ( let key in controls ) {
            formElementsArray.push( {
                id: key,
                config: controls[key]
            } );
        };

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

        if ( loading ) {
            form = <Spinner />
        };

        let errorMessage = null;

        if ( error ) {
            errorMessage = (
                <p>{error.message}</p>
            );
        };

        let authRedirect = null;
        if ( isAuthenticated ) {
            authRedirect = <Redirect to={authRedirectPath} />
        };

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">{isSignup ? 'SIGN UP!' : 'LOG IN!'}</Button>
                </form>
                <Button
                    clicked={() => setIsSignup(!isSignup)}
                    btnType="Danger">{isSignup ? 'YOU ALREADY HAVE AND ACCOUNT? LOG IN!' : 'DON\'T HAVE AND ACCOUNT? CREATE ONE!'}</Button>
            </div>
        );
};

export default Auth;