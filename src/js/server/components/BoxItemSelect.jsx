// @flow
'use strict';

import React, {Component} from 'react';
import Arrow from '../../../images/arrow.svg';
import {$BoxItemSelect, $BoxItemSelectTitle, $BoxItemSelectIcon} from './BoxItem.styled';

type Props = {
  children: any;
  full?: boolean;

  open: boolean;
  onClick: (event: SyntheticEvent<HTMLElement>) => void;
};

class BoxItemSelect extends Component<Props> {
  node: ?HTMLElement;
  render() {
    return (
      <$BoxItemSelect innerRef={node => this.node = node}
                      full={this.props.full}>
        <$BoxItemSelectTitle>{this.props.children}</$BoxItemSelectTitle>
        <$BoxItemSelectIcon open={this.props.open} dangerouslySetInnerHTML={{__html : Arrow}}/>
      </$BoxItemSelect>
    );
  }
}

export default BoxItemSelect;
