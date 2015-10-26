'use strict';
// Dependencies
const React = require('react');
const ReactIntl = require('react-intl');
// Mixins
const IntlMixin     = ReactIntl.IntlMixin;
// Components
const FormattedDate = ReactIntl.FormattedDate;
const FormattedNumber = ReactIntl.FormattedNumber;

module.exports = React.createClass({
  propTypes: {
    transaction: React.PropTypes.object
  },
  mixins: [IntlMixin],

  getInitialState: function() {
    let transaction = this.props.transaction || {};
    let state = {
      date: transaction.date,
      amount: transaction.amount,
      company: transaction.company,
      ledger: transaction.ledger,
      balance: transaction.balance
    };

    return state;
  },

  render: function() {
    return (
      <tr className='c-transaction'>
        <td className='c-transaction__data'>
          <FormattedDate
            day="numeric"
            month="long"
            value={this.state.date}
            year="numeric" />
        </td>
        <td className='c-transaction__data'>{this.state.company}</td>
        <td className='c-transaction__data'>{this.state.ledger}</td>
        <td className='c-transaction__data'>
          <FormattedNumber
            currency="USD"
            style="currency"
            value={this.state.amount}/>
        </td>
        <td className='c-transaction__data'>
          <FormattedNumber
            currency="USD"
            style="currency"
            value={this.state.balance}/>
        </td>
      </tr>
    );
  }
});
