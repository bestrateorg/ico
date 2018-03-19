// @flow
'use strict';

import React, {Component} from 'react';
import GroupBox from 'components/GroupBox';
import Group from 'components/Group';
import GroupItemInput from 'components/GroupItemInput';
import GroupItemText from 'components/GroupItemText';
import GroupItemSelect from 'components/GroupItemSelect';

import {List} from 'immutable';
import {connect} from 'react-redux';
import {changeDepositAmount, changeDepositCurrency} from 'actions/actionsForm';
import {bindActionCreators} from 'redux';

interface Props {
  step: number;
  className?: string;

  value: string;
  ticker: string;

  actions: {
    changeDepositAmount: typeof changeDepositAmount;
    changeDepositCurrency: typeof changeDepositCurrency;
  };
}

interface State {
}

const mapStateToProps = ({UI, Form}) => ({
  step : UI.get('step', 0),
  ticker : Form.get('depositCurrency', 'btc'),
  value : Form.get('depositAmount', '')
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({
    changeDepositAmount,
    changeDepositCurrency
  }, dispatch),
});

class BlockInputDeposit extends Component<Props, State> {

  state = {};

  changeAmount = (event: SyntheticEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    this.props.actions.changeDepositAmount(value);
  };

  changeCurrency = (ticker: string) => {
    this.props.actions.changeDepositCurrency(ticker);
  };

  render() {
    return (
      <GroupBox title="Deposit's currency" fullsize={true} className={this.props.className || ''}>
        <Group>
          <GroupItemSelect onSelectCurrency={this.changeCurrency} selected_ticker={this.props.ticker}
                           currencies={List()}/>
          <GroupItemInput value={this.props.value}
                          onChange={this.changeAmount}
                          fullsize={true}
                          textAlign={this.props.step < 2 ? 'right' : 'left'}/>
        </Group>
      </GroupBox>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockInputDeposit);
