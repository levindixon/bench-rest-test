'use strict';
// Dependencies
const React = require('react');
const Reflux = require('reflux');
// Components
const Transaction = require('components/Transaction');
const TableHeader = require('components/TableHeader');
// Actions
const transactionActions = require('actions/transaction');
// Stores
const transactionStore = require('stores/transaction');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      transactions: [],
      sortedBy: '',
      order: ''
    };
  },

  componentDidMount: function() {
    this.listenTo(transactionStore, this.onTransactionAction);
    transactionActions.getTransactions();
  },

  onTransactionAction: function(transactions, sortedBy, order) {
    this.setState({
      transactions: transactions,
      sortedBy: sortedBy,
      order: order
    });
  },

  render: function() {
    return (
      <div className='c-app'>
        <h1 className='c-app__header'>Bench Test</h1>
        <table className='t-transaction-table'>
          <thead className='t-transaction-table__head'>
            <tr className='t-transaction-table__row'>
              <TableHeader
                order={this.state.order}
                sortedBy={this.state.sortedBy}
                type='date'
              />
              <TableHeader
                order={this.state.order}
                sortedBy={this.state.sortedBy}
                type='company'
              />
              <TableHeader
                order={this.state.order}
                sortedBy={this.state.sortedBy}
                type='ledger'
              />
              <TableHeader
                order={this.state.order}
                sortedBy={this.state.sortedBy}
                type='amount'
              />
              <th className='t-transaction-table__balance'>balance</th>
            </tr>
          </thead>
          <tbody className='t-transaction-table__body'>
            {this.state.transactions.map(function onMap(transaction, index) {
              return (
                <Transaction
                  key={index + transaction.balance}
                  transaction={transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});
