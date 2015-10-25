'use strict';
// Dependencies
const Reflux = require('reflux');
const fetch = require('isomorphic-fetch');
// Actions
const actions = require('actions/transaction');

let Store = Reflux.createStore({
  listenables: actions,

  onFetchTransactions: function(page) {
    if (!page) {
      page = 1;
    }

    fetch('http://resttest.bench.co/transactions/' + page + '.json')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(function(data) {
        this.trigger(data);
      }.bind(this));
  }
});

module.exports = Store;
