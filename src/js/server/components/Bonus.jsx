// @flow
'use strict';

import React, {Component} from 'react';
import {$BonusWrapper, $Bonus} from './Bonus.styled';

type Props = {
  children: string;
};

class Bonus extends Component<Props> {

  render() {
    return (
      <$BonusWrapper>
        <div>Bonus:</div>
        <$Bonus>{this.props.children}</$Bonus>
      </$BonusWrapper>
    );
  }
}

export default Bonus;
