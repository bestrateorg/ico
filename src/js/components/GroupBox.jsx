// @flow
'use strict';

import React, {Component} from 'react';
import {$WrapGroupBox, $TitleGroupBox} from './GroupBox.styled';

interface Props {
  title?: string;
  bonus?: ?string;
  fullsize?: boolean;
  className?: string;
  children?: any;
}

class GroupBox extends Component<Props> {
  render() {
    return (
      <$WrapGroupBox className={this.props.className} fullsize={this.props.fullsize}>
        {this.__renderTitle()}
        <div>{this.props.children}</div>
      </$WrapGroupBox>
    );
  }

  __renderTitle() {
    if (this.props.title) {
      return <$TitleGroupBox>{this.props.title}</$TitleGroupBox>;
    }
    if(this.props.bonus){
      return <$TitleGroupBox bonus>{this.props.bonus}</$TitleGroupBox>;
    }
    return null;
  }
}

export default GroupBox;
