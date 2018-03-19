// @flow
'use strict';

import React, {Component} from 'react';
import Block from 'components/Block';
import BlockInputAmount from 'containers/BlockInputAmount';
import BlockRatio from 'containers/BlockRatio';

interface Props {
  step: number;
}

class Amount extends Component<Props> {

  render() {
    return (
      <Block row={this.props.step > 0} className="brw_amount">
        <BlockInputAmount className="brw_input-amount"/>
        <BlockRatio className="brw_ratio"/>
      </Block>
    );
  }
}

export default Amount;
