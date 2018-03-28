// @flow
'use strict';

import React, {Component} from 'react';
import {$Group} from './Group.styled';

type Props = {
  center?: boolean;
  children: any;
};

class Group extends Component<Props> {

  render() {
    return (
      <$Group center={this.props.center}>
        {this.props.children}
      </$Group>
    );
  }
}

export default Group;
