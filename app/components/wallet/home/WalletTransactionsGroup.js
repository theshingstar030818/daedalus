// @flow
import React, { Component, PropTypes } from 'react';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Transaction, { transactionShape } from '../../widgets/Transaction';
import styles from './WalletTransactionsGroup.scss';

@observer
export default class WalletTransactionsGroup extends Component {

  static propTypes = {
    transactions: MobxPropTypes.arrayOrObservableArrayOf(transactionShape).isRequired,
    date: PropTypes.string.isRequired,
  };

  render() {
    const { date, transactions } = this.props;
    return (
      <div className={styles.group}>
        <div className={styles.groupDate}>{date}</div>
        <div className={styles.list}>
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {transactions.map((transaction, transactionIndex) => (
              <div className={styles.transaction} key={transaction.id}>
                <Transaction
                  data={transaction}
                  isLastInList={transactionIndex === transactions.length - 1}
                />
              </div>
            ))}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
