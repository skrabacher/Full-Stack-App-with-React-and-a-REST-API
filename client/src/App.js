import React from 'react';
import logo from './logo.svg';
import './App.css';

const apiBaseUrl = 'http://localhost:5000/api/courses';
function App() {
  fetch(apiBaseUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    console.log(data);
    });

                    //  // api() method makes the GET & POST requests to the REST API. It currently accepts an API endpoint as its first argument (path), followed by the HTTP method, and body, which will contain any data associated with the request.
                    //  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
                    //   const url = apiBaseUrl + path; //configures the request path using the base url defined in config.js which gets passed to the returned fetch method
                    
                    //   const options = { //sends a request with the HTTP method, as well as the request headers and a stringified body (if body is provided).
                    //     method,
                    //     headers: {
                    //       'Content-Type': 'application/json; charset=utf-8',
                    //     },
                    //   };

                    //   if (body !== null) {
                    //     options.body = JSON.stringify(body);
                    //   }
                    //   // Check if auth is required for the route
                    //   if (requiresAuth) {    
                    //     const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`); //The btoa() method creates a base-64 encoded ASCII string from a "string" of data. We'll use btoa() to encode the username and password credentials passed to the api() method. The credentials will be passed as an object containing username and password properties.
                    //     options.headers['Authorization'] = `Basic ${encodedCredentials}`; //adds authorization to request header
                    //   }
                    //   return fetch(url, options); //fetch() accepts an optional second parameter: a configuration object that lets you control a number of different settings you can apply to the request.
                    // }
                    // //getUser() makes a GET request to the /users endpoint, and returns a JSON object containing user credentials. 
                    // async getUser(username, password) { //returns authenticated user
                    //   const response = await this.api(`/users`, 'GET', null, true, { username, password});
                    //   if (response.status === 200) {
                    //     return response.json().then(data => data);
                    //   }
                    //   else if (response.status === 401) {
                    //     return null;
                    //   }
                    //   else {
                    //     throw new Error();
                    //   }
                    // }
  
  
   

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
}

export default App;
