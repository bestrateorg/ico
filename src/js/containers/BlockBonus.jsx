'use strict';

import React, {Component} from 'react';
import {$BonusWrap} from './BlockBonus.styled';


type Props = {
  className?: string;
  children: string;
}

class BlockBonus extends Component<Props> {

  render() {
    return (
      <$BonusWrap className={this.props.className || ''}>
        <div className="brw_title">Bonus:</div>
        <div className="brw_value">{this.props.children}</div>
      </$BonusWrap>
    );
  }
}

export default BlockBonus;
