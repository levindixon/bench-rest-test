'use strict';
// Dependencies
const Reflux = require('reflux');
const fetch = require('isomorphic-fetch');
const _ = require('lodash');
// Actions
const actions = require('actions/transaction');

let Store = Reflux.createStore({
  listenables: actions,
  transactions: [],
  balance: 0,
  pageCount: 0,

  onGetTransactions: function() {
    if (this.transactions.length > 0) {
      this.trigger(this.transactions);
      return;
    }

    this.fetchFirstPage();
  },

  onSortTransactions: function(sortBy, direction) {
    this.trigger(
      this.sort(this.transactions, sortBy, direction)
    );
  },

  populateTransactions: function(newTransactions) {
    newTransactions = this.cleanTransactionsData(newTransactions);
    this.transactions = this.transactions.concat(newTransactions);
    this.transactions = this.sort(this.transactions, 'date');
    this.balance = this.calculateBalance(this.transactions);
    this.transactions = this.mapBalance(this.transactions, this.balance);
    this.trigger(this.transactions);
  },

  cleanTransactionsData: function(transactions) {
    if (!transactions) {
      return;
    }

    return _.map(transactions, function(transaction) {
      let cleanTransaction = {};
      let transactionDate = transaction.Date.split('-');

      cleanTransaction.date = new Date(
        transactionDate[0],
        transactionDate[1] - 1,
        transactionDate[2]
      );
      cleanTransaction.amount = parseFloat(transaction.Amount);
      cleanTransaction.company = transaction.Company;
      cleanTransaction.ledger = transaction.Ledger;

      return cleanTransaction;
    });
  },

  calculateBalance: function(transactions) {
    return Math.round(_.sum(transactions, 'amount') * 1e2) / 1e2;
  },

  mapBalance: function(transactions, balance) {
    balance = balance + transactions[0].amount;

    return _.map(transactions, function(transaction) {
      balance = balance - transaction.amount;
      transaction.balance = Math.round(balance * 1e2) / 1e2;
      return transaction;
    });
  },

  getPageCount: function(data) {
    let pageCount = Math.ceil(data.totalCount / data.transactions.length);
    this.pageCount = pageCount;

    return pageCount;
  },

  sort: function(transactions, sortBy, direction) {
    if (!direction) {
      direction = 'desc';
    }

    return _.sortByOrder(transactions, sortBy, direction);
  },

  fetchFirstPage: function() {
    this.fetchPage(1)
    .then(function(response) {
      this.populateTransactions(response.transactions);
      this.getPageCount(response);
      this.fetchAllTransactions(this.pageCount);
    }.bind(this));
  },

  fetchPage: function(page) {
    return fetch('http://resttest.bench.co/transactions/' + page + '.json')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });
  },

  fetchAllTransactions: function(pageCount) {
    if (!pageCount) {
      return;
    }

    for (let i = pageCount; i > 1; i--) {
      this.fetchPage(i)
      .then(function(data) {
        this.populateTransactions(data.transactions);
      }.bind(this));
    }
  }
});

module.exports = Store;
