// @flow
'use strict';

import React, {Component} from 'react';
import {$Block, $BlockTitle} from './Block.styled';

type Props = {
  title?: string;
  fullsize?: boolean;
  halfsize?: boolean;
  fix?: boolean;
  bonus?: string;
  children: any;
};

class Block extends Component<Props> {
  render() {
    return (
      <$Block fullsize={this.props.fullsize}
              halfsize={this.props.halfsize}
              fix={this.props.fix}>
        {this.__renderTitle()}
        <div>
          {this.props.children}
        </div>
      </$Block>
    );
  }

  __renderTitle() {
    if (this.props.title) {
      return <$BlockTitle>{this.props.title}</$BlockTitle>
    }
    if (this.props.bonus) {
      return <$BlockTitle bonus>{this.props.bonus}</$BlockTitle>;
    }
    return null;
  }

}

export default Block;
