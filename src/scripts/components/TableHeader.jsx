'use strict';
// Dependencies
const React = require('react');
// Actions
const transactionActions = require('actions/transaction');

module.exports = React.createClass({
  propTypes: {
    order: React.PropTypes.string,
    sortedBy: React.PropTypes.string,
    type: React.PropTypes.string
  },

  sortHandler: function() {
    let sortBy = this.props.type;

    if (sortBy === this.props.sortedBy && this.props.order === 'desc') {
      transactionActions.sortTransactions(sortBy, 'asc');
      return;
    }

    transactionActions.sortTransactions(sortBy, 'desc');
  },

  getArrow: function() {
    if (this.props.type !== this.props.sortedBy) {
      return;
    }

    if (this.props.order === 'desc') {
      return (
        <span className='c-table-header__down-arrow'></span>
      );
    }

    return (
      <span className='c-table-header__up-arrow'></span>
    );
  },

  render: function() {
    let arrow = this.getArrow();

    return (
      <th
        className='c-table-header'
        onClick={this.sortHandler}>
        {this.props.type} {arrow}
      </th>
    );
  }
});
