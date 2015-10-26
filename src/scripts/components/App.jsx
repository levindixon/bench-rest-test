'use strict';
// Dependencies
const React = require('react');
const Reflux = require('reflux');
// Components
const Transaction = require('components/Transaction');
// Actions
const transactionActions = require('actions/transaction');
// Stores
const transactionStore = require('stores/transaction');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      transactions: []
    };
  },

  componentDidMount: function() {
    this.listenTo(transactionStore, this.onTransactionAction);
    transactionActions.getTransactions();
  },

  onTransactionAction: function(response) {
    this.setState({
      transactions: response
    });
  },

  sortHandler: function(sortBy) {
    transactionActions.sortTransactions(sortBy);
  },

  render: function() {
    return (
      <div className='c-app'>
        <table>
          <tr>
            <th onClick={this.sortHandler.bind(this, 'date')}>Date</th>
            <th onClick={this.sortHandler.bind(this, 'company')}>Company</th>
            <th onClick={this.sortHandler.bind(this, 'ledger')}>Ledger</th>
            <th onClick={this.sortHandler.bind(this, 'amount')}>Amount</th>
            <th>Balance</th>
          </tr>
          {this.state.transactions.map(function onMap(transaction, index) {
            return (
              <Transaction
                key={index + '#' + transaction.balance}
                transaction={transaction}
              />
            );
          })}
        </table>
      </div>
    );
  }
});
