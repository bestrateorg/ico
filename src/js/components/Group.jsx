// @flow
'use strict';

import React, {Component} from 'react';
import {$Group} from 'components/Group.styled';

interface Porps {
  children?: any;
}

class Group extends Component<Porps> {

  render() {
    return (
      <$Group>
        {this.props.children}
      </$Group>
    );
  }
}

export default Group;
