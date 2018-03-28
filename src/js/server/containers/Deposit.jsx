// @flow
'use strict';

import {List} from 'immutable';
import React, {Component} from 'react';
import Block from 'server/components/Block';
import Group from 'server/components/Group';
import Box from 'server/components/Box';
import BoxItemSelect from 'server/components/BoxItemSelect';
import BoxItemInput from 'server/components/BoxItemInput';
import type {Store} from 'server/reducers/root';
import {connect} from 'react-redux';
import * as actionsForm from 'server/actions/actionsForm';
import {bindActionCreators} from 'redux';
import type {Currency} from 'types/currency';
import {sendParentData} from '../../widget';

type Props = {
  step: number;
  value: string | number;
  ticker: string;
  rate: number;
  depositCurrencies: List<Currency>;

  actions: {
    changeDepositAmount: typeof actionsForm.changeDepositAmount;
    changeDepositTicker: typeof actionsForm.changeDepositTicker;
    changeICOAmount: typeof actionsForm.changeICOAmount;
  };
}

type State = {
  open: boolean;
};

const mapStateToProps = ({Form, Data}: Store) => ({
  value             : (Form.get('depositAmount', '') || ''),
  ticker            : Form.get('depositTicker', ''),
  rate              : (parseFloat(Form.get('icoRate', 1)) || 1),
  depositCurrencies : Data.get('depositCurrencies', List())
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({
    changeDepositAmount : actionsForm.changeDepositAmount,
    changeDepositTicker : actionsForm.changeDepositTicker,
    changeICOAmount     : actionsForm.changeICOAmount
  }, dispatch)
});

class Deposit extends Component<Props, State> {

  box: ?Box;
  select: ?BoxItemSelect;

  id: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  state = {
    open : false,
  };

  componentDidMount() {
    window.addEventListener('message', this.onMessage);
    document.addEventListener('click', this.click, true);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onMessage);
    document.removeEventListener('click', this.click, true);
  }

  onMessage = (event: MessageEvent) => {
    const data: any = event.data;
    if (!data || !data.type || data.type !== `${this.id}-close`) {
      return;
    }
    if (data.ticker) {
      this.props.actions.changeDepositTicker(data.ticker);
    }
    this.close();
  };

  change = (event: SyntheticEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    this.props.actions.changeDepositAmount(value);
  };

  toggle = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

  };

  __openList() {
    if (this.box && this.box.node && !this.state.open) {
      const rect: ClientRect = this.box.node.getBoundingClientRect();
      const width: number = (this.select && this.select.node) ? this.select.node.getBoundingClientRect().width : 0;

      sendParentData({
        type : 'open-currency-list',

        id          : this.id,
        shadowWidth : width,
        currencies  : this.props.depositCurrencies.toArray(),
        rect
      });

      this.setState({open : !this.state.open});
    }
  }

  click = (event: Event) => {
    // $FlowFixMe
    const target: EventTarget = event.target;
    if (this.state.open) {
      sendParentData({
        type : 'close-currency-list',
        id   : this.id,
      });
      this.setState({open : false});
    } else {
      if (this.select && this.select.node && this.select.node.contains(target)) {
        this.__openList();
      }
    }
  };

  close = () => {
    this.setState({open : false});
  };

  render() {
    const column: boolean = this.props.step < -1;
    const textAlign: ('left' | 'center' | 'right') = this.props.step < -1
      ? 'center'
      : (this.props.step < 2 ? 'right' : 'left');
    return (
      <Group>
        <Block title="Deposit's currency">
          <Box column={column} ref={node => this.box = node} open={this.state.open}>
            <BoxItemSelect open={this.state.open}
                           ref={node => this.select = node}
                           onClick={this.toggle}
                           currencies={this.props.depositCurrencies}
                           full={column}>{this.props.ticker.toUpperCase()}</BoxItemSelect>
            <BoxItemInput full={column}
                          textAlign={textAlign}
                          value={this.props.value}
                          onChange={this.change}
                          placeholder="Amount"/>
          </Box>
        </Block>
      </Group>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
