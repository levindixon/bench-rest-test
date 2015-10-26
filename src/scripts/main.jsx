'use strict';
// Dependencies
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
// Components
const App = require('components/App');

React.render(
  <Router>
    <Route component={App} path="/" />
  </Router>,
  document.getElementById('app')
);
