import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css';

import { client } from "./apollo"
import { ApolloProvider } from "react-apollo";
import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import Register from './pages/Register'
import Login from './pages/Login';
import ViewRecipe from './pages/ViewRecipe'
import Profile from './pages/Profile';
import Feed from './pages/feed';
import EditRecipe from './pages/EditRecipe'
import CreateRecipe from "./pages/createrecipe";
import Home from './pages/home';
import "./App.css"

const routing = (
  <ApolloProvider client={client}>
      <Router>
        {
          
          localStorage.getItem("uid") ? (
            <>
            <div>
              <div className="sidenav">
                <div className="sidenav-start">
                  <div className="tooltip">
                    <a href="/dashboard"><i className="fas fa-home icon"></i></a>
                  </div>
                  <a href="/create-recipe"><i className="fas fa-plus-circle icon"></i></a>
                  <a href="/feed"><i className="fas fa-book icon"></i></a>
                </div>
              </div>
            </div>
            </>
          ): null
          
        }
        <div id="main">
          <Route exact path="/" component={App} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/recipe/:id" component={ViewRecipe} />
          <Route path="/edit/:id" component={EditRecipe} />
          <Route path="/profile" component={Profile} />
          <Route path="/feed" component={Feed} />
          <Route path="/create-recipe" component={CreateRecipe} />
          <Route path="/dashboard" component={Home} />  
        </div>
      </Router>
  </ApolloProvider>
)

ReactDOM.render(routing, document.getElementById('root'))