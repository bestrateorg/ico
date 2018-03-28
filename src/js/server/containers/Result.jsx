// @flow
'use strict';

import React, {Component, Fragment} from 'react';
import Group from 'server/components/Group';
import Block from 'server/components/Block';
import Box from 'server/components/Box';
import BoxItem from 'server/components/BoxItem';
import Btn from 'server/components/Submit';
import {connect} from 'react-redux';
import {LoaderLine} from 'server/components/Loader';
import Bonus from 'server/components/Bonus';

type Props = {
  step: number;
  value: string | number;
  ticker: string;

  renderBonus: boolean;
  bonus: string;
  pending: boolean;
};

const mapStateToProps = ({Form, Data}) => ({
  value  : Form.get('icoAmount', 0) || 0,
  ticker : Form.get('icoTicker', '') || '',
  bonus  : Data.get('bonus', ''),

  pending : Form.get('icoPending', false),
});

class Result extends Component<Props> {

  render() {
    const column: boolean = this.props.step < -1;
    return (
      <Group center={this.props.step <= 1}>
        <Block title={'Amount of tokens'} fullsize={this.props.step <= 1}>
          <Box column={column}>
            <BoxItem>{this.__renderAmount()}</BoxItem>
            <BoxItem fix full={column}>{this.__renderTicker()}</BoxItem>
          </Box>
        </Block>
        {this.__renderSubmit()}
      </Group>
    );
  }

  __renderSubmit() {
    if (this.props.step > 1 || !this.props.bonus) {
      return (
        <Block fullsize={this.props.step < 1}
               fix bonus={this.__bonusString()}
               halfsize={this.props.step === 1}>
          <Btn>Pay <span>via BestRate</span></Btn>
        </Block>
      );
    }
    return (
      <Fragment>
        <Block fullsize={this.props.step < 1} halfsize={this.props.step === 1} fix>
          <Bonus>{this.__bonusString()}</Bonus>
        </Block>

        <Block fullsize={this.props.step < 1} halfsize={this.props.step === 1} fix>
          <Btn>Pay <span>via BestRate</span></Btn>
        </Block>
      </Fragment>
    );
  }

  __bonusString() {
    if (!this.props.bonus)
      return '';
    if (this.props.step !== 2) {
      return `${this.props.bonus} ${this.props.ticker}`;
    }
    return this.props.bonus;
  }

  __renderAmount() {
    if (this.props.pending) {
      return <div style={{padding : '4px 0'}}><LoaderLine grey center/></div>;
    }

    if (this.props.step < -1) {
      return <div style={{textAlign : 'center'}}>~ {Math.round(parseFloat(this.props.value) || 0)}</div>;
    }
    return `~ ${Math.round(parseFloat(this.props.value) || 0)}`;
  }

  __renderTicker() {
    const ticker: string = this.props.ticker.toUpperCase();
    if (this.props.step < -1) {
      return <div style={{textAlign : 'center'}}>{ticker}</div>;
    }
    return ticker;
  }
}

export default connect(mapStateToProps)(Result);
