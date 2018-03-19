// @flow
'use strict';

import React, {Component} from 'react';
import Group from 'components/Group';
import GroupBox from 'components/GroupBox';
import GroupItemText from 'components/GroupItemText';
import {connect} from 'react-redux';
import type {Store} from '../reducers/root';

interface Props {
  className?: string;

  value: string;
  pending: boolean;
  ticker: string;
}

const mapStateToProps = ({Form}: Store) => ({
  value   : Form.get('resultAmount', ''),
  pending : Form.get('resultPending', false),
  ticker  : Form.get('resultCurrency', 'eth'),
});

class BlockRatio extends Component<Props> {

  render() {
    return (
      <GroupBox className={this.props.className || ''} title="Ethereum value" fullsize={true}>
        <Group>
          <GroupItemText ellipsis text={this.props.value} isNumber={true} fullsize={true} pending={this.props.pending}/>
          <GroupItemText uppercase={true} text={this.props.ticker}/>
        </Group>
      </GroupBox>
    );
  }
}

export default connect(mapStateToProps)(BlockRatio);
