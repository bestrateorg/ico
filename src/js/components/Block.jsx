// @flow
'use strict';

import React, {Component} from 'react';
import {$Block} from './Block.styled';
import {connect} from 'react-redux';

interface Props {
  row?: boolean;
  className?: string;
  children?: any;
  step: number;
}

const mapStateToProps = ({UI}) => ({
  step : UI.get('step', 0)
});

class Block extends Component<Props> {
  render() {
    return (
      <$Block step={this.props.step}
              className={this.props.className || ''}
              row={this.props.row}>{this.props.children}</$Block>
    );
  }
}

export default connect(mapStateToProps)(Block);
