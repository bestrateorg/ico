// @flow
'use strict';

import React, {Component} from 'react';
import GroupBox from 'components/GroupBox';
import Group from 'components/Group';
import GroupItemText from 'components/GroupItemText';
import type {Store} from '../reducers/root';
import {connect} from 'react-redux';

interface Props {
  className?: string;

  icoAmount: string;
  pending: boolean;

  ticker: string;
}

const mapStateToProps = ({Form}: Store) => ({
  icoAmount : Form.get('icoAmount', 0),
  pending   : Form.get('resultPending', false),
  ticker    : Form.get('icoCurrency', 'NONE'),
});

class BlockOutputAmount extends Component<Props> {

  render() {
    return (
      <GroupBox className={this.props.className || ''} title="Amount of tokens" fullsize={true}>
        <Group>
          <GroupItemText ellipsis ceil text={this.props.icoAmount} isNumber={true} fullsize={true} pending={this.props.pending}/>
          <GroupItemText uppercase={true} text={this.props.ticker}/>
        </Group>
      </GroupBox>
    );
  }
}

export default connect(mapStateToProps)(BlockOutputAmount);
