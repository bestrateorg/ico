// @flow
'use strict';

import React, {Component} from 'react';
import {$WrapItemInput} from 'components/GroupItem.styled';
import styled from 'styled-components';

const $Input = styled.input.attrs({type : 'text'})`
  #bestratewidget & {
    text-align: ${props => props.textAlign ? props.textAlign : 'left'} !important;

    font-weight: 400 !important;
    font-size: 16px!important;
    line-height: 22px !important;
  }
`;

interface Props {
  fullsize?: boolean;
  value: string;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
  textAlign?: string;
  placeholder?: string;
}

class GroupItemInput extends Component<Props> {

  render() {
    return (
      <$WrapItemInput fullsize={this.props.fullsize}>
        <$Input placeholder={this.props.placeholder || 'Amount'}
                value={this.props.value}
                textAlign={this.props.textAlign} onChange={this.props.onChange}/>
      </$WrapItemInput>
    );
  }
}

export default GroupItemInput;
