// @flow
'use strict';

import React, {Component} from 'react';
import {$Box} from './Box.styled';

type Props = {
  children: any;
  column?: boolean;
  open?: boolean;
};

class Box extends Component<Props> {
  node: ?HTMLElement;

  render() {
    return (
      <$Box open={this.props.open} innerRef={node => this.node = node}
            column={this.props.column}>{this.props.children}</$Box>
    );
  }
}

export default Box;
