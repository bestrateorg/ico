// @flow
'use strict';

import React, {Component} from 'react';
import {$WrapItemText, $ItemText, $TextEllipsis, $ItemTextLoader} from './GroupItem.styled';
import {LoaderLine} from 'components/Loader';

interface Props {
  fullsize?: boolean;
  text: string;

  isNumber?: boolean;
  uppercase?: boolean;
  pending?: boolean;
  ellipsis?: boolean;
  ceil?: boolean;
}

function crop(value: string | number): number {
  const num: number = parseFloat(value);
  if (!num)
    return 0;

  return Math.ceil(num * 100000) / 100000;
}

class GroupItemText extends Component<Props> {

  render() {
    return (
      <$WrapItemText fullsize={this.props.fullsize}>
        {this.__renderInner()}
      </$WrapItemText>
    );
  }

  __renderInner() {
    if (this.props.pending) {
      return <$ItemTextLoader><LoaderLine grey={true} center={false} count={3}/></$ItemTextLoader>
    }

    if (this.props.ceil) {
      return (
        <$ItemText uppercase={this.props.uppercase}>
          ~ {this.props.isNumber ? (Math.ceil(parseFloat(this.props.text)) || 0) : this.props.text}
        </$ItemText>
      );
    }

    if (this.props.ellipsis) {
      return (
        <$ItemText uppercase={this.props.uppercase}>
          <$TextEllipsis>{this.props.isNumber ? crop(this.props.text) : this.props.text}</$TextEllipsis>
        </$ItemText>
      );
    }
    return (
      <$ItemText uppercase={this.props.uppercase}>
        {this.props.isNumber ? crop(this.props.text) : this.props.text}
      </$ItemText>
    );
  }
}

export default GroupItemText;
