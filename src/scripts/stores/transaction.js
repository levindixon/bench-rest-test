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
  sortedBy: 'date',
  order: 'desc',

  onGetTransactions: function(sortBy, order) {
    this.sortedBy = sortBy || 'date';
    this.order = order || 'desc';

    if (this.transactions.length > 0) {
      this.trigger(
        this.transactions,
        this.sortedBy,
        this.order
      );
      return;
    }

    this.fetchFirstPage();
  },

  onSortTransactions: function(sortBy, order) {
    this.sortedBy = sortBy || this.sortedBy;
    this.order = order || this.order;

    this.trigger(
      this.sort(this.transactions, sortBy, order),
      this.sortedBy,
      this.order
    );
  },

  populateTransactions: function(newTransactions) {
    newTransactions = this.cleanTransactionsData(newTransactions);
    this.transactions = this.transactions.concat(newTransactions);
    this.transactions = this.sort(this.transactions, this.sortedBy, this.order);
    this.balance = this.calculateBalance(this.transactions);
    this.transactions = this.mapBalance(this.transactions, this.balance);

    this.trigger(
      this.transactions,
      this.sortedBy,
      this.order
    );
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
    return _.map(transactions, function(transaction) {
      transaction.balance = Math.round(balance * 1e2) / 1e2;
      balance = balance - transaction.amount;
      return transaction;
    });
  },

  getPageCount: function(data) {
    let pageCount = Math.ceil(data.totalCount / data.transactions.length);
    this.pageCount = pageCount;

    return pageCount;
  },

  sort: function(transactions, sortBy, order) {
    order = order || this.order;

    return _.sortByOrder(transactions, sortBy, order);
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
