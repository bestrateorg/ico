// @flow
'use strict';

import React, {Component, PureComponent} from 'react';
import {$DropListItem, $DropListLink, $DropListLinkTicker, $DropListLinkName} from './DropListItem.styled';

interface Props {
  ticker: string;
  name: string;
  onSelect: (ticker: string) => void;
}

class DropListItem extends PureComponent<Props> {

  render() {
    return (
      <$DropListItem onClick={() => this.props.onSelect(this.props.ticker)}>
        <$DropListLink>
          <$DropListLinkTicker>{this.props.ticker}</$DropListLinkTicker>
          <$DropListLinkName>{this.props.name}</$DropListLinkName>
        </$DropListLink>
      </$DropListItem>
    );
  }
}

export default DropListItem;
