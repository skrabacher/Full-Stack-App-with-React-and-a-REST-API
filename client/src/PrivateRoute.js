import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';// imports context 

export default ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            { context => (
                <Route
                {...rest}
                render={props => context.authUser ? ( //checks if user is authenticated
                    <Component {...props} /> //renders the component specified
                    ) : (
                    <Redirect to={{
                        pathname: '/signin', //redirects to sign in if not authenticated
                        state: { from: props.location }, //state property holds information about the user's current location (i.e., the current browser URL). That way, if authentication at the sign in redirect is successful, the router can redirect the user back to the original location (from: props.location).
                    }} /> 
                    )
                }
                />
            )}
        </Consumer>
    );
};