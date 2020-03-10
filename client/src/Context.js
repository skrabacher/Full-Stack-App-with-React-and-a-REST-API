import React, { Component } from 'react'; // adds react features for stateful class component
import config from './config'; //imports api base url used by the data request methods


// In React, Context is primarily used when some data needs to be accessible by many components at different nesting levels. Context lets you pass data through the component tree without having to pass props down manually at every level.import React, { Component } from 'react';
// When using the Context API, the Provider is what provides the data that needs to be consumed by other components of the application.
const Context = React.createContext();

export class Provider extends Component { /* extends is used to create a sub class or child of anoter class, extends from React.Component, (part of Reacts API for component class definition) */

    //state = {};

  //DATA REQUEST METHODS
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path; //configures the request path using the base url defined in config.js which gets passed to the returned fetch method
  
    const options = { //sends a request with the HTTP method, as well as the request headers and a stringified body (if body is provided).
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    
    return fetch(url, options); //fetch() accepts an optional second parameter: a configuration object that lets you control a number of different settings you can apply to the request.
  }

  //STATE CHANGING FUNCTIONS
    // signIn = async (emailAddress, password) => {
    //   const user = 
    // }

    // signOut = () => {} //removes the authenticated user and password from the global state.

    // signUp = async ()

   
render() { //if either props or state changes, render will run//RENDER IS required in class components

    //ALL DATA PROVIDED IN CONTEXT
    const value = {
      data: this.data,
      actions: { // Add the 'actions' property and object
        signIn: this.signIn, //makes the signIn function available to componenets with context
        signOut: this.signOut //makes the signOut function available to componenets with context
      }
    };
    
    return ( //returns a Provider component which provides the application state and any actions or event handlers that need to be shared between components, via a required value prop.
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

 

}

//ADDITIONAL EXPORTS

  export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 // higher-order function named withContext that wraps a provided component in a <Context.Consumer> component. In other words, withContext automatically subscribes (or connects) the component passed to it to all actions and context changes:
export default function withContext(Component) { //essentially gives context to a component 
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}