// @flow
'use strict';

import React, {Component} from 'react';
import Block from 'components/Block';

import BlockSubmit from 'containers/BlockSubmit';
import BlockInputDeposit from 'containers/BlockInputDeposit';

interface Props {
  step: number;
  submit?: boolean;

}


class Deposit extends Component<Props> {

  render() {
    return (
      <Block row={this.props.step > 0} className={this.props.submit ? 'brw_deposit_0' : 'brw_deposit_1'}>
        <BlockInputDeposit className="brw_input-deposit"/>
        {this.__renderSubmit()}
      </Block>
    );
  }

  __renderSubmit() {
    if (this.props.submit) {
      return <BlockSubmit className="brw_submit"/>;
    }
    return null;
  }
}

export default Deposit;
