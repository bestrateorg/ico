// @flow
'use strict';

import React, {Component} from 'react';
import {$BoxItem} from './BoxItem.styled';

type Props = {
  fix?:boolean;
  full?:boolean;
  children: any;
};

class BoxItem extends Component<Props> {

  render() {
    return (
      <$BoxItem full={this.props.full} fix={this.props.fix}>{this.props.children}</$BoxItem>
    );
  }
}

export default BoxItem;
